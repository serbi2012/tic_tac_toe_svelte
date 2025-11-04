export interface GameStatistics {
  total_games: number;
  wins_as_x: number;
  wins_as_o: number;
  draws: number;
  losses: number;
  win_rate: number;
  average_game_time: number; // seconds
  fastest_win: number; // seconds
  current_streak: number;
  best_streak: number;
}

export const createInitialStatistics = (): GameStatistics => ({
  total_games: 0,
  wins_as_x: 0,
  wins_as_o: 0,
  draws: 0,
  losses: 0,
  win_rate: 0,
  average_game_time: 0,
  fastest_win: Infinity,
  current_streak: 0,
  best_streak: 0
});

