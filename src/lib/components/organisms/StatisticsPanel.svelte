<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { statistics_store, total_wins, win_percentage } from '$lib/domains/statistics/stores/statistics_store';
  import Button from '$lib/components/atoms/Button.svelte';
  import { sound_service } from '$lib/domains/sound/services/sound_service';

  export let onClose: () => void;

  function handleClose() {
    sound_service.playClick();
    onClose();
  }

  function handleReset() {
    if (confirm('정말 모든 통계를 초기화하시겠습니까?')) {
      statistics_store.reset();
      sound_service.playClick();
    }
  }

  function formatTime(seconds: number): string {
    if (seconds === Infinity) return '-';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
</script>

<div class="modal-overlay" in:fade={{ duration: 200 }} on:click={handleClose}>
  <div class="modal-content" in:scale={{ duration: 300 }} on:click|stopPropagation>
    <h2 class="modal-title">통계</h2>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">{$statistics_store.total_games}</div>
        <div class="stat-label">총 게임 수</div>
      </div>

      <div class="stat-card highlight">
        <div class="stat-value">{$total_wins}</div>
        <div class="stat-label">승리</div>
      </div>

      <div class="stat-card">
        <div class="stat-value">{$statistics_store.losses}</div>
        <div class="stat-label">패배</div>
      </div>

      <div class="stat-card">
        <div class="stat-value">{$statistics_store.draws}</div>
        <div class="stat-label">무승부</div>
      </div>
    </div>

    <div class="stats-details">
      <div class="detail-row">
        <span class="detail-label">승률</span>
        <span class="detail-value">{$win_percentage}%</span>
      </div>

      <div class="detail-row">
        <span class="detail-label">현재 연승</span>
        <span class="detail-value">{$statistics_store.current_streak}</span>
      </div>

      <div class="detail-row">
        <span class="detail-label">최고 연승</span>
        <span class="detail-value">{$statistics_store.best_streak}</span>
      </div>

      <div class="detail-row">
        <span class="detail-label">평균 게임 시간</span>
        <span class="detail-value">
          {formatTime($statistics_store.average_game_time)}
        </span>
      </div>

      <div class="detail-row">
        <span class="detail-label">최단 승리 시간</span>
        <span class="detail-value">
          {formatTime($statistics_store.fastest_win)}
        </span>
      </div>
    </div>

    <div class="button-group">
      <Button variant="outline" on:click={handleReset}>
        통계 초기화
      </Button>
      <Button variant="primary" on:click={handleClose}>
        닫기
      </Button>
    </div>
  </div>
</div>

<style lang="postcss">
  .modal-overlay {
    @apply fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4;
  }

  .modal-content {
    @apply card w-full max-w-lg;
  }

  .modal-title {
    @apply mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100;
  }

  .stats-grid {
    @apply mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4;
  }

  .stat-card {
    @apply glass rounded-xl p-4 text-center;
  }

  .stat-card.highlight {
    @apply bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30;
  }

  .stat-value {
    @apply text-3xl font-bold text-gray-900 dark:text-gray-100;
  }

  .stat-label {
    @apply mt-1 text-xs text-gray-600 dark:text-gray-400;
  }

  .stats-details {
    @apply glass mb-6 rounded-xl p-4;
  }

  .detail-row {
    @apply flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0 dark:border-gray-700;
  }

  .detail-label {
    @apply text-sm text-gray-600 dark:text-gray-400;
  }

  .detail-value {
    @apply font-semibold text-gray-900 dark:text-gray-100;
  }

  .button-group {
    @apply flex gap-3;
  }
</style>

