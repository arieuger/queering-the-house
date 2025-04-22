<script lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faAdd }        from '@fortawesome/free-solid-svg-icons';

  export let title = 'Anadir';
</script>

<button class="general_button__fadein" aria-label={title}>
  <FontAwesomeIcon class="icon" icon={faAdd} size="2x" />
</button>