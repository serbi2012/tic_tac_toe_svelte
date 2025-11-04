<script lang="ts">
  import { theme_store } from '$lib/domains/settings/stores/theme_store';
  import { sound_service } from '$lib/domains/sound/services/sound_service';

  function toggleTheme() {
    sound_service.playClick();
    theme_store.toggle();
  }
</script>

<button
  class="theme-toggle"
  on:click={toggleTheme}
  aria-label="테마 전환"
>
  {#if $theme_store === 'light'}
    <svg
      class="icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  {:else}
    <svg
      class="icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  {/if}
</button>

<style lang="postcss">
  .theme-toggle {
    @apply glass rounded-full p-3 transition-all duration-200 hover:scale-110 hover:shadow-lg active:scale-95 text-gray-700 dark:text-gray-300;
  }

  .icon {
    @apply h-6 w-6;
  }
</style>

