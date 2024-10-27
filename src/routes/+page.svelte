<script lang="ts">
  import '$lib/style.css';
  import '$lib/maplibre_style.css';
  import '$lib/navbar_buttons.css';
  import AddOverlay from '$lib/AddOverlay.svelte';
  import InfoOverlay from '$lib/InfoOverlay.svelte';
  import Map from '$lib/Map.svelte';
  import NavBar from '$lib/NavBar.svelte';
  import { addOverlayVisible, infoOverlayVisible } from '../stores';
  import qtm_sharing_image from '$lib/assets/logo.png';
  import DonatePopup from '$lib/DonatePopup.svelte';
</script>

<svelte:head>
  <title>QUEERING THE HOUSES</title>
  <meta
    name="description"
    content="Título provisional para unha app baseada en Queering the map para o mapeado das vivendas turísticas na cidade da Coruña."
  />

  <meta property="og:type" content="website" />
<!--  <meta property="og:url" content="https://www.queeringthemap.com/" />-->
  <meta property="og:title" content="Queering The Houses" />
  <meta property="og:image" content={qtm_sharing_image} />
  <meta
    property="og:description"
    content="Título provisional para unha app baseada en Queering the map para o mapeado das vivendas turísticas na cidade da Coruña."
  />
  <meta property="og:site_name" content="Queering The Map" />
  <meta property="og:locale" content="en_US" />
  
  <!-- TODO -->
<!--  <meta-->
<!--    name="google-site-verification"-->
<!--    content="J-oUgPBYWRXkPhvqF8XBrDtrA-qu8pXiMiYPd3QrfhE"-->
<!--  />-->

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Queering The Houses" />
  <meta
    name="twitter:description"
    content="Título provisional para unha app baseada en Queering the map para o mapeado das vivendas turísticas na cidade da Coruña."
  />
  <meta name="twitter:image" content={qtm_sharing_image} />
</svelte:head>

<NavBar></NavBar>
{#if $infoOverlayVisible}
  <InfoOverlay></InfoOverlay>
{/if}
{#if $addOverlayVisible}
  <AddOverlay></AddOverlay>
{/if}
<Map></Map>
<DonatePopup></DonatePopup>
