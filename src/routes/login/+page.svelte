<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  // Si ya estás logueado, redirige automáticamente
  export let data : { user: null | { name, email, roles } };
  onMount(() => {
    if (data.user) {
      goto('/manage');
    }
  });

  // Al hacer clic lanzamos la petición GET a nuestro endpoint de login
  function loginWithOAuth() {
    // Simplemente navegamos al endpoint que redirige al proveedor
    window.location.href = '/api/auth/login';
  }
</script>

<main>
  <h1>Iniciar sesión</h1>
  <p>Para acceder al dashboard utiliza tu cuenta OAuth:</p>
  <button on:click={loginWithOAuth}>
    Login con proveedor OAuth
  </button>
</main>

<style>
    main {
        max-width: 400px;
        margin: 2rem auto;
        padding: 1rem;
        text-align: center;
        font-family: sans-serif;
    }
    button {
        margin-top: 1rem;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        cursor: pointer;
    }
</style>
