<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import Button from '$lib/components/atoms/Button.svelte';
  import Icon from '$lib/components/atoms/Icon.svelte';
  import { sound_service } from '$lib/domains/sound/services/sound_service';
  import type { GameMode } from '$lib/domains/game/models/game';
  import { game_store } from '$lib/domains/game/stores/game_store';
  import { goto } from '$app/navigation';

  function selectMode(mode: GameMode) {
    sound_service.playClick();
    game_store.startGame(mode);
    goto('/game');
  }
</script>

<div class="mode-selector" in:scale={{ duration: 300, delay: 100 }}>
  <div class="mode-card" in:fade={{ duration: 300, delay: 200 }}>
    <div class="card-content">
      <div class="icon-wrapper icon-local">
        <Icon name="local" size="lg" />
      </div>
      <h3 class="card-title">로컬 대전</h3>
      <p class="card-description">
        같은 컴퓨터에서<br />친구와 대결하세요
      </p>
      <Button variant="primary" fullWidth on:click={() => selectMode('local')}>
        시작하기
      </Button>
    </div>
  </div>

  <div class="mode-card" in:fade={{ duration: 300, delay: 300 }}>
    <div class="card-content">
      <div class="icon-wrapper icon-cpu">
        <Icon name="cpu" size="lg" />
      </div>
      <h3 class="card-title">CPU 대전</h3>
      <p class="card-description">
        AI와 대결하세요<br />난이도 선택 가능
      </p>
      <Button variant="secondary" fullWidth on:click={() => selectMode('cpu')}>
        시작하기
      </Button>
    </div>
  </div>
</div>

<style lang="postcss">
  .mode-selector {
    @apply grid grid-cols-1 gap-6 sm:grid-cols-2;
  }

  .mode-card {
    @apply card min-w-[280px] transition-all duration-300 hover:scale-105 hover:shadow-2xl;
  }

  .card-content {
    @apply flex flex-col items-center gap-4 text-center;
  }

  .icon-wrapper {
    @apply flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300;
  }

  .icon-local {
    @apply bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400;
  }

  .icon-cpu {
    @apply bg-secondary-100 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400;
  }

  .card-title {
    @apply text-2xl font-bold text-gray-900 dark:text-gray-100;
  }

  .card-description {
    @apply text-sm text-gray-600 dark:text-gray-400;
  }
</style>

