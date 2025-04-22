<script lang="ts">
  import logo from '$lib/assets/logo.png';
  import InfoButton from './buttons/InfoButton.svelte';
  import AddButton from './buttons/AddButton.svelte';
  import { infoOverlayVisible, addOverlayVisible } from '../stores';
  import FilterButton from '$lib/buttons/FilterButton.svelte';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faBuilding, faCompass }        from '@fortawesome/free-solid-svg-icons';
  import ToggleSwitch from '$lib/buttons/ToggleSwitch.svelte';
  let onTouristPlaces = true;


  function openInfoOverlay() {
    infoOverlayVisible.update(() => true);
  }
  function openAddOverlay() {
    addOverlayVisible.update(() => true);
  }
  function handleToggle(e: CustomEvent<boolean>) {
    onTouristPlaces = e.detail;
    // TODO: Recarga a otro tipo de mapa
  }
</script>

<nav>
  {#if !$infoOverlayVisible}
    <button
      on:click={openInfoOverlay}
      class="overlay-trigger overlay-trigger--info"
      id="info"
      aria-label="open info overlay"
    >
      <InfoButton />
    </button>
  {/if}

  <div id="logo">
    <img src={logo} alt="" />
  </div>

  <button
    on:click={openAddOverlay}
    class="overlay-trigger overlay-trigger--add"
    id="add"
    aria-label="open add overlay"
  >
    <AddButton />
  </button>
  
  <!-- Botón para filtrado -->
  <button
    class="overlay-trigger overlay-trigger--filter"
    id="filter"
    aria-label="open filter overlay"
  >
    <FilterButton />  
  </button>

  <aside class="overlay overlay--switch">
    <div class="action-button-container">
    </div>
      <div class="bordered">
        <section>
          <div class="overlay__section-text no-margin">
            <div class="partial_div">
              <span class="overlay-switch--left">
                <FontAwesomeIcon icon={faBuilding} size="2xl" />
              </span>

              <span class="overlay-switch--center" on:click={() => (onTouristPlaces = !onTouristPlaces)}>
                <ToggleSwitch bind:checked={onTouristPlaces} on:change={handleToggle} />
              </span>

              <span class="overlay-switch--right">
                <FontAwesomeIcon icon={faCompass} size="2xl" />
              </span>
            </div>
          </div>
        </section>
      </div>
  </aside>
</nav>

<style>
  /****************************************************************************/
  /* The logo */
  /****************************************************************************/

  #logo {
    display: inline-block;
    position: absolute;
    text-align: center;
    top: 6px;
    width: 100%;
    margin: 0 auto;
    pointer-events: none;
    z-index: var(--logo-z-index);
  }
  @media (max-width: 800px) {
    #logo img {
      height: 51px;
    }
  }

  @media (min-width: 800px) {
    #logo img {
      width: 200px;
    }
  }

  /****************************************************************************/
  /* The menu buttons (info and add). */
  /****************************************************************************/
  .overlay-trigger {
    border: none;
    background-color: transparent;
    padding: 0;
    top: 0;
    font-size: 2.4em;
    cursor: pointer;
    font-weight: bold;
    position: fixed;
    z-index: var(--overlay-trigger-z-index);
    color: var(--color-dark);
  }

  @media (min-width: 800px) {
    .overlay-trigger {
      top: 0.5em;
    }
  }

  /* Specifically for the info button  */
  .overlay-trigger.overlay-trigger--info {
    left: 9px;
    top: 9px;
  }

  /* Specifically for the add button  */
  .overlay-trigger.overlay-trigger--add {
    right: 9px;
    top: 9px;
  }

  .overlay-trigger.overlay-trigger--filter {
      right: 60px;
      top: 9px;
  }
  .overlay--switch {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.4rem;
      right: 9px;
      top: 60px;
      min-width: 95px;
  }


  .overlay-switch--center {
      flex: 1;
      text-align: center;
      padding: 0.4rem;
  }



</style>
