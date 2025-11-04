<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let time_limit: number | null = null; // seconds
  export let turn_start_time: number; // 턴 시작 시간 (timestamp)
  export let is_running: boolean = true;
  export let onTimeUp: (() => void) | null = null;

  let interval: number | null = null;
  let display_time = 0;
  let has_called_time_up = false;

  // 턴 시작 시간이 바뀌면 타이머 리셋
  $: {
    turn_start_time;
    display_time = 0;
    has_called_time_up = false;
  }

  // 시간 초과 체크
  $: if (
    time_limit && 
    display_time >= time_limit && 
    onTimeUp && 
    !has_called_time_up
  ) {
    has_called_time_up = true;
    onTimeUp();
  }

  $: remaining_time = time_limit ? time_limit - display_time : null;
  
  // 시간 제한의 40% 이하일 때 경고, 20% 이하일 때 위험
  $: is_warning = 
    remaining_time !== null && 
    time_limit !== null && 
    remaining_time <= time_limit * 0.4 &&
    remaining_time > time_limit * 0.2;
  
  $: is_danger = 
    remaining_time !== null && 
    time_limit !== null && 
    remaining_time <= time_limit * 0.2;

  onMount(() => {
    if (is_running) {
      interval = window.setInterval(() => {
        display_time = Math.floor((Date.now() - turn_start_time) / 1000);
      }, 100); // 더 정확한 시간 측정을 위해 100ms마다 업데이트
    }
  });

  onDestroy(() => {
    if (interval) {
      clearInterval(interval);
    }
  });

  $: if (!is_running && interval) {
    clearInterval(interval);
    interval = null;
  } else if (is_running && !interval) {
    interval = window.setInterval(() => {
      display_time = Math.floor((Date.now() - turn_start_time) / 1000);
    }, 100);
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
</script>

<div class="timer" class:warning={is_warning} class:danger={is_danger}>
  <div class="timer-label">
    {time_limit ? '남은 시간' : '경과 시간'}
  </div>
  <div class="timer-value">
    {time_limit ? formatTime(remaining_time ?? 0) : formatTime(display_time)}
  </div>
</div>

<style lang="postcss">
  .timer {
    @apply glass rounded-xl p-4 text-center transition-all duration-300;
  }

  .timer-label {
    @apply text-sm font-medium text-gray-600 dark:text-gray-400;
  }

  .timer-value {
    @apply mt-1 text-3xl font-bold text-gray-900 dark:text-gray-100 font-mono;
  }

  .timer.warning {
    @apply border-2 border-yellow-500;
  }

  .timer.danger {
    @apply animate-pulse border-2 border-red-500;
  }

  .timer.danger .timer-value {
    @apply text-red-600 dark:text-red-400;
  }
</style>

