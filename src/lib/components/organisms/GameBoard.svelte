<script lang="ts">
  import { onMount } from 'svelte';
  import { 
    game_store, 
    winning_line, 
    can_undo, 
    is_game_over,
    turn_start_time
  } from '$lib/domains/game/stores/game_store';
  import { settings_store } from '$lib/domains/settings/stores/settings_store';
  import { statistics_store } from '$lib/domains/statistics/stores/statistics_store';
  import { sound_service } from '$lib/domains/sound/services/sound_service';
  import { AIService } from '$lib/domains/ai/services/ai_service';
  import type { GameMode } from '$lib/domains/game/models/game';
  
  import Board from '$lib/components/molecules/Board.svelte';
  import PlayerIndicator from '$lib/components/molecules/PlayerIndicator.svelte';
  import Timer from '$lib/components/molecules/Timer.svelte';
  import GameControls from '$lib/components/molecules/GameControls.svelte';
  import GameResult from '$lib/components/organisms/GameResult.svelte';

  export let game_mode: GameMode;
  export let onBackToMenu: () => void;
  export let onOpenSettings: () => void;
  export let onOpenStats: () => void;

  let ai_service: AIService;
  let is_ai_thinking = false;
  let show_result_modal = false;

  $: ai_service = new AIService($settings_store.ai_difficulty);
  $: sound_service.setEnabled($settings_store.sound_enabled);

  // AI 차례 처리
  $: if (
    game_mode === 'cpu' &&
    $game_store.current_player === 'O' &&
    $game_store.status === 'playing' &&
    !is_ai_thinking
  ) {
    handleAIMove();
  }

  // 게임 종료 처리
  $: if ($is_game_over && !show_result_modal) {
    show_result_modal = true;
    handleGameEnd();
  }

  async function handleAIMove() {
    is_ai_thinking = true;
    
    try {
      const think_time = $settings_store.ai_difficulty === 'easy' ? 300 : 
                        $settings_store.ai_difficulty === 'medium' ? 500 : 700;
      
      const move = await ai_service.getMove(
        $game_store.board,
        'O',
        think_time
      );
      
      game_store.makeMove(move);
      
      if ($settings_store.sound_enabled) {
        sound_service.playMove();
      }
    } finally {
      is_ai_thinking = false;
    }
  }

  function handleCellClick(index: number) {
    if (is_ai_thinking) return;
    
    game_store.makeMove(index);
    
    if ($settings_store.sound_enabled) {
      sound_service.playMove();
    }
  }

  function handleGameEnd() {
    const { winner, elapsed_time } = $game_store;
    
    // 통계 기록 (CPU 모드일 때만)
    if (game_mode === 'cpu') {
      statistics_store.recordGame(winner, 'X', elapsed_time);
    }
    
    // 사운드 재생
    if ($settings_store.sound_enabled) {
      if (winner) {
        sound_service.playWin();
      } else {
        sound_service.playDraw();
      }
    }
  }

  function handleReset() {
    game_store.resetGame();
    show_result_modal = false;
    
    if ($settings_store.sound_enabled) {
      sound_service.playClick();
    }
  }

  function handleUndo() {
    game_store.undoMove();
    
    if ($settings_store.sound_enabled) {
      sound_service.playClick();
    }
  }

  function handlePlayAgain() {
    show_result_modal = false;
    handleReset();
  }

  function handleTimeUp() {
    // 시간 초과 시 현재 플레이어가 패배 (상대방 승리)
    if ($settings_store.sound_enabled) {
      sound_service.playError();
    }
    
    game_store.forceWinByTimeout();
  }
</script>

<div class="game-board-container">
  <div class="game-header">
    <PlayerIndicator
      current_player={$game_store.current_player}
      game_mode={game_mode}
    />
    
    {#if $settings_store.time_limit}
      <Timer
        time_limit={$settings_store.time_limit}
        turn_start_time={$turn_start_time}
        is_running={$game_store.status === 'playing'}
        onTimeUp={handleTimeUp}
      />
    {/if}
  </div>

  <div class="board-wrapper">
    <Board
      board={$game_store.board}
      winning_line={$winning_line}
      disabled={is_ai_thinking || $is_game_over}
      onCellClick={handleCellClick}
    />
  </div>

  <div class="game-controls">
    <GameControls
      can_undo={$can_undo && !is_ai_thinking}
      onReset={handleReset}
      onUndo={handleUndo}
      onSettings={onOpenSettings}
      onStats={onOpenStats}
    />
  </div>

  <div class="back-button">
    <button class="btn-back" on:click={onBackToMenu}>
      메인 메뉴로 돌아가기
    </button>
  </div>
</div>

{#if show_result_modal}
  <GameResult
    winner={$game_store.winner}
    game_mode={game_mode}
    onPlayAgain={handlePlayAgain}
    onBackToMenu={onBackToMenu}
  />
{/if}

<style lang="postcss">
  .game-board-container {
    @apply flex flex-col items-center gap-6 p-4;
  }

  .game-header {
    @apply flex w-full max-w-md flex-col gap-4 sm:flex-row sm:items-center sm:justify-between;
  }

  .board-wrapper {
    @apply my-4;
  }

  .game-controls {
    @apply w-full max-w-md;
  }

  .back-button {
    @apply mt-4;
  }

  .btn-back {
    @apply glass rounded-lg px-6 py-2 text-sm transition-all duration-200 hover:scale-105 hover:shadow-md text-gray-600 dark:text-gray-400;
  }
</style>

