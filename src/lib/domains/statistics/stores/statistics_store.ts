import { writable, derived } from 'svelte/store';
import type { GameStatistics } from '../models/statistics';
import { createInitialStatistics } from '../models/statistics';
import type { Player } from '$lib/domains/game/models/game';

const STORAGE_KEY = 'tic-tac-toe-statistics';

/**
 * 통계 스토어
 */
function createStatisticsStore() {
  // 로컬 스토리지에서 불러오기
  const load_statistics = (): GameStatistics => {
    if (typeof localStorage === 'undefined') {
      return createInitialStatistics();
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return createInitialStatistics();
      }
    }
    return createInitialStatistics();
  };

  const { subscribe, set, update } = writable<GameStatistics>(
    load_statistics()
  );

  // 통계 저장
  const save_statistics = (stats: GameStatistics) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    }
  };

  return {
    subscribe,

    // 게임 결과 기록
    recordGame: (winner: Player | null, player: Player, game_time: number) => {
      update((stats) => {
        const new_stats = { ...stats };
        new_stats.total_games += 1;

        if (winner === null) {
          // 무승부
          new_stats.draws += 1;
          new_stats.current_streak = 0;
        } else if (winner === player) {
          // 승리
          if (player === 'X') {
            new_stats.wins_as_x += 1;
          } else {
            new_stats.wins_as_o += 1;
          }
          new_stats.current_streak += 1;
          new_stats.best_streak = Math.max(
            new_stats.best_streak,
            new_stats.current_streak
          );

          // 최단 시간 기록
          if (game_time < new_stats.fastest_win) {
            new_stats.fastest_win = game_time;
          }
        } else {
          // 패배
          new_stats.losses += 1;
          new_stats.current_streak = 0;
        }

        // 승률 계산
        const total_wins = new_stats.wins_as_x + new_stats.wins_as_o;
        new_stats.win_rate =
          new_stats.total_games > 0
            ? (total_wins / new_stats.total_games) * 100
            : 0;

        // 평균 게임 시간 계산
        const total_time = new_stats.average_game_time * (new_stats.total_games - 1) + game_time;
        new_stats.average_game_time = total_time / new_stats.total_games;

        save_statistics(new_stats);
        return new_stats;
      });
    },

    // 통계 초기화
    reset: () => {
      const initial_stats = createInitialStatistics();
      save_statistics(initial_stats);
      set(initial_stats);
    }
  };
}

export const statistics_store = createStatisticsStore();

// 파생 스토어
export const total_wins = derived(
  statistics_store,
  ($stats) => $stats.wins_as_x + $stats.wins_as_o
);

export const win_percentage = derived(
  statistics_store,
  ($stats) => Math.round($stats.win_rate)
);

