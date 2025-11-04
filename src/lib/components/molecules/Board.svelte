<script lang="ts">
  import type { Board as BoardType } from '$lib/domains/game/models/game';
  import Cell from '$lib/components/atoms/Cell.svelte';

  export let board: BoardType;
  export let winning_line: number[] | null = null;
  export let disabled: boolean = false;
  export let onCellClick: (index: number) => void;

  function handleClick(index: number) {
    if (!disabled && board[index] === null) {
      onCellClick(index);
    }
  }
</script>

<div class="board">
  {#each board as cell, index}
    <Cell
      value={cell}
      is_winning={winning_line?.includes(index) ?? false}
      disabled={disabled || cell !== null}
      on:click={() => handleClick(index)}
    />
  {/each}
</div>

<style lang="postcss">
  .board {
    @apply grid grid-cols-3 gap-3 sm:gap-4;
  }
</style>

