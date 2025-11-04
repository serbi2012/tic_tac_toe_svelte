# Tic-Tac-Toe 프로젝트 개선 TODO 리스트

## 📋 목차
1. [하드 모드 실수율 조정](#1-하드-모드-실수율-조정)
2. [통계 세분화](#2-통계-세분화)
3. [로컬 대결 선공 교대 시스템](#3-로컬-대결-선공-교대-시스템)
4. [로컬 대결 시리즈 매치](#4-로컬-대결-시리즈-매치)

---

## 1. 하드 모드 실수율 조정

### 목표
하드 모드 AI가 3번째 수에서 더 높은 확률로 실수하도록 수정

### 세부 작업

#### 1.1 AI 전략 모델 수정
- **파일**: `src/lib/domains/ai/strategies/hard_strategy.ts`
- **작업 내용**:
  - [ ] `HardStrategy` 클래스에 `move_count` 추적 변수 추가
  - [ ] `getMove` 메서드에 현재 수가 몇 번째 수인지 계산하는 로직 추가
    - 보드의 빈 칸 개수로 판단 (9 - empty_cells.length + 1)
  - [ ] 수 순서에 따른 실수 확률 설정
    - 1번째 수: 실수 확률 0% (최적 수)
    - 2번째 수: 실수 확률 0.5% (거의 최적)
    - 3번째 수: 실수 확률 10~15% (의도적 실수 증가)
    - 4번째 수 이후: 실수 확률 1~2% (원래대로)
  - [ ] `makeSuboptimalMove` 메서드 개선
    - 3번째 수일 때는 더 넓은 범위에서 선택 (상위 30~50%)
    - 다른 수일 때는 기존대로 (상위 50~80%)

#### 1.2 설정 옵션 추가 (선택사항)
- **파일**: `src/lib/domains/settings/models/settings.ts`
- **작업 내용**:
  - [ ] Settings 타입에 `customize_ai_difficulty` 옵션 추가
  - [ ] AI 실수율을 사용자가 커스터마이징 할 수 있는 옵션 추가

#### 1.3 테스트
- [ ] 하드 모드에서 100게임 시뮬레이션 실행
- [ ] 3번째 수에서의 실수 빈도 확인 및 조정
- [ ] 전체적인 승률이 너무 낮아지지 않았는지 확인 (AI 승률 70~80% 유지)

---

## 2. 통계 세분화

### 목표
통계를 난이도별, 게임 모드별(로컬/CPU)로 세분화하여 기록 및 표시

### 세부 작업

#### 2.1 통계 데이터 모델 재설계
- **파일**: `src/lib/domains/statistics/models/statistics.ts`
- **작업 내용**:
  - [ ] 기존 `GameStatistics` 인터페이스 백업 (하위 호환성)
  - [ ] 새로운 통계 구조 설계:
    ```typescript
    interface DetailedStatistics {
      // 로컬 대결 통계
      local: {
        total_games: number;
        wins_as_x: number;
        wins_as_o: number;
        draws: number;
        win_rate: number;
        fastest_win: number;
        average_game_time: number;
        current_streak: number;
        best_streak: number;
      };
      
      // CPU 대결 통계 (난이도별)
      cpu: {
        easy: GameModeStatistics;
        medium: GameModeStatistics;
        hard: GameModeStatistics;
        overall: GameModeStatistics; // 전체 CPU 통계
      };
    }
    
    interface GameModeStatistics {
      total_games: number;
      wins: number;
      draws: number;
      losses: number;
      win_rate: number;
      fastest_win: number;
      average_game_time: number;
      current_streak: number;
      best_streak: number;
    }
    ```
  - [ ] `createInitialDetailedStatistics()` 함수 작성
  - [ ] 마이그레이션 함수 작성 (기존 통계를 새 구조로 변환)

#### 2.2 통계 스토어 업데이트
- **파일**: `src/lib/domains/statistics/stores/statistics_store.ts`
- **작업 내용**:
  - [ ] `recordGame` 메서드 시그니처 변경
    - 파라미터 추가: `game_mode: GameMode`, `difficulty?: Difficulty`
  - [ ] 게임 결과 기록 로직 수정
    - 로컬 게임일 경우 `local` 객체에 기록
    - CPU 게임일 경우 `cpu.[difficulty]` 객체에 기록
  - [ ] 통계 저장 시 마이그레이션 체크
  - [ ] 기존 localStorage 데이터 자동 마이그레이션 로직 추가

#### 2.3 게임 서비스 수정
- **파일**: `src/lib/domains/game/services/game_service.ts`
- **작업 내용**:
  - [ ] `GameState`에 `difficulty?: Difficulty` 필드 추가
  - [ ] 게임 종료 시 통계 기록 부분 수정
    - 게임 모드와 난이도 정보를 함께 전달

#### 2.4 통계 표시 UI 컴포넌트 수정
- **파일**: `src/lib/components/organisms/StatisticsPanel.svelte`
- **작업 내용**:
  - [ ] 탭 UI 추가 (전체 / 로컬 / CPU)
  - [ ] CPU 탭에서 난이도별 통계 표시
    - Easy / Medium / Hard 서브탭 또는 드롭다운
  - [ ] 각 모드별로 다음 정보 표시:
    - 총 게임 수
    - 승/무/패
    - 승률
    - 최단 승리 시간
    - 평균 게임 시간
    - 현재 연승
    - 최고 연승
  - [ ] 그래프/차트 추가 (선택사항)
    - 난이도별 승률 비교 막대 그래프
    - 시간에 따른 승률 변화 선 그래프

#### 2.5 파생 스토어 추가
- **파일**: `src/lib/domains/statistics/stores/statistics_store.ts`
- **작업 내용**:
  - [ ] `local_statistics`: 로컬 대결 통계만 반환
  - [ ] `cpu_statistics`: CPU 대결 통계만 반환
  - [ ] `cpu_by_difficulty(difficulty)`: 특정 난이도 통계 반환
  - [ ] `overall_win_rate`: 전체 승률 계산

---

## 3. 로컬 대결 선공 교대 시스템

### 목표
로컬 대결 시 매 게임마다 선공(X)과 후공(O)을 자동으로 교대

### 세부 작업

#### 3.1 게임 상태 모델 확장
- **파일**: `src/lib/domains/game/models/game.ts`
- **작업 내용**:
  - [ ] `GameState` 인터페이스에 필드 추가:
    - `auto_switch_sides: boolean` - 선공 교대 활성화 여부
    - `games_played_in_series: number` - 시리즈 내 플레이한 게임 수
    - `next_starting_player: Player` - 다음 게임의 선공 플레이어
  - [ ] `createInitialGameState` 함수에 새 필드 초기화 추가

#### 3.2 게임 서비스 로직 수정
- **파일**: `src/lib/domains/game/services/game_service.ts`
- **작업 내용**:
  - [ ] `startNewGame` 메서드 수정
    - `auto_switch_sides`가 true일 때 `next_starting_player`를 현재 플레이어로 설정
    - 게임 시작 시 `games_played_in_series` 증가
  - [ ] `resetGame` 메서드 수정
    - 리셋 시 `next_starting_player`를 토글 (X ↔ O)
    - 선공 교대가 활성화된 경우에만 적용
  - [ ] 새로운 메서드 추가:
    - `toggleAutoSwitchSides()`: 선공 교대 옵션 토글
    - `setNextStartingPlayer(player: Player)`: 다음 선공 플레이어 수동 설정

#### 3.3 게임 스토어 업데이트
- **파일**: `src/lib/domains/game/stores/game_store.ts`
- **작업 내용**:
  - [ ] `toggleAutoSwitchSides` 액션 추가
  - [ ] `setNextStartingPlayer` 액션 추가
  - [ ] 파생 스토어 추가:
    - `auto_switch_enabled`: 선공 교대 활성화 상태
    - `next_starting_player`: 다음 게임 선공 플레이어

#### 3.4 설정 패널 UI 추가
- **파일**: `src/lib/components/organisms/SettingsPanel.svelte`
- **작업 내용**:
  - [ ] 로컬 게임 모드일 때만 표시되는 섹션 추가
  - [ ] "선공 자동 교대" 토글 스위치 추가
  - [ ] 현재 시리즈에서 몇 번째 게임인지 표시
  - [ ] 다음 게임의 선공 플레이어 표시 (X 또는 O)

#### 3.5 게임 시작/종료 UI 개선
- **파일**: `src/lib/components/organisms/GameResult.svelte`
- **작업 내용**:
  - [ ] 게임 종료 화면에 다음 게임 정보 표시
    - "다음 게임은 [X/O]가 선공입니다" 메시지 추가
  - [ ] 다음 게임 버튼 클릭 시 자동으로 선공 교대 적용

#### 3.6 시각적 피드백
- **파일**: `src/lib/components/molecules/PlayerIndicator.svelte`
- **작업 내용**:
  - [ ] 선공 교대 활성화 시 아이콘 또는 배지 표시
  - [ ] 다음 게임의 선공 플레이어를 미리 강조 표시

---

## 4. 로컬 대결 시리즈 매치

### 목표
로컬 대결 시 정해진 판수(10판, 20판 등)로 시리즈를 진행하고 최종 승자 결정

### 세부 작업

#### 4.1 시리즈 매치 모델 설계
- **파일**: `src/lib/domains/game/models/game.ts` (또는 새 파일 `series.ts`)
- **작업 내용**:
  - [ ] 새로운 타입/인터페이스 정의:
    ```typescript
    type SeriesLength = 3 | 5 | 10 | 20 | null; // null = 무제한
    
    interface SeriesState {
      enabled: boolean;
      total_games: SeriesLength;
      current_game: number;
      player_x_wins: number;
      player_o_wins: number;
      draws: number;
      series_winner: Player | null;
      is_series_complete: boolean;
    }
    ```
  - [ ] `createInitialSeriesState()` 함수 작성
  - [ ] `GameState`에 `series?: SeriesState` 필드 추가

#### 4.2 시리즈 관리 서비스 생성
- **파일**: `src/lib/domains/game/services/series_service.ts` (신규)
- **작업 내용**:
  - [ ] `SeriesService` 클래스 작성
  - [ ] 메서드 구현:
    - `startSeries(length: SeriesLength)`: 시리즈 시작
    - `recordGameResult(winner: Player | null)`: 게임 결과 기록
    - `nextGame()`: 다음 게임으로 진행
    - `isSeriesComplete()`: 시리즈 종료 여부 체크
    - `getSeriesWinner()`: 시리즈 승자 반환
    - `getSeriesProgress()`: 진행 상황 반환 (X: 3승, O: 2승 등)
    - `canEndEarly()`: 조기 종료 가능 여부 (예: 10판 중 6승 확정)
    - `resetSeries()`: 시리즈 초기화

#### 4.3 게임 스토어에 시리즈 로직 통합
- **파일**: `src/lib/domains/game/stores/game_store.ts`
- **작업 내용**:
  - [ ] 시리즈 관련 액션 추가:
    - `startSeries(length: SeriesLength)`: 시리즈 모드 시작
    - `endSeries()`: 시리즈 종료
    - `nextGameInSeries()`: 시리즈의 다음 게임 시작
  - [ ] 게임 종료 시 시리즈 상태 자동 업데이트
  - [ ] 시리즈 완료 시 최종 승자 결정 로직
  - [ ] 파생 스토어 추가:
    - `series_enabled`: 시리즈 모드 활성화 여부
    - `series_progress`: 시리즈 진행 상황
    - `series_winner`: 시리즈 승자

#### 4.4 게임 모드 선택기 UI 수정
- **파일**: `src/lib/components/organisms/GameModeSelector.svelte`
- **작업 내용**:
  - [ ] 로컬 모드 선택 시 추가 옵션 표시
  - [ ] 시리즈 매치 활성화 토글
  - [ ] 판수 선택 드롭다운/버튼 그룹
    - 3판 2선승
    - 5판 3선승
    - 10판
    - 20판
    - 무제한 (기본)
  - [ ] 선택된 판수에 따른 설명 표시

#### 4.5 시리즈 진행 상황 표시 컴포넌트
- **파일**: `src/lib/components/molecules/SeriesProgress.svelte` (신규)
- **작업 내용**:
  - [ ] 시리즈 스코어보드 UI 생성
    - 플레이어 X 승수
    - 플레이어 O 승수
    - 무승부 수
    - 현재 게임 번호 / 전체 게임 수
  - [ ] 진행률 바 (예: 10판 중 5판 완료)
  - [ ] 승리까지 필요한 게임 수 표시
  - [ ] 애니메이션 효과 (게임 승리 시 스코어 증가)

#### 4.6 시리즈 결과 화면
- **파일**: `src/lib/components/organisms/SeriesResult.svelte` (신규)
- **작업 내용**:
  - [ ] 시리즈 최종 승자 표시
  - [ ] 최종 스코어 요약
    - 플레이어 X: n승
    - 플레이어 O: m승
    - 무승부: k회
  - [ ] 시리즈 통계 표시
    - 총 게임 시간
    - 가장 빠른 승리
    - 평균 게임 시간
  - [ ] 액션 버튼
    - 새 시리즈 시작
    - 메인 메뉴로 돌아가기
    - 통계 보기

#### 4.7 게임 진행 흐름 수정
- **파일**: `src/routes/game/+page.svelte`
- **작업 내용**:
  - [ ] 시리즈 모드일 때와 일반 모드일 때 UI 분기
  - [ ] 게임 종료 후 처리 로직 수정:
    - 시리즈 모드: 시리즈가 끝났는지 체크
      - 완료되지 않음 → 다음 게임 버튼 표시
      - 완료됨 → 시리즈 결과 화면 표시
    - 일반 모드: 기존대로 게임 결과 화면 표시
  - [ ] SeriesProgress 컴포넌트 조건부 렌더링

#### 4.8 시리즈 통계 연동
- **파일**: `src/lib/domains/statistics/stores/statistics_store.ts`
- **작업 내용**:
  - [ ] 시리즈 게임 결과도 통계에 개별적으로 기록
  - [ ] 시리즈 완료 시 추가 통계 항목:
    - 완료된 시리즈 수
    - 시리즈 승률
    - 가장 긴 시리즈 (게임 수)

#### 4.9 선공 교대와 통합
- **작업 내용**:
  - [ ] 시리즈 모드에서는 선공 교대가 자동으로 활성화
  - [ ] 시리즈의 홀수 게임은 X 선공, 짝수 게임은 O 선공
  - [ ] 또는 매 게임마다 이전 게임 패자가 선공 (옵션)

#### 4.10 저장 및 복원
- **파일**: `src/lib/domains/game/stores/game_store.ts`
- **작업 내용**:
  - [ ] 시리즈 진행 중 브라우저 새로고침 시 상태 보존
  - [ ] localStorage에 시리즈 상태 저장
  - [ ] 페이지 로드 시 진행 중인 시리즈 복원 여부 확인
  - [ ] 복원 확인 다이얼로그 추가

---

## 📝 구현 순서 권장사항

### Phase 1: 기반 작업
1. **통계 세분화 (작업 2)** 
   - 다른 기능들의 기반이 되는 데이터 구조
   - 먼저 구현해야 나머지 기능의 통계 기록이 정확함

### Phase 2: 개별 기능
2. **하드 모드 실수율 조정 (작업 1)**
   - 독립적인 기능
   - 빠르게 구현 가능
   
3. **로컬 대결 선공 교대 (작업 3)**
   - 시리즈 매치의 일부로 사용될 기능
   - 먼저 구현 후 시리즈 매치에 통합

### Phase 3: 복합 기능
4. **로컬 대결 시리즈 매치 (작업 4)**
   - 가장 복잡한 기능
   - 선공 교대 기능을 활용
   - 세분화된 통계 시스템을 활용

---

## 🧪 테스트 체크리스트

### 작업 1: 하드 모드 실수율
- [ ] 3번째 수에서 실수 빈도가 증가했는지 확인
- [ ] 전체 AI 승률이 적정 수준(70-80%)인지 확인
- [ ] 1-2번째 수는 여전히 최적인지 확인

### 작업 2: 통계 세분화
- [ ] 기존 통계 데이터가 새 구조로 올바르게 마이그레이션 되는지 확인
- [ ] 로컬 게임과 CPU 게임이 각각 올바른 통계에 기록되는지 확인
- [ ] 난이도별 통계가 정확히 분리되는지 확인
- [ ] UI에서 모든 통계가 올바르게 표시되는지 확인

### 작업 3: 선공 교대
- [ ] 매 게임마다 선공이 교대로 변경되는지 확인
- [ ] 선공 교대 비활성화 시 항상 X가 선공인지 확인
- [ ] 시리즈 중간에 선공 교대 옵션을 변경해도 문제없는지 확인

### 작업 4: 시리즈 매치
- [ ] 정해진 판수가 정확히 진행되는지 확인
- [ ] 조기 종료 조건이 올바르게 작동하는지 확인 (예: 10판 중 6승)
- [ ] 시리즈 통계가 정확히 기록되는지 확인
- [ ] 시리즈 진행 중 새로고침 후 복원이 되는지 확인
- [ ] 시리즈 완료 후 새 시리즈를 시작할 수 있는지 확인

---

## 📌 추가 고려사항

### 성능 최적화
- [ ] 통계 데이터가 너무 커지지 않도록 데이터 압축 고려
- [ ] 시리즈 매치 중 불필요한 리렌더링 최소화

### UX 개선
- [ ] 모든 새로운 기능에 대한 튜토리얼/가이드 추가
- [ ] 로딩 상태 및 에러 상태 처리
- [ ] 애니메이션 및 트랜지션 효과 추가

### 접근성
- [ ] 키보드 네비게이션 지원
- [ ] 스크린 리더 지원
- [ ] 색상 대비 확인

### 반응형 디자인
- [ ] 모바일에서 시리즈 진행 상황 표시 최적화
- [ ] 작은 화면에서 통계 패널 레이아웃 조정

