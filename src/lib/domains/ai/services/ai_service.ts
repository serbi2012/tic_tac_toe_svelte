import type { Difficulty, AIStrategy } from '../models/ai';
import type { Board, Player } from '$lib/domains/game/models/game';
import { EasyStrategy } from '../strategies/easy_strategy';
import { MediumStrategy } from '../strategies/medium_strategy';
import { HardStrategy } from '../strategies/hard_strategy';

/**
 * AI 서비스 - AI 전략 관리
 */
export class AIService {
  private strategy: AIStrategy;

  constructor(difficulty: Difficulty) {
    this.strategy = this.createStrategy(difficulty);
  }

  /**
   * 난이도에 따른 전략 생성
   */
  private createStrategy(difficulty: Difficulty): AIStrategy {
    switch (difficulty) {
      case 'easy':
        return new EasyStrategy();
      case 'medium':
        return new MediumStrategy();
      case 'hard':
        return new HardStrategy();
      default:
        return new MediumStrategy();
    }
  }

  /**
   * AI의 다음 수 계산
   */
  async getMove(board: Board, player: Player, think_time: number = 500): Promise<number> {
    // 사람처럼 생각하는 시간 추가 (UX 개선)
    await new Promise((resolve) => setTimeout(resolve, think_time));
    return this.strategy.getMove(board, player);
  }

  /**
   * 난이도 변경
   */
  setDifficulty(difficulty: Difficulty): void {
    this.strategy = this.createStrategy(difficulty);
  }
}

