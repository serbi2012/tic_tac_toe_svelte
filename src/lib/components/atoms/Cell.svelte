<script lang="ts">
  import type { CellValue } from '$lib/domains/game/models/game';
  import { scale, fade } from 'svelte/transition';

  export let value: CellValue = null;
  export let is_winning: boolean = false;
  export let disabled: boolean = false;
</script>

<button
  class="cell"
  class:cell-winning={is_winning}
  class:disabled
  {disabled}
  on:click
>
  {#if value}
    <span
      class="cell-value"
      class:value-x={value === 'X'}
      class:value-o={value === 'O'}
      in:scale={{ duration: 300, start: 0.5 }}
    >
      {value}
    </span>
  {/if}
</button>

<style lang="postcss">
  .cell {
    @apply relative flex h-24 w-24 items-center justify-center rounded-xl transition-all duration-200 glass shadow-md hover:scale-105 hover:shadow-lg active:scale-95 sm:h-28 sm:w-28;
  }

  .cell:not(.disabled):hover {
    @apply bg-primary-50 dark:bg-primary-900/20;
  }

  .cell.disabled {
    @apply cursor-not-allowed opacity-75;
  }

  .cell.cell-winning {
    @apply animate-bounce-soft bg-gradient-to-br from-primary-400 to-secondary-400 dark:from-primary-600 dark:to-secondary-600;
  }

  .cell-value {
    @apply text-5xl font-bold sm:text-6xl;
  }

  .value-x {
    @apply text-primary-600 dark:text-primary-400;
  }

  .value-o {
    @apply text-secondary-600 dark:text-secondary-400;
  }
</style>

