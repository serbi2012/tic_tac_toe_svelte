<script lang="ts">
  import Button from '$lib/components/atoms/Button.svelte';
  import Icon from '$lib/components/atoms/Icon.svelte';

  export let can_undo: boolean = false;
  export let onReset: () => void;
  export let onUndo: () => void;
  export let onSettings: () => void;
  export let onStats: () => void;
</script>

<div class="controls">
  <Button variant="outline" size="sm" on:click={onUndo} disabled={!can_undo}>
    <div class="btn-content">
      <Icon name="undo" size="sm" />
      <span>되돌리기</span>
    </div>
  </Button>

  <Button variant="outline" size="sm" on:click={onReset}>
    <div class="btn-content">
      <Icon name="reset" size="sm" />
      <span>새 게임</span>
    </div>
  </Button>

  <Button variant="ghost" size="sm" on:click={onSettings}>
    <Icon name="settings" />
  </Button>

  <Button variant="ghost" size="sm" on:click={onStats}>
    <Icon name="stats" />
  </Button>
</div>

<style lang="postcss">
  .controls {
    @apply flex flex-wrap items-center justify-center gap-2;
  }

  .btn-content {
    @apply flex items-center gap-2;
  }
</style>

