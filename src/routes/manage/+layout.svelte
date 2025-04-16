<script>

  import logo from '$lib/assets/logo.png';

  // Opciones del menú
  let menuOptions = [
    { name: 'Dashboard', link: '/manage' },
    { name: 'Usuarios', link: '/manage' },
    { name: 'Pisos', link: '/manage' },
    { name: 'Moderación', link: '/manage' }
  ];

  // Variable para controlar la visibilidad de la sidebar en móvil
  let isSidebarOpen = false;
</script>

<!-- Botón de menú hamburguesa para dispositivos móviles (oculto en escritorio) -->
<button
  class="hamburger {isSidebarOpen ? 'open' : ''}"
  on:click={() => (isSidebarOpen = !isSidebarOpen)}
  aria-label="Abrir menú">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
    <path d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z" />
  </svg>
</button>

<div class="layout">
  <!-- Sidebar -->
  <aside class="sidebar {isSidebarOpen ? 'open' : ''}">
    <!-- Encabezado de la sidebar con logo y botón cerrar -->
    <div class="sidebar-header">
      <div class="logo">
        <!-- Puedes usar import del logo o una ruta estática -->
        <img src={logo} alt="Rendist Map" />
      </div>
      <!-- Botón para cerrar el menú, se mostrará únicamente en móvil -->
      <button class="close-btn" on:click={() => isSidebarOpen = false} aria-label="Cerrar menú">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="32" height="32">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" fill="none" />
        </svg>
      </button>
    </div>

    <nav>
      <ul>
        {#each menuOptions as option}
          <li>
            <a href={option.link} on:click={() => (isSidebarOpen = false)}>
              {option.name}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </aside>

  <!-- Contenido principal -->
  <main class="content" on:click={() => isSidebarOpen = false}>
    <slot />
  </main>
</div>

<style>
    /* Contenedor principal: sidebar + contenido */
    .layout {
        display: flex;
        min-height: 100vh;
    }

    /* Sidebar (modo escritorio) */
    .sidebar {
        width: 250px;
        background-color: var(--color-dark);
        padding: 1rem;
        box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
        transition: transform var(--transition-duration) var(--transition-timing-function);
        position: relative;
    }

    /* Encabezado de la sidebar con logo y botón cerrar */
    .sidebar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
    }
    .logo img {
        max-width: 80%;
        height: auto;
        display: block;
    }

    /* Menú de opciones */
    nav ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    nav ul li {
        margin-bottom: 1rem;
    }
    nav ul li a {
        display: block;
        text-decoration: none;
        color: var(--color-green);
        font-weight: bold;
        padding: 0.5rem;
        border-radius: 4px;
        transition: background-color var(--transition-duration) var(--transition-timing-function);
    }
    nav ul li a:hover {
        background-color: var(--color-green);
        color: var(--color-dark);
    }

    /* Contenido principal */
    .content {
        flex: 1;
        padding: 1rem;
    }

    /* Botón hamburguesa: oculto en escritorio */
    .hamburger {
        display: none;
        position: fixed;
        top: 1rem;
        left: 1rem;
        background: none;
        border: none;
        z-index: 100;
        cursor: pointer;
        color: var(--color-dark);
    }

    /* Por defecto, el botón para cerrar no se muestra en escritorio */
    .close-btn {
        display: none;
    }

    /* Adaptaciones para pantallas móviles (max-width: 800px) */
    @media screen and (max-width: 800px) {
        .hamburger {
            display: block;
        }

        /* La sidebar se posiciona fija en la pantalla móvil */
        .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            transform: translateX(-100%);
            z-index: 50;
        }
        .sidebar.open {
            transform: translateX(0);
        }

        .hamburger.open {
            display: none;
        }

        /* Mostrar el botón cerrar dentro de la sidebar en móvil */
        .close-btn {
            display: block;
            background: none;
            border: none;
            cursor: pointer;
            color: var(--color-green);
        }
    }
</style>
