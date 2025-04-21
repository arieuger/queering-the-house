<script lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faClose } from '@fortawesome/free-solid-svg-icons';
  export let functionOnClick: () => void;
  export let position: 'right' | 'left' = 'left';
</script>

<button
  on:click={functionOnClick}
  class="general_button__fadein close-btn "
  aria-label="close overlay"
  style={position === 'right' ? 'right: 0' : ''}
>
  <FontAwesomeIcon class="close-btn " icon={ faClose } size="2x"/>
</button>

<style>
  button {
    z-index: 999;
  }

  .close-btn {
    position: fixed;
    overflow: hidden;
    padding: 0px;
  }
</style>
