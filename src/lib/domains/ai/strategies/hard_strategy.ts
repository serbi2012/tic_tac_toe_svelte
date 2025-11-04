import type { AIStrategy } from '../models/ai';
import type { Board, Player } from '$lib/domains/game/models/game';
import {
  getEmptyCells,
  checkWinner,
  getOpponent,
  makeMove
} from '$lib/domains/game/utils/game_logic';

/**
 * Hard AI - Minimax 알고리즘 (완벽한 플레이)
 */
export class HardStrategy implements AIStrategy {
  getMove(board: Board, player: Player): number {
    const empty_cells = getEmptyCells(board);

    if (empty_cells.length === 0) {
      throw new Error('No empty cells available');
    }

    // 첫 수라면 최적화: 코너나 중앙 선택
    if (empty_cells.length === 9) {
      return [0, 2, 4, 6, 8][Math.floor(Math.random() * 5)];
    }

    // Minimax 알고리즘으로 최적의 수 찾기
    let best_score = -Infinity;
    let best_move = empty_cells[0];

    for (const cell of empty_cells) {
      const test_board = makeMove(board, cell, player);
      const score = this.minimax(test_board, 0, false, player);

      if (score > best_score) {
        best_score = score;
        best_move = cell;
      }
    }

    return best_move;
  }

  /**
   * Minimax 알고리즘
   * @param board 현재 보드 상태
   * @param depth 탐색 깊이
   * @param is_maximizing 최대화 여부
   * @param ai_player AI 플레이어
   */
  private minimax(
    board: Board,
    depth: number,
    is_maximizing: boolean,
    ai_player: Player
  ): number {
    const result = checkWinner(board);
    const opponent = getOpponent(ai_player);

    // 종료 조건
    if (result.winner === ai_player) {
      return 10 - depth; // 더 빨리 이기면 더 높은 점수
    }
    if (result.winner === opponent) {
      return depth - 10; // 더 빨리 지면 더 낮은 점수
    }
    if (result.is_draw) {
      return 0;
    }

    const empty_cells = getEmptyCells(board);

    if (is_maximizing) {
      // AI의 차례 - 최대값 찾기
      let max_score = -Infinity;

      for (const cell of empty_cells) {
        const test_board = makeMove(board, cell, ai_player);
        const score = this.minimax(test_board, depth + 1, false, ai_player);
        max_score = Math.max(max_score, score);
      }

      return max_score;
    } else {
      // 상대방의 차례 - 최소값 찾기
      let min_score = Infinity;

      for (const cell of empty_cells) {
        const test_board = makeMove(board, cell, opponent);
        const score = this.minimax(test_board, depth + 1, true, ai_player);
        min_score = Math.min(min_score, score);
      }

      return min_score;
    }
  }
}

