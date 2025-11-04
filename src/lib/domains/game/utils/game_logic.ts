import type { Board, Player, GameResult } from '../models/game';
import { WINNING_PATTERNS } from '../models/game';

/**
 * 승리 조건 체크
 */
export function checkWinner(board: Board): GameResult {
  for (const pattern of WINNING_PATTERNS) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a] as Player,
        is_draw: false,
        winning_line: [a, b, c]
      };
    }
  }

  // 무승부 체크
  const is_draw = board.every((cell) => cell !== null);
  return {
    winner: null,
    is_draw,
    winning_line: null
  };
}

/**
 * 유효한 수인지 확인
 */
export function isValidMove(board: Board, cell_index: number): boolean {
  return (
    cell_index >= 0 && cell_index < 9 && board[cell_index] === null
  );
}

/**
 * 빈 셀들의 인덱스 반환
 */
export function getEmptyCells(board: Board): number[] {
  return board
    .map((cell, index) => (cell === null ? index : -1))
    .filter((index) => index !== -1);
}

/**
 * 상대 플레이어 반환
 */
export function getOpponent(player: Player): Player {
  return player === 'X' ? 'O' : 'X';
}

/**
 * 보드를 복사
 */
export function cloneBoard(board: Board): Board {
  return [...board];
}

/**
 * 특정 위치에 수를 둔 새로운 보드 반환
 */
export function makeMove(
  board: Board,
  cell_index: number,
  player: Player
): Board {
  const new_board = cloneBoard(board);
  new_board[cell_index] = player;
  return new_board;
}

