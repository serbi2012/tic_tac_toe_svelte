<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { settings_store } from '$lib/domains/settings/stores/settings_store';
  import Button from '$lib/components/atoms/Button.svelte';
  import { sound_service } from '$lib/domains/sound/services/sound_service';

  export let onClose: () => void;

  const difficulties = [
    { value: 'easy', label: '쉬움' },
    { value: 'medium', label: '보통' },
    { value: 'hard', label: '어려움' }
  ];

  const time_limits = [
    { value: null, label: '제한 없음' },
    { value: 1, label: '1초' },
    { value: 3, label: '3초' },
    { value: 5, label: '5초' }
  ];

  let custom_time_input = '';
  let is_custom_selected = false;

  // 현재 설정된 시간이 기본 옵션에 없으면 커스텀으로 간주
  $: {
    const current_limit = $settings_store.time_limit;
    const is_preset = time_limits.some((t) => t.value === current_limit);
    
    if (!is_preset && current_limit !== null) {
      is_custom_selected = true;
      custom_time_input = current_limit.toString();
    }
  }

  function handleClose() {
    sound_service.playClick();
    onClose();
  }

  function updateDifficulty(difficulty: any) {
    settings_store.updateSetting(
      'ai_difficulty',
      difficulty as 'easy' | 'medium' | 'hard'
    );
    sound_service.playClick();
  }

  function updateTimeLimit(limit: number | null) {
    is_custom_selected = false;
    custom_time_input = '';
    settings_store.updateSetting('time_limit', limit);
    sound_service.playClick();
  }

  function handleCustomTimeInput() {
    const value = parseInt(custom_time_input);
    
    if (isNaN(value) || value < 1 || value > 999) {
      return;
    }
    
    is_custom_selected = true;
    settings_store.updateSetting('time_limit', value);
    sound_service.playClick();
  }

  function validateCustomInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/[^0-9]/g, '');
    custom_time_input = value;
  }

  function toggleSound() {
    settings_store.updateSetting(
      'sound_enabled',
      !$settings_store.sound_enabled
    );
    sound_service.playClick();
  }

  function resetSettings() {
    is_custom_selected = false;
    custom_time_input = '';
    settings_store.reset();
    sound_service.playClick();
  }
</script>

<div class="modal-overlay" in:fade={{ duration: 200 }} on:click={handleClose}>
  <div class="modal-content" in:scale={{ duration: 300 }} on:click|stopPropagation>
    <h2 class="modal-title">설정</h2>

    <div class="settings-section">
      <h3 class="section-title">AI 난이도</h3>
      <div class="button-grid">
        {#each difficulties as { value, label }}
          <button
            class="setting-button"
            class:active={$settings_store.ai_difficulty === value}
            on:click={() => updateDifficulty(value)}
          >
            {label}
          </button>
        {/each}
      </div>
    </div>

    <div class="settings-section">
      <h3 class="section-title">시간 제한 (턴당)</h3>
      <div class="button-grid">
        {#each time_limits as { value, label }}
          <button
            class="setting-button"
            class:active={$settings_store.time_limit === value && 
              !is_custom_selected}
            on:click={() => updateTimeLimit(value)}
          >
            {label}
          </button>
        {/each}
      </div>
      
      <div class="custom-input-row">
        <input
          type="text"
          inputmode="numeric"
          placeholder="커스텀 (초)"
          class="custom-input"
          class:active={is_custom_selected}
          bind:value={custom_time_input}
          on:input={validateCustomInput}
          on:blur={handleCustomTimeInput}
          on:keydown={(e) => e.key === 'Enter' && handleCustomTimeInput()}
          maxlength="3"
        />
        <span class="input-hint">1~999초</span>
      </div>
    </div>

    <div class="settings-section">
      <h3 class="section-title">기타 설정</h3>
      <label class="toggle-row">
        <span>사운드</span>
        <input
          type="checkbox"
          checked={$settings_store.sound_enabled}
          on:change={toggleSound}
          class="toggle"
        />
      </label>
    </div>

    <div class="button-group">
      <Button variant="outline" on:click={resetSettings}>
        기본값으로 복원
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
    @apply card w-full max-w-md;
  }

  .modal-title {
    @apply mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100;
  }

  .settings-section {
    @apply mb-6;
  }

  .section-title {
    @apply mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300;
  }

  .button-grid {
    @apply grid grid-cols-2 gap-2;
  }

  .setting-button {
    @apply glass rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 hover:scale-105 text-gray-700 dark:text-gray-300;
  }

  .setting-button.active {
    @apply bg-primary-600 text-white dark:bg-primary-500;
  }

  .toggle-row {
    @apply glass flex items-center justify-between rounded-lg px-4 py-3 cursor-pointer;
  }

  .toggle {
    @apply h-6 w-11 cursor-pointer appearance-none rounded-full bg-gray-300 dark:bg-gray-600 transition-all duration-200 checked:bg-primary-600 dark:checked:bg-primary-500;
  }

  .button-group {
    @apply mt-6 flex gap-3;
  }

  .custom-input-row {
    @apply mt-3 flex items-center gap-2;
  }

  .custom-input {
    @apply glass flex-1 rounded-lg px-4 py-3 text-sm font-medium 
      transition-all duration-200 
      text-gray-700 dark:text-gray-300 
      placeholder:text-gray-400 dark:placeholder:text-gray-500
      focus:outline-none focus:ring-2 focus:ring-primary-500;
  }

  .custom-input.active {
    @apply bg-primary-600 text-white dark:bg-primary-500 
      placeholder:text-primary-100 dark:placeholder:text-primary-200;
  }

  .input-hint {
    @apply text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap;
  }
</style>

