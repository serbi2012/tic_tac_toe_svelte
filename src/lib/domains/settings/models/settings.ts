import type { Difficulty } from '$lib/domains/ai/models/ai';

export interface GameSettings {
  time_limit: number | null; // seconds (null = 무제한)
  ai_difficulty: Difficulty;
  show_hints: boolean;
  sound_enabled: boolean;
  animation_enabled: boolean;
}

export const createDefaultSettings = (): GameSettings => ({
  time_limit: null,
  ai_difficulty: 'medium',
  show_hints: true,
  sound_enabled: true,
  animation_enabled: true
});

export type Theme = 'light' | 'dark';

