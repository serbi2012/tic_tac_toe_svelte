import type { AIStrategy } from '../models/ai';
import type { Board, Player } from '$lib/domains/game/models/game';
import {
  getEmptyCells,
  checkWinner,
  getOpponent,
  makeMove
} from '$lib/domains/game/utils/game_logic';
import { WINNING_PATTERNS } from '$lib/domains/game/models/game';

/**
 * Medium AI - 승리/방어 우선, 중앙/코너 전략
 */
export class MediumStrategy implements AIStrategy {
  getMove(board: Board, player: Player): number {
    const empty_cells = getEmptyCells(board);

    if (empty_cells.length === 0) {
      throw new Error('No empty cells available');
    }

    // 1. 이길 수 있는 수가 있는지 확인
    const winning_move = this.findWinningMove(board, player);
    if (winning_move !== null) {
      return winning_move;
    }

    // 2. 상대방의 승리를 막아야 하는지 확인
    const opponent = getOpponent(player);
    const blocking_move = this.findWinningMove(board, opponent);
    if (blocking_move !== null) {
      return blocking_move;
    }

    // 3. 중앙이 비어있으면 중앙 선택
    if (board[4] === null) {
      return 4;
    }

    // 4. 코너 중 하나 선택
    const corners = [0, 2, 6, 8];
    const empty_corners = corners.filter((c) => board[c] === null);
    if (empty_corners.length > 0) {
      return empty_corners[
        Math.floor(Math.random() * empty_corners.length)
      ];
    }

    // 5. 나머지 빈 칸 중 랜덤 선택
    return empty_cells[Math.floor(Math.random() * empty_cells.length)];
  }

  /**
   * 한 수로 이길 수 있는 위치 찾기
   */
  private findWinningMove(board: Board, player: Player): number | null {
    const empty_cells = getEmptyCells(board);

    for (const cell of empty_cells) {
      const test_board = makeMove(board, cell, player);
      const result = checkWinner(test_board);
      if (result.winner === player) {
        return cell;
      }
    }

    return null;
  }
}

