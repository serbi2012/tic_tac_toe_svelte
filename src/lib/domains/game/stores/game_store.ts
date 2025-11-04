import { writable, derived, get } from 'svelte/store';
import type { GameState, GameMode, Player } from '../models/game';
import { createInitialGameState } from '../models/game';
import { GameService } from '../services/game_service';
import { checkWinner } from '../utils/game_logic';

// 게임 상태 스토어
function createGameStore() {
  const { subscribe, set, update } = writable<GameState>(
    createInitialGameState()
  );

  return {
    subscribe,

    // 새 게임 시작
    startGame: (game_mode: GameMode) => {
      set(GameService.startNewGame(game_mode));
    },

    // 수를 둠
    makeMove: (cell_index: number) => {
      update((state) => {
        const new_state = GameService.processMove(state, cell_index);
        return new_state || state;
      });
    },

    // 되돌리기
    undoMove: () => {
      update((state) => {
        const new_state = GameService.undoMove(state);
        return new_state || state;
      });
    },

    // 게임 리셋
    resetGame: () => {
      update((state) => GameService.resetGame(state));
    },

    // 현재 플레이어 설정
    setCurrentPlayer: (player: Player) => {
      update((state) => ({ ...state, current_player: player }));
    },

    // 시간 초과로 인한 강제 승리 처리
    forceWinByTimeout: () => {
      update((state) => {
        // 현재 플레이어의 상대방이 승리
        const winner: Player = state.current_player === 'X' ? 'O' : 'X';
        return {
          ...state,
          status: 'won',
          winner
        };
      });
    }
  };
}

export const game_store = createGameStore();

// 파생 스토어들
export const is_game_over = derived(
  game_store,
  ($state) => $state.status !== 'playing'
);

export const winner = derived(game_store, ($state) => $state.winner);

export const current_player = derived(
  game_store,
  ($state) => $state.current_player
);

export const winning_line = derived(game_store, ($state) => {
  if ($state.status !== 'won') return null;
  const result = checkWinner($state.board);
  return result.winning_line;
});

export const can_undo = derived(
  game_store,
  ($state) => $state.move_history.length > 0
);

// 현재 턴의 경과 시간을 반환하는 파생 스토어
export const turn_start_time = derived(
  game_store,
  ($state) => $state.turn_start_time
);

