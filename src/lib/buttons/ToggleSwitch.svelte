<!-- ToggleSwitch.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let checked = false;
  const dispatch = createEventDispatcher<{ change: boolean }>();

  function onToggle() {
    checked = !checked;
    dispatch('change', checked);
  }
</script>

<label class="switch">
  <input type="checkbox" bind:checked on:change={onToggle} />
  <span class="slider"></span>
</label>

<style>
    .switch {
        display: inline-block;
        width: 50px;
        height: 26px;
        position: relative;
    }

    /* Oculta el checkbox real */
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* El contenedor deslizante */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0; left: 0;
        right: 0; bottom: 0;
        background-color: var(--color-dark);
        border-radius: 13px;
        transition: background-color var(--transition-duration) var(--transition-timing-function);
    }

    /* El círculo interno */
    .slider::before {
        content: "";
        position: absolute;
        height: 22px;
        width: 22px;
        left: 2px;
        top: 2px;
        background-color: var(--color-green);
        border-radius: 50%;
        transition: transform var(--transition-duration) var(--transition-timing-function);
    }

    /* Estado ON */
    input:checked + .slider {
        background-color: var(--color-dark);
    }
    input:checked + .slider::before {
        transform: translateX(24px);
    }
</style>
