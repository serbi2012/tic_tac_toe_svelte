<script lang="ts">
  import GameModeSelector from '$lib/components/organisms/GameModeSelector.svelte';
  import ThemeToggle from '$lib/components/atoms/ThemeToggle.svelte';
</script>

<div class="flex min-h-screen flex-col items-center justify-center p-4">
  <div class="absolute right-4 top-4">
    <ThemeToggle />
  </div>

  <div class="mb-12 text-center">
    <h1
      class="mb-4 text-6xl font-bold text-primary-600 dark:text-primary-400"
    >
      틱택토
    </h1>
    <p class="text-lg text-gray-600 dark:text-gray-400">
      모던하고 심플한 틱택토 게임
    </p>
  </div>

  <GameModeSelector />
</div>
