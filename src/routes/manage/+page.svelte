<script>
  import { onMount } from 'svelte';
  import '$lib/style.css';
  import '$lib/navbar_buttons.css';
  import '$lib/admin-style.css';

  // Arreglo para almacenar los datos obtenidos de la BD
  let dataItems = [
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
    {id: 3, name: 'Item 2'},
    {id: 4, name: 'Item 2'},
    {id: 5, name: 'Item 2'},
    {id: 6, name: 'Item 2'},
    {id: 7, name: 'Item 2'},
    {id: 8, name: 'Item 2'},
    {id: 9, name: 'Item 2'},
    {id: 10, name: 'Item 2'},
    {id: 11, name: 'Item 2'},
    {id: 12, name: 'Item 2'},
    {id: 13, name: 'Item 2'},
    {id: 14, name: 'Item 2'},
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
            <td data-label="ID">{item.id}</td>
            <td data-label="Nombre">{item.name}</td>
            <td data-label="Acciones">
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
