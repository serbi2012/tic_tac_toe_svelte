import type { GameState, Player, GameMode } from '../models/game';
import { createInitialGameState } from '../models/game';
import {
  checkWinner,
  isValidMove,
  getOpponent,
  makeMove
} from '../utils/game_logic';

/**
 * 게임 서비스 - 게임 비즈니스 로직 처리
 */
export class GameService {
  /**
   * 새 게임 시작
   */
  static startNewGame(game_mode: GameMode): GameState {
    return createInitialGameState(game_mode);
  }

  /**
   * 수를 둠
   */
  static processMove(
    state: GameState,
    cell_index: number
  ): GameState | null {
    // 게임이 이미 끝났거나 유효하지 않은 수인 경우
    if (state.status !== 'playing' || !isValidMove(state.board, cell_index)) {
      return null;
    }

    // 새 보드 생성
    const new_board = makeMove(
      state.board,
      cell_index,
      state.current_player
    );

    // 승리/무승부 체크
    const result = checkWinner(new_board);

    // 새 상태 생성
    const new_state: GameState = {
      ...state,
      board: new_board,
      move_history: [...state.move_history, cell_index],
      elapsed_time: Math.floor((Date.now() - state.start_time) / 1000)
    };

    if (result.winner) {
      // 승리
      new_state.status = 'won';
      new_state.winner = result.winner;
    } else if (result.is_draw) {
      // 무승부
      new_state.status = 'draw';
    } else {
      // 게임 계속 - 플레이어 교체
      new_state.current_player = getOpponent(state.current_player);
      // 턴이 바뀔 때 타이머 리셋
      new_state.turn_start_time = Date.now();
    }

    return new_state;
  }

  /**
   * 한 수 되돌리기
   */
  static undoMove(state: GameState): GameState | null {
    if (state.move_history.length === 0) {
      return null;
    }

    // 마지막 수 제거
    const new_history = [...state.move_history];
    const last_move = new_history.pop()!;

    // 보드 재구성
    const new_board = createInitialGameState(state.game_mode).board;
    let current_player: Player = 'X';

    for (const move of new_history) {
      new_board[move] = current_player;
      current_player = getOpponent(current_player);
    }

    return {
      ...state,
      board: new_board,
      current_player,
      move_history: new_history,
      status: 'playing',
      winner: null,
      turn_start_time: Date.now() // 되돌리기 시 타이머 리셋
    };
  }

  /**
   * 게임 리셋
   */
  static resetGame(state: GameState): GameState {
    return createInitialGameState(state.game_mode);
  }
}

