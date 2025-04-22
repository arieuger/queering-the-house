<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import CloseButton from '$lib/CloseButton.svelte';
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
        <div class="overlay__section-title">Engade unha vivenda</div>
        <div class="overlay__section-text">
          <div class="partial_div-numbered">
            <span >D</span>Dirección: {house.address}
          </div>
          <div class="partial_div-numbered">
            <span >O</span>Observacións: {house.description}
          </div>
          <div class="partial_div-numbered">
            <span >L</span>Licencia: {house.license}
          </div>
          <div class="partial_div-numbered">
            <span >F</span>Fonte/s: {house.sources}
          </div>
        </div>
      </section>
    </div>
  </div>
</aside>