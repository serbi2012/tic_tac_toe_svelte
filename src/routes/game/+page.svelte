<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { game_store } from '$lib/domains/game/stores/game_store';
  import GameBoard from '$lib/components/organisms/GameBoard.svelte';
  import SettingsPanel from '$lib/components/organisms/SettingsPanel.svelte';
  import StatisticsPanel from '$lib/components/organisms/StatisticsPanel.svelte';
  import ThemeToggle from '$lib/components/atoms/ThemeToggle.svelte';

  let show_settings = false;
  let show_stats = false;

  function handleBackToMenu() {
    goto('/');
  }

  function openSettings() {
    show_settings = true;
  }

  function closeSettings() {
    show_settings = false;
  }

  function openStats() {
    show_stats = true;
  }

  function closeStats() {
    show_stats = false;
  }
</script>

<div class="game-page">
  <div class="absolute right-4 top-4">
    <ThemeToggle />
  </div>

  <GameBoard
    game_mode={$game_store.game_mode}
    onBackToMenu={handleBackToMenu}
    onOpenSettings={openSettings}
    onOpenStats={openStats}
  />
</div>

{#if show_settings}
  <SettingsPanel onClose={closeSettings} />
{/if}

{#if show_stats}
  <StatisticsPanel onClose={closeStats} />
{/if}

<style>
  .game-page {
    @apply flex min-h-screen flex-col items-center justify-center p-4;
  }
</style>

