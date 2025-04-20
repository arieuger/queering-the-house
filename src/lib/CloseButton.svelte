<script lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faClose } from '@fortawesome/free-solid-svg-icons';
  export let functionOnClick: () => void;
  export let position: 'right' | 'left' = 'left';
</script>

<button
  on:click={functionOnClick}
  class="close-btn "
  aria-label="close overlay"
  style={position === 'right' ? 'right: 0' : ''}
>
  <FontAwesomeIcon class="icon general_button__fadein" icon={ faClose } size="xs"/>
</button>

<style>
  button {
    z-index: 999;
  }

  .close-btn {
    position: fixed;
    border: none;
    background-color: transparent;
    overflow: hidden;
    padding: 0px;
  }
</style>
