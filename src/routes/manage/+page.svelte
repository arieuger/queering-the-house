<script>
  import { onMount } from 'svelte';
  import '$lib/style.css';
  import '$lib/navbar_buttons.css';

  // Arreglo para almacenar los datos obtenidos de la BD
  let dataItems = [
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
  ];

  // Objeto para los datos del nuevo item a agregar
  let newItem = {
    name: ''
  };

  // Función para cargar los datos desde la API
  async function loadItems() {
    // TODO
  }

  // Se carga la lista de datos al montar el componente
  onMount(loadItems);
</script>

<svelte:head>
  <title>RENDISTMAP</title>
  <meta
    name="description"
    content="Mapea os pisos turísticos da cidade da Coruña."
  />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="RENDISTMAP - Manage" />
  <meta property="og:site_name" content="Queering The Map" />
  <meta property="og:locale" content="es_GL" />
</svelte:head>

<main>
  <h1>Dashboard de Administración</h1>

  <!-- Sección para mostrar la lista de items -->
  <section>
    <h2>Lista de Items</h2>
    {#if dataItems.length > 0}
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        {#each dataItems as item (item.id)}
          <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>
              <!-- <button on:click={() => deleteItem(item.id)}>Eliminar</button> -->
              <button>Eliminar</button>
            </td>
          </tr>
        {/each}
        </tbody>
      </table>
    {:else}
      <p>No hay items para mostrar.</p>
    {/if}
  </section>
</main>

<!-- Estilos específicos del dashboard -->
<style>
    main {
        max-width: 800px;
        margin: 2rem auto;
        padding: 0 1rem;
    }

    h1, h2 {
        text-align: center;
        color: var(--color-dark);
    }

    section {
        margin-bottom: 2rem;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
    }

    label {
        margin-bottom: 0.5rem;
    }

    input {
        padding: 0.5rem;
        margin-left: 0.5rem;
    }

    button {
        padding: 0.5rem 1rem;
        margin-top: 0.5rem;
        cursor: pointer;
        transition: background-color var(--transition-duration) var(--transition-timing-function);
    }

    button:hover {
        background-color: var(--color-green);
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        border: 1px solid #ccc;
        padding: 0.75rem;
        text-align: left;
    }

    th {
        background-color: #f0f0f0;
    }
</style>
