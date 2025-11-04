<script lang="ts">
  import type { Player } from '$lib/domains/game/models/game';
  import { scale } from 'svelte/transition';

  export let current_player: Player;
  export let game_mode: 'local' | 'cpu';
</script>

<div class="player-indicator" in:scale={{ duration: 200 }}>
  <div class="indicator-content">
    <span
      class="player-symbol"
      class:player-x={current_player === 'X'}
      class:player-o={current_player === 'O'}
    >
      {current_player}
    </span>
    <span class="indicator-text">
      {#if game_mode === 'cpu' && current_player === 'O'}
        AI 차례
      {:else}
        플레이어 차례
      {/if}
    </span>
  </div>
</div>

<style lang="postcss">
  .player-indicator {
    @apply glass rounded-xl p-4;
  }

  .indicator-content {
    @apply flex items-center gap-3;
  }

  .player-symbol {
    @apply flex h-12 w-12 items-center justify-center rounded-lg text-2xl font-bold transition-all duration-200;
  }

  .player-x {
    @apply bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400;
  }

  .player-o {
    @apply bg-secondary-100 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400;
  }

  .indicator-text {
    @apply text-lg font-semibold text-gray-700 dark:text-gray-300;
  }
</style>

