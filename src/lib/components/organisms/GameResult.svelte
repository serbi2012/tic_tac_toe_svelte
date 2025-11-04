<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import type { Player, GameMode } from '$lib/domains/game/models/game';
  import Button from '$lib/components/atoms/Button.svelte';

  export let winner: Player | null;
  export let game_mode: GameMode;
  export let onPlayAgain: () => void;
  export let onBackToMenu: () => void;

  $: is_draw = winner === null;
  $: result_title = is_draw 
    ? '무승부!' 
    : game_mode === 'cpu' && winner === 'O'
    ? 'AI 승리!'
    : `플레이어 ${winner} 승리!`;
  
  $: result_emoji = is_draw ? '🤝' : '🎉';
</script>

<div class="modal-overlay" in:fade={{ duration: 200 }} on:click={onBackToMenu}>
  <div
    class="modal-content"
    in:scale={{ duration: 300, delay: 100 }}
    on:click|stopPropagation
  >
    <div class="result-emoji">{result_emoji}</div>
    
    <h2 class="result-title">{result_title}</h2>
    
    {#if !is_draw}
      <p class="result-message">
        {#if game_mode === 'cpu' && winner === 'X'}
          축하합니다! AI를 이겼습니다!
        {:else if game_mode === 'cpu' && winner === 'O'}
          다시 도전해보세요!
        {:else}
          축하합니다!
        {/if}
      </p>
    {:else}
      <p class="result-message">
        좋은 경기였습니다!
      </p>
    {/if}

    <div class="button-group">
      <Button variant="primary" size="lg" on:click={onPlayAgain}>
        다시 하기
      </Button>
      <Button variant="outline" size="lg" on:click={onBackToMenu}>
        메인 메뉴
      </Button>
    </div>
  </div>
</div>

<style lang="postcss">
  .modal-overlay {
    @apply fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4;
  }

  .modal-content {
    @apply card max-w-md text-center;
  }

  .result-emoji {
    @apply mb-4 text-6xl;
  }

  .result-title {
    @apply mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100;
  }

  .result-message {
    @apply mb-6 text-lg text-gray-600 dark:text-gray-400;
  }

  .button-group {
    @apply flex flex-col gap-3;
  }
</style>

