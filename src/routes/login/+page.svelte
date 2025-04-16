<script>
  import { invalidate, goto } from '$app/navigation';

  let username = '';
  let password = '';
  let errorMessage = '';

  async function login(event) {
    event.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      // Actualiza datos en el cliente y redirige a la sección protegida
      await invalidate();
      goto('/manage');
    } else {
      const errorRes = await res.json();
      errorMessage = errorRes.error || 'Error en el login';
    }
  }
</script>

<main>
  <h1>Iniciar Sesión</h1>
  {#if errorMessage}
    <p style="color:red;">{errorMessage}</p>
  {/if}
  <form on:submit={login}>
    <label>
      Usuario:
      <input type="text" bind:value={username} required />
    </label>
    <br />
    <label>
      Contraseña:
      <input type="password" bind:value={password} required />
    </label>
    <br />
    <button type="submit">Login</button>
  </form>
</main>
