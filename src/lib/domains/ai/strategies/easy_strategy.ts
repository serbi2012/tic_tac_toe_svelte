import type { AIStrategy } from '../models/ai';
import type { Board, Player } from '$lib/domains/game/models/game';
import { getEmptyCells } from '$lib/domains/game/utils/game_logic';

/**
 * Easy AI - 랜덤하게 빈 칸 선택
 */
export class EasyStrategy implements AIStrategy {
  getMove(board: Board, player: Player): number {
    const empty_cells = getEmptyCells(board);

    if (empty_cells.length === 0) {
      throw new Error('No empty cells available');
    }

    // 랜덤 선택
    const random_index = Math.floor(Math.random() * empty_cells.length);
    return empty_cells[random_index];
  }
}

