/**
 * 사운드 서비스 - Web Audio API를 사용한 간단한 사운드 효과
 */
export class SoundService {
  private audio_context: AudioContext | null = null;
  private enabled: boolean = true;

  constructor(enabled: boolean = true) {
    this.enabled = enabled;
    if (typeof window !== 'undefined' && enabled) {
      this.audio_context = new AudioContext();
    }
  }

  /**
   * 사운드 활성화/비활성화
   */
  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  /**
   * 기본 비프음 생성
   */
  private beep(frequency: number, duration: number, volume: number = 0.3) {
    if (!this.enabled || !this.audio_context) return;

    const oscillator = this.audio_context.createOscillator();
    const gain = this.audio_context.createGain();

    oscillator.connect(gain);
    gain.connect(this.audio_context.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gain.gain.setValueAtTime(volume, this.audio_context.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      this.audio_context.currentTime + duration
    );

    oscillator.start(this.audio_context.currentTime);
    oscillator.stop(this.audio_context.currentTime + duration);
  }

  /**
   * 셀 클릭 사운드
   */
  playMove() {
    this.beep(800, 0.1, 0.2);
  }

  /**
   * 승리 사운드
   */
  playWin() {
    if (!this.enabled || !this.audio_context) return;

    // 상승하는 3음계
    setTimeout(() => this.beep(523, 0.15, 0.25), 0); // C
    setTimeout(() => this.beep(659, 0.15, 0.25), 100); // E
    setTimeout(() => this.beep(784, 0.3, 0.25), 200); // G
  }

  /**
   * 무승부 사운드
   */
  playDraw() {
    if (!this.enabled || !this.audio_context) return;

    this.beep(400, 0.2, 0.2);
    setTimeout(() => this.beep(350, 0.2, 0.2), 150);
  }

  /**
   * 버튼 클릭 사운드
   */
  playClick() {
    this.beep(600, 0.05, 0.15);
  }

  /**
   * 에러 사운드
   */
  playError() {
    this.beep(200, 0.2, 0.2);
  }
}

// 싱글톤 인스턴스
export const sound_service = new SoundService();

