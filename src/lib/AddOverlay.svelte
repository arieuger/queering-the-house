<script lang="ts">
  import {
    addOverlayVisible,
    infoOverlayVisible,
    infoOverlayActiveTab
  } from '../stores';
  import ActionButton from './ActionButton.svelte';
  import CloseButton from './CloseButton.svelte';
  import { activeMarkerCoords } from '../stores';
  import {
    turnstile,
    type TurnstileEventDetail
  } from '@svelte-put/cloudflare-turnstile';
  import { PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY } from '$env/static/public';
  import { SvelteToast, toast } from '@zerodevx/svelte-toast';

  let houseAddress = '';
  let houseDescription = '';
  let houseLicense = '';
  let houseSources = '';
  let captchaToken = '';
  let isAddButtonDisabled = true;
  let requestCaptcha = false;

  function closeAddOverlay() {
    addOverlayVisible.update(() => false);
  }

  function openInfoOverlay(tabActive: number) {
    infoOverlayVisible.update(() => true);
    infoOverlayActiveTab(tabActive);
  }

  const showSubmissionSuccessNotification = () => {
    toast.push(
      'Your story was successfully submitted. It will appear publicly on the map once it has been approved by our moderators.',
      {
        theme: {
          '--toastBarHeight': 0
        },

        duration: 5000
      }
    );
  };

  $: isAddButtonDisabled =
    !$activeMarkerCoords?.lng ||
    !$activeMarkerCoords?.lat ||
    !houseAddress;

  async function handleAddHouse() {
    if (!captchaToken) {
      alert('Please complete the CAPTCHA.');
      return;
    }

    const payload = JSON.stringify({
      lng: $activeMarkerCoords?.lng,
      lat: $activeMarkerCoords?.lat,
      address: houseAddress,
      description: houseDescription,
      license: houseLicense,
      sources: houseSources,
      captchaToken
    });

    const response = await fetch('houses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload
    });

    if (response.status === 201) {
      closeAddOverlay();
      showSubmissionSuccessNotification();
    } else {
      const result = await response.json();
      alert(`Error: ${result.error}`);
    }
  }

  const handleTurnstile = (
    e: CustomEvent<TurnstileEventDetail<{ token: string }>>
  ) => {
    captchaToken = e.detail.token;
    handleAddHouse();
  };

  new SvelteToast({
    target: document.body
  });
</script>

<aside class="overlay overlay--add">
  <div class="action-button-container">
    <div>
      <div class="bordered"></div>
      <div class="bordered"></div>
    </div>
    <div>
      <div class="bordered" style="border-right: 0px;"></div>
      <div class="bordered" style="border-right: 0px;"></div>
    </div>

    <CloseButton functionOnClick={closeAddOverlay} position="right"
      >close add overlay</CloseButton
    >
  </div>
  <div class="overlay__outer">
    <div class="overlay__content">
      <section>
        <div class="overlay__section-title">Engade unha vivenda</div>
        <div class="overlay__section-text">
          <div class="partial_div-numbered">
            <span>1</span>Fai click na localización da vivenda no mapa.
          </div>
          <div class="partial_div-numbered">
            <span>2</span>Cubre o cadro de texto coa dirección, e o resto da información ca que contes
          </div>
          <div class="partial_div-numbered">
            <span>3</span>Presiona no botón "Engadir".
          </div>
          <form>
            <textarea
              bind:value={houseAddress}
              placeholder="Dirección"
              rows="1"
              id="txt_address"
              class="subform-sm"
            ></textarea>
            <textarea 
              bind:value={houseDescription}
              placeholder="Observacións"
              rows="1"
              id="txt_description"
              class="subform"
            ></textarea>
            <textarea
              bind:value={houseLicense}
              placeholder="Licencia"
              rows="1"
              id="txt_license"
              class="subform-sm"
            ></textarea>
            <textarea
              bind:value={houseSources}
              placeholder="Fonte/s"
              rows="1"
              id="txt_sources"
              class="subform-sm"
            ></textarea>

            {#if requestCaptcha}
              <div
                style="margin-top: 16px"
                use:turnstile
                turnstile-sitekey={PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
                on:turnstile={handleTurnstile}
              ></div>
            {/if}
            <!-- <div class="recaptcha-text">
							This site is protected by Turnstile and Cloudflare
							<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener"
								>Privacy Policy</a
							>
							and
							<a href="https://www.cloudflare.com/website-terms/" target="_blank" rel="noopener"
								>Terms of Service</a
							>
							apply.
						</div> -->

<!--            <div class="recaptcha-text">-->
<!--              By submitting I agree to the <a-->
<!--                href="/"-->
<!--                on:click|preventDefault={() => openInfoOverlay(6)}-->
<!--                target="_blank"-->
<!--                rel="noopener">Terms of Use</a-->
<!--              >-->
<!--              and-->
<!--              <a-->
<!--                href="/"-->
<!--                on:click|preventDefault={() => openInfoOverlay(7)}-->
<!--                target="_blank"-->
<!--                rel="noopener">Privacy Policy</a-->
<!--              >.-->
<!--            </div>-->
            <ActionButton
              functionOnClick={() => (requestCaptcha = true)}
              isDisabled={isAddButtonDisabled}>Engadir</ActionButton
            >
          </form>
        </div>
      </section>
    </div>
  </div>
</aside>
