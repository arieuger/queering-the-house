<script lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faFilter }        from '@fortawesome/free-solid-svg-icons';

  export let title = 'Filtrar';
</script>

<button class="general_button__fadein" aria-label={title}>
  <FontAwesomeIcon class="icon" icon={faFilter} size="2x" />
</button>