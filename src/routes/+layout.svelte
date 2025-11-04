<script lang="ts">
  import '../lib/styles/global.css';
  import { onMount } from 'svelte';
  import { theme_store } from '$lib/domains/settings/stores/theme_store';

  onMount(() => {
    // 다크 모드 초기화
    const saved_theme = localStorage.getItem('theme');
    if (saved_theme) {
      theme_store.set(saved_theme as 'light' | 'dark');
    } else {
      const prefers_dark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      theme_store.set(prefers_dark ? 'dark' : 'light');
    }
  });

  $: {
    if (typeof document !== 'undefined') {
      if ($theme_store === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
</script>

<div class="min-h-screen">
  <slot />
</div>
