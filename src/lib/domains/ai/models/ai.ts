import type { Board, Player } from '$lib/domains/game/models/game';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface AIStrategy {
  getMove(board: Board, player: Player): number;
}

export interface AIConfig {
  difficulty: Difficulty;
  think_time: number; // 생각하는 시간 (ms)
}

export const createAIConfig = (difficulty: Difficulty = 'medium'): AIConfig => ({
  difficulty,
  think_time: difficulty === 'easy' ? 300 : difficulty === 'medium' ? 500 : 700
});

