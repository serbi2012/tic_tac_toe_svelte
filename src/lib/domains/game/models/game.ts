// 게임 타입 정의
export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[];
export type GameMode = 'local' | 'cpu';
export type GameStatus = 'playing' | 'won' | 'draw';

export interface GameState {
  board: Board;
  current_player: Player;
  game_mode: GameMode;
  status: GameStatus;
  winner: Player | null;
  move_history: number[];
  start_time: number;
  elapsed_time: number;
  turn_start_time: number; // 현재 턴 시작 시간
}

export interface GameResult {
  winner: Player | null;
  is_draw: boolean;
  winning_line: number[] | null;
}

// 승리 조합 패턴
export const WINNING_PATTERNS = [
  [0, 1, 2], // 첫 번째 행
  [3, 4, 5], // 두 번째 행
  [6, 7, 8], // 세 번째 행
  [0, 3, 6], // 첫 번째 열
  [1, 4, 7], // 두 번째 열
  [2, 5, 8], // 세 번째 열
  [0, 4, 8], // 대각선 (왼쪽 위 -> 오른쪽 아래)
  [2, 4, 6] // 대각선 (오른쪽 위 -> 왼쪽 아래)
] as const;

// 초기 게임 상태
export const createInitialGameState = (
  game_mode: GameMode = 'local'
): GameState => ({
  board: Array(9).fill(null),
  current_player: 'X',
  game_mode,
  status: 'playing',
  winner: null,
  move_history: [],
  start_time: Date.now(),
  elapsed_time: 0,
  turn_start_time: Date.now()
});

