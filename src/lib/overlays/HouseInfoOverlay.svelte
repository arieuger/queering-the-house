<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import CloseButton from '$lib/buttons/CloseButton.svelte';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faLocationDot, faFileLines, faEye, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
  export let house: {
    address: string;
    description: string;
    license: string;
    sources: string;
  };
  const dispatch = createEventDispatcher<{ close: void }>();

  function closeHouseInfoOverlay() {
    dispatch('close');
  }
</script>

<aside class="overlay overlay--house-info">
  <div class="action-button-container">
    <div>
      <div class="bordered"></div>
      <div class="bordered"></div>
    </div>
    <div>
      <div class="bordered" style="border-right: 0px;"></div>
      <div class="bordered" style="border-right: 0px;"></div>
    </div>

    <CloseButton functionOnClick={closeHouseInfoOverlay} position="right"
    >close add overlay</CloseButton
    >
  </div>

  <div class="overlay__outer">
    <div class="overlay__content">
      <section>
        <div class="overlay__section-title">Detalles da localización</div>
        <div class="overlay__section-text">
          <div class="partial_div-not-numbered">
            <span><FontAwesomeIcon class="icon " icon={ faLocationDot } size="lg" /></span><span>Dirección:</span> {house.address}
          </div>
          <div class="partial_div-not-numbered">
            <span><FontAwesomeIcon class="icon " icon={ faFileLines } size="lg" /></span><span>Licencia:</span> {house.license}
          </div>
          <div class="partial_div-not-numbered">
            <span><FontAwesomeIcon class="icon " icon={ faEye } size="lg" /></span><span>Observacións:</span> {house.description}
          </div>
          <div class="partial_div-not-numbered">
            <span><FontAwesomeIcon class="icon " icon={ faCircleQuestion } size="lg" /></span><span>Fonte/s:</span> {house.sources}
          </div>
        </div>
      </section>
    </div>
  </div>
</aside>