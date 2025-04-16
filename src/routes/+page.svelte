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
</script>

<svelte:head>
  <title>RENDISTMAP</title>
  <meta
    name="description"
    content="Mapea os pisos turísticos da cidade da Coruña."
  />

  <meta property="og:type" content="website" />
<!--  <meta property="og:url" content="https://www.queeringthemap.com/" />-->
  <meta property="og:title" content="RENDISTMAP" />
  <meta property="og:image" content={qtm_sharing_image} />
  <meta
    property="og:description"
    content="Mapea os pisos turísticos da cidade da Coruña."
  />
  <meta property="og:site_name" content="RENDISTMAP" />
  <meta property="og:locale" content="es_GL" />
  
  <!-- TODO -->
<!--  <meta-->
<!--    name="google-site-verification"-->
<!--    content="J-oUgPBYWRXkPhvqF8XBrDtrA-qu8pXiMiYPd3QrfhE"-->
<!--  />-->

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="RENDISTMAP" />
  <meta
    name="twitter:description"
    content="Mapea os pisos turísticos da cidade da Coruña."
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
