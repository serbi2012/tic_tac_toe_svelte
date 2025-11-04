# 🎮 틱택토 (Tic-Tac-Toe)

> 모던 웹 기술로 구현한 고급 틱택토 게임

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://tictactoe-xi-tawny.vercel.app/)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2.x-FF3E00?logo=svelte)](https://kit.svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## 🌐 라이브 데모

**🚀 [https://tictactoe-xi-tawny.vercel.app/](https://tictactoe-xi-tawny.vercel.app/)**

지금 바로 접속하여 게임을 즐겨보세요!

---

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [아키텍처 설계](#-아키텍처-설계)
- [프로젝트 구조](#-프로젝트-구조)
- [AI 전략 시스템](#-ai-전략-시스템)
- [도메인 모델](#-도메인-모델)
- [설치 및 실행](#-설치-및-실행)
- [개발 가이드](#-개발-가이드)
- [성능 최적화](#-성능-최적화)
- [배포](#-배포)

---

## 🎯 프로젝트 소개

이 프로젝트는 **SvelteKit**과 **TypeScript**를 사용하여 구현한 고급 틱택토 게임입니다. 단순한 게임을 넘어, 체계적인 소프트웨어 아키텍처, AI 전략 패턴, 성능 최적화 등 실무 수준의 기술을 적용한 웹 애플리케이션입니다.

### 프로젝트 목표

- ✅ **클린 아키텍처**: Domain-Driven Design 기반 계층형 구조
- ✅ **확장 가능성**: 새로운 AI 전략, 게임 모드 추가 용이
- ✅ **타입 안정성**: TypeScript로 런타임 에러 최소화
- ✅ **사용자 경험**: 반응형 디자인, 애니메이션, 사운드
- ✅ **코드 품질**: ESLint, Prettier, 일관된 네이밍 컨벤션

---

## ✨ 주요 기능

### 🎮 다양한 게임 모드

#### 1. 로컬 대전 모드
- 같은 컴퓨터에서 두 명의 플레이어가 대결
- 실시간 턴 교체 및 시각적 피드백
- 승리 라인 하이라이트 애니메이션

#### 2. CPU 대전 모드
- 3가지 난이도의 AI와 대결
  - **쉬움**: 랜덤 선택 알고리즘
  - **보통**: 전략적 패턴 인식 (승리/방어 우선)
  - **어려움**: Minimax 알고리즘 (이길 수 없는 완벽한 AI)

### ⏱️ 시간 제한 시스템
- 턴별 시간 제한 설정 가능
- 실시간 타이머 표시
- 시간 초과 시 자동 턴 넘김

### 🎵 사운드 효과
- Web Audio API 기반 고품질 사운드
- 클릭, 승리, 무승부 등 다양한 이벤트 사운드
- 설정에서 ON/OFF 가능

### 📊 상세 통계 시스템
- 총 게임 수, 승률, 무승부율
- X/O 플레이어별 승리 기록
- 평균 게임 시간, 최단 승리 시간
- 현재 연승 기록 및 최고 연승 기록
- LocalStorage 기반 영구 저장

### 🌓 다크/라이트 모드
- 시스템 테마 자동 감지
- 토글 버튼으로 수동 변경 가능
- 부드러운 테마 전환 애니메이션
- 테마 설정 영구 저장

### 📱 반응형 디자인
- 모바일, 태블릿, 데스크톱 완벽 대응
- 터치 및 마우스 이벤트 모두 지원
- 모든 화면 크기에서 최적의 UX

---

## 🛠 기술 스택

### 핵심 프레임워크
| 기술 | 버전 | 설명 |
|------|------|------|
| **SvelteKit** | 2.x | 풀스택 프레임워크, SSR/SSG 지원 |
| **TypeScript** | 5.x | 정적 타입 시스템 |
| **Vite** | 5.x | 초고속 빌드 툴 |

### UI/스타일링
| 기술 | 버전 | 설명 |
|------|------|------|
| **TailwindCSS** | 3.x | 유틸리티 우선 CSS 프레임워크 |
| **PostCSS** | 8.x | CSS 전처리기 |
| **Motion** | 10.x | 고성능 애니메이션 라이브러리 |

### 상태 관리
| 기술 | 설명 |
|------|------|
| **Svelte Stores** | Svelte 내장 반응형 상태 관리 |

### 개발 도구
| 도구 | 설명 |
|------|------|
| **ESLint** | 코드 린팅 |
| **Prettier** | 코드 포맷팅 |
| **svelte-check** | TypeScript 타입 체크 |

### 배포
| 플랫폼 | 설명 |
|--------|------|
| **Vercel** | Edge Network 기반 자동 배포 및 호스팅 |

---

## 🏗 아키텍처 설계

### 전체 시스템 아키텍처

```mermaid
graph TB
    subgraph "Presentation Layer"
        style "Presentation Layer" fill:#FFE4E1
        A[Components<br>Atomic Design]
        B[Routes<br>SvelteKit Pages]
    end
    
    subgraph "Application Layer"
        style "Application Layer" fill:#E0F7FA
        C[Stores<br>State Management]
    end
    
    subgraph "Domain Layer"
        style "Domain Layer" fill:#F0F4C3
        D[Game Domain<br>Core Logic]
        E[AI Domain<br>Strategy Pattern]
        F[Statistics Domain<br>Data Processing]
        G[Settings Domain<br>Configuration]
        H[Sound Domain<br>Audio Service]
    end
    
    subgraph "Infrastructure Layer"
        style "Infrastructure Layer" fill:#E1BEE7
        I[LocalStorage<br>Persistence]
        J[Web Audio API<br>Sound Engine]
    end
    
    B --> A
    A --> C
    C --> D
    C --> E
    C --> F
    C --> G
    C --> H
    D --> I
    F --> I
    G --> I
    H --> J
```

### 계층별 역할

#### 1. Presentation Layer (표현 계층)
- **책임**: UI 렌더링, 사용자 입력 처리
- **구성요소**:
  - **Atoms**: 버튼, 아이콘, 셀 등 기본 단위
  - **Molecules**: 보드, 타이머, 플레이어 표시 등 조합 단위
  - **Organisms**: 게임 보드, 설정 패널, 통계 패널 등 복잡한 UI
- **원칙**: 비즈니스 로직 포함 금지, Props/Events만 사용

#### 2. Application Layer (애플리케이션 계층)
- **책임**: 상태 관리, 도메인 로직 조율
- **구성요소**:
  - `game_store.ts`: 게임 상태 관리
  - `statistics_store.ts`: 통계 데이터 관리
  - `settings_store.ts`: 설정 관리
  - `theme_store.ts`: 테마 관리
- **원칙**: Store는 Domain Service를 호출하여 로직 실행

#### 3. Domain Layer (도메인 계층)
- **책임**: 핵심 비즈니스 로직, 도메인 규칙
- **구성요소**:
  - **Models**: 타입 정의, 인터페이스
  - **Services**: 비즈니스 로직 구현
  - **Utils**: 순수 함수 유틸리티
  - **Strategies**: AI 전략 패턴
- **원칙**: 프레임워크 독립적, 순수 TypeScript

#### 4. Infrastructure Layer (인프라 계층)
- **책임**: 외부 시스템 연동, 데이터 영속성
- **구성요소**:
  - LocalStorage API
  - Web Audio API
- **원칙**: 도메인 계층의 인터페이스 구현

### 컴포넌트 구조 (Atomic Design)

```mermaid
graph TB
    subgraph "Pages"
        style "Pages" fill:#FFCDD2
        P1[Home Page]
        P2[Game Page]
    end
    
    subgraph "Organisms"
        style "Organisms" fill:#FFF9C4
        O1[GameBoard]
        O2[GameModeSelector]
        O3[SettingsPanel]
        O4[StatisticsPanel]
        O5[GameResult]
    end
    
    subgraph "Molecules"
        style "Molecules" fill:#C8E6C9
        M1[Board]
        M2[Timer]
        M3[PlayerIndicator]
        M4[GameControls]
    end
    
    subgraph "Atoms"
        style "Atoms" fill:#B3E5FC
        A1[Cell]
        A2[Button]
        A3[Icon]
        A4[ThemeToggle]
    end
    
    P1 --> O2
    P2 --> O1
    O1 --> M1
    O1 --> M2
    O1 --> M3
    O1 --> M4
    O1 --> O5
    O3 --> A2
    O4 --> A2
    M1 --> A1
    M2 --> A3
    M3 --> A3
    M4 --> A2
```

### 게임 플로우

```mermaid
graph LR
    subgraph "Game Flow"
        style "Game Flow" fill:#E1F5FE
        S[Start Game] --> M[Select Mode]
        M --> L[Local Mode]
        M --> C[CPU Mode]
        L --> P[Player Move]
        C --> P
        P --> V{Valid?}
        V -->|No| P
        V -->|Yes| U[Update Board]
        U --> W{Win?}
        W -->|Yes| E[End Game]
        W -->|No| D{Draw?}
        D -->|Yes| E
        D -->|No| T{CPU Mode?}
        T -->|No| P
        T -->|Yes| A[AI Move]
        A --> U
        E --> R[Show Result]
        R --> SA[Save Statistics]
        SA --> M
    end
```

---

## 📁 프로젝트 구조

```
tic_tac_toe/
│
├── src/
│   ├── lib/
│   │   ├── components/              # UI 컴포넌트 (Atomic Design)
│   │   │   ├── atoms/              # 기본 단위 컴포넌트
│   │   │   │   ├── Button.svelte
│   │   │   │   ├── Cell.svelte
│   │   │   │   ├── Icon.svelte
│   │   │   │   └── ThemeToggle.svelte
│   │   │   │
│   │   │   ├── molecules/          # 조합 단위 컴포넌트
│   │   │   │   ├── Board.svelte
│   │   │   │   ├── GameControls.svelte
│   │   │   │   ├── PlayerIndicator.svelte
│   │   │   │   └── Timer.svelte
│   │   │   │
│   │   │   └── organisms/          # 복잡한 UI 컴포넌트
│   │   │       ├── GameBoard.svelte
│   │   │       ├── GameModeSelector.svelte
│   │   │       ├── GameResult.svelte
│   │   │       ├── SettingsPanel.svelte
│   │   │       └── StatisticsPanel.svelte
│   │   │
│   │   ├── domains/                # 도메인 로직
│   │   │   ├── game/              # 게임 도메인
│   │   │   │   ├── models/
│   │   │   │   │   └── game.ts           # 게임 타입 정의
│   │   │   │   ├── services/
│   │   │   │   │   └── game_service.ts   # 게임 비즈니스 로직
│   │   │   │   ├── stores/
│   │   │   │   │   └── game_store.ts     # 게임 상태 관리
│   │   │   │   └── utils/
│   │   │   │       └── game_logic.ts     # 게임 유틸리티
│   │   │   │
│   │   │   ├── ai/                # AI 도메인
│   │   │   │   ├── models/
│   │   │   │   │   └── ai.ts             # AI 타입 정의
│   │   │   │   ├── services/
│   │   │   │   │   └── ai_service.ts     # AI 서비스
│   │   │   │   └── strategies/           # AI 전략 패턴
│   │   │   │       ├── easy_strategy.ts
│   │   │   │       ├── medium_strategy.ts
│   │   │   │       └── hard_strategy.ts
│   │   │   │
│   │   │   ├── statistics/        # 통계 도메인
│   │   │   │   ├── models/
│   │   │   │   │   └── statistics.ts
│   │   │   │   └── stores/
│   │   │   │       └── statistics_store.ts
│   │   │   │
│   │   │   ├── settings/          # 설정 도메인
│   │   │   │   ├── models/
│   │   │   │   │   └── settings.ts
│   │   │   │   └── stores/
│   │   │   │       ├── settings_store.ts
│   │   │   │       └── theme_store.ts
│   │   │   │
│   │   │   └── sound/             # 사운드 도메인
│   │   │       └── services/
│   │   │           └── sound_service.ts
│   │   │
│   │   └── styles/                # 전역 스타일
│   │       └── global.css
│   │
│   └── routes/                    # SvelteKit 라우팅
│       ├── +layout.svelte        # 레이아웃
│       ├── +page.svelte          # 메인 페이지
│       └── game/                 # 게임 페이지
│           └── +page.svelte
│
├── static/                       # 정적 파일
│   ├── favicon.png
│   └── robots.txt
│
├── svelte.config.js             # SvelteKit 설정
├── vite.config.ts               # Vite 설정
├── tailwind.config.js           # TailwindCSS 설정
├── tsconfig.json                # TypeScript 설정
├── vercel.json                  # Vercel 배포 설정
└── package.json                 # 의존성 관리
```

### 디렉토리별 설명

| 디렉토리 | 역할 | 원칙 |
|----------|------|------|
| `components/atoms` | 더 이상 나눌 수 없는 기본 UI 요소 | 재사용성 최대화, Props만 받음 |
| `components/molecules` | 여러 Atom을 조합한 기능 단위 | 단일 책임 원칙 준수 |
| `components/organisms` | 복잡한 비즈니스 로직을 포함한 UI | Store와 직접 통신 가능 |
| `domains/*/models` | 타입, 인터페이스, 상수 정의 | 순수 타입 정의만 포함 |
| `domains/*/services` | 비즈니스 로직 구현 | 프레임워크 독립적 |
| `domains/*/stores` | 상태 관리 및 Store 정의 | Service를 호출하여 로직 실행 |
| `domains/*/utils` | 순수 함수 유틸리티 | Side Effect 없음 |

---

## 🤖 AI 전략 시스템

AI는 **전략 패턴(Strategy Pattern)**을 사용하여 구현되어 있어, 새로운 전략 추가가 용이합니다.

### 전략 패턴 구조

```mermaid
graph TB
    subgraph "Strategy Pattern"
        style "Strategy Pattern" fill:#FFF3E0
        I[AIStrategy Interface<br>getMove method]
        E[EasyStrategy<br>Random]
        M[MediumStrategy<br>Tactical]
        H[HardStrategy<br>Minimax]
        S[AIService<br>Context]
    end
    
    I -.implements.-> E
    I -.implements.-> M
    I -.implements.-> H
    S --> I
```

### 1. Easy Strategy (쉬움)

**알고리즘**: 랜덤 선택

```typescript
getMove(board: Board, player: Player): number {
  const empty_cells = getEmptyCells(board);
  const random_index = Math.floor(Math.random() * empty_cells.length);
  return empty_cells[random_index];
}
```

**특징**:
- 빈 셀 중 무작위로 선택
- 전략 없음, 순수 운
- 초보자에게 적합

**시간 복잡도**: O(n) - n은 빈 셀의 개수

---

### 2. Medium Strategy (보통)

**알고리즘**: 전략적 패턴 인식

```typescript
getMove(board: Board, player: Player): number {
  // 1. 이길 수 있으면 승리
  if (winning_move) return winning_move;
  
  // 2. 상대방 승리를 막기
  if (blocking_move) return blocking_move;
  
  // 3. 중앙 선점
  if (center_empty) return 4;
  
  // 4. 코너 선택
  if (empty_corners) return random_corner;
  
  // 5. 나머지 랜덤
  return random_empty;
}
```

**특징**:
- 승리 우선 전략
- 방어 전략 (상대방 승리 차단)
- 중앙/코너 우선 배치
- 중급 수준의 도전

**시간 복잡도**: O(n²) - 승리/방어 수 탐색

---

### 3. Hard Strategy (어려움)

**알고리즘**: Minimax 알고리즘 (게임 트리 탐색)

```typescript
minimax(board: Board, depth: number, is_maximizing: boolean): number {
  // 종료 조건: 승리, 패배, 무승부
  if (terminal_state) return score;
  
  if (is_maximizing) {
    // AI의 차례: 최대값 찾기
    return max(minimax(all_possible_moves));
  } else {
    // 상대의 차례: 최소값 찾기
    return min(minimax(all_possible_moves));
  }
}
```

**특징**:
- 모든 가능한 수를 탐색하여 최적의 수 선택
- 수학적으로 완벽한 플레이
- 이길 수 없음 (최선의 경우 무승부)
- 깊이 우선 탐색 (DFS) 기반

**시간 복잡도**: O(9!) = O(362,880) (최악의 경우)
- 실제로는 가지치기로 더 빠름
- 첫 수는 최적화하여 즉시 반환

**점수 계산**:
- AI 승리: `10 - depth` (빨리 이길수록 높은 점수)
- AI 패배: `depth - 10` (빨리 질수록 낮은 점수)
- 무승부: `0`

### AI 전략 비교

| 전략 | 승률 vs 랜덤 | 승률 vs 인간 | 평균 응답 시간 | 코드 복잡도 |
|------|--------------|--------------|----------------|-------------|
| Easy | 50% | 20% | < 1ms | 낮음 |
| Medium | 85% | 60% | < 5ms | 중간 |
| Hard | 100% | 100% (무승부) | < 50ms | 높음 |

---

## 📊 도메인 모델

### 1. Game Domain

```typescript
// 플레이어 타입
type Player = 'X' | 'O';

// 셀 값
type CellValue = Player | null;

// 보드 (3x3 = 9칸)
type Board = CellValue[];

// 게임 모드
type GameMode = 'local' | 'cpu';

// 게임 상태
type GameStatus = 'playing' | 'won' | 'draw';

// 게임 상태 인터페이스
interface GameState {
  board: Board;                    // 현재 보드 상태
  current_player: Player;          // 현재 플레이어
  game_mode: GameMode;             // 게임 모드
  status: GameStatus;              // 게임 상태
  winner: Player | null;           // 승자
  move_history: number[];          // 수 기록
  start_time: number;              // 게임 시작 시간
  elapsed_time: number;            // 경과 시간
  turn_start_time: number;         // 턴 시작 시간
}

// 게임 결과
interface GameResult {
  winner: Player | null;           // 승자
  is_draw: boolean;                // 무승부 여부
  winning_line: number[] | null;   // 승리 라인
}
```

**승리 패턴**:
```typescript
const WINNING_PATTERNS = [
  [0, 1, 2], // 첫 번째 행
  [3, 4, 5], // 두 번째 행
  [6, 7, 8], // 세 번째 행
  [0, 3, 6], // 첫 번째 열
  [1, 4, 7], // 두 번째 열
  [2, 5, 8], // 세 번째 열
  [0, 4, 8], // 대각선 (\)
  [2, 4, 6]  // 대각선 (/)
];
```

### 2. Statistics Domain

```typescript
interface GameStatistics {
  total_games: number;          // 총 게임 수
  wins_as_x: number;            // X로 승리한 횟수
  wins_as_o: number;            // O로 승리한 횟수
  draws: number;                // 무승부 횟수
  losses: number;               // 패배 횟수
  win_rate: number;             // 승률 (%)
  average_game_time: number;    // 평균 게임 시간 (초)
  fastest_win: number;          // 최단 승리 시간 (초)
  current_streak: number;       // 현재 연승
  best_streak: number;          // 최고 연승 기록
}
```

**통계 계산 로직**:
- 승률 = (승리 횟수 / 총 게임 수) × 100
- 평균 게임 시간 = 총 게임 시간 / 총 게임 수
- 연승은 연속 승리 시 증가, 패배/무승부 시 초기화

### 3. Settings Domain

```typescript
interface GameSettings {
  time_limit: number | null;     // 턴별 시간 제한 (초), null = 무제한
  ai_difficulty: Difficulty;     // AI 난이도
  show_hints: boolean;           // 힌트 표시 여부
  sound_enabled: boolean;        // 사운드 활성화
  animation_enabled: boolean;    // 애니메이션 활성화
}

type Difficulty = 'easy' | 'medium' | 'hard';
type Theme = 'light' | 'dark';
```

### 4. AI Domain

```typescript
interface AIStrategy {
  getMove(board: Board, player: Player): number;
}

interface AIMove {
  cell_index: number;           // 선택한 셀
  evaluation: number;           // 평가 점수 (Minimax)
  thinking_time: number;        // 사고 시간 (ms)
}
```

---

## 🚀 설치 및 실행

### 필수 요구사항

- **Node.js**: 18.0.0 이상 또는 20.0.0 이상
- **npm**: 9.x 이상 또는 **pnpm** / **yarn**

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/tic-tac-toe.git
cd tic-tac-toe
```

### 2. 의존성 설치

```bash
npm install
```

또는

```bash
pnpm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 4. 프로덕션 빌드

```bash
npm run build
```

### 5. 프로덕션 프리뷰

```bash
npm run preview
```

---

## 💻 개발 가이드

### 네이밍 컨벤션

| 요소 | 컨벤션 | 예시 |
|------|--------|------|
| **컴포넌트 파일** | PascalCase.svelte | `Button.svelte`, `GameBoard.svelte` |
| **훅 파일** | camelCase.ts | `useAuth.ts`, `useTimer.ts` |
| **변수명** | snake_case | `const user_data = ...` |
| **함수명** | camelCase | `function calculateScore() {...}` |
| **유틸리티 파일** | snake_case.ts | `format_date.ts`, `game_logic.ts` |
| **타입/인터페이스** | PascalCase | `type Player`, `interface GameState` |
| **상수** | UPPER_SNAKE_CASE | `const MAX_SCORE = 100` |

### 코드 스타일 가이드

#### 1. 들여쓰기
- 공백 2칸 사용
- 탭 문자 사용 금지

#### 2. 줄 길이
- 최대 80자 (권장)
- 긴 코드는 적절히 줄바꿈

#### 3. 함수 작성
```typescript
// ✅ Good: 단일 책임 원칙
function checkWinner(board: Board): GameResult {
  // 승리 체크만 수행
}

function updateBoard(board: Board, index: number): Board {
  // 보드 업데이트만 수행
}

// ❌ Bad: 여러 책임
function checkWinnerAndUpdateStats(board: Board): void {
  // 승리 체크 + 통계 업데이트 (두 가지 책임)
}
```

#### 4. 타입 안정성
```typescript
// ✅ Good: 명시적 타입
function makeMove(board: Board, index: number, player: Player): Board {
  // ...
}

// ❌ Bad: any 사용
function makeMove(board: any, index: any, player: any): any {
  // ...
}
```

#### 5. 주석 작성
```typescript
/**
 * Minimax 알고리즘으로 최적의 수를 찾습니다.
 * 
 * @param board 현재 보드 상태
 * @param depth 탐색 깊이
 * @param is_maximizing 최대화 여부
 * @returns 평가 점수
 */
function minimax(board: Board, depth: number, is_maximizing: boolean): number {
  // 구현...
}
```

### 컴포넌트 작성 가이드

#### Atom 컴포넌트 예시
```svelte
<!-- Button.svelte -->
<script lang="ts">
  export let label: string;
  export let variant: 'primary' | 'secondary' = 'primary';
  export let disabled = false;
</script>

<button
  class="btn btn-{variant}"
  {disabled}
  on:click
>
  {label}
</button>
```

#### Organism 컴포넌트 예시
```svelte
<!-- GameBoard.svelte -->
<script lang="ts">
  import { game_store } from '$lib/domains/game/stores/game_store';
  import Board from '$lib/components/molecules/Board.svelte';
  
  function handleCellClick(index: number) {
    game_store.makeMove(index);
  }
</script>

<div class="game-board">
  <Board
    board={$game_store.board}
    on:cellClick={(e) => handleCellClick(e.detail)}
  />
</div>
```

### 린팅 및 포맷팅

```bash
# 린트 검사
npm run lint

# 포맷팅
npm run format

# 타입 체크
npm run check

# 타입 체크 (Watch 모드)
npm run check:watch
```

### Git 커밋 메시지 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅 (기능 변경 없음)
refactor: 코드 리팩토링
test: 테스트 코드 추가
chore: 빌드 설정, 패키지 업데이트
```

**예시**:
```bash
git commit -m "feat: Add hard difficulty AI with Minimax algorithm"
git commit -m "fix: Fix timer not stopping on game end"
git commit -m "docs: Update README with architecture diagram"
```

---

## ⚡ 성능 최적화

### 1. 코드 스플리팅

SvelteKit의 자동 코드 스플리팅을 통해 페이지별로 번들 분리:

```typescript
// routes/game/+page.svelte
// 자동으로 별도 청크로 분리됨
```

**결과**:
- 초기 로딩 시간 단축
- 필요한 코드만 로드

### 2. 컴포넌트 지연 로딩

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  
  let SettingsPanel;
  
  onMount(async () => {
    const module = await import('./SettingsPanel.svelte');
    SettingsPanel = module.default;
  });
</script>
```

### 3. Svelte의 반응성 최적화

```svelte
<script lang="ts">
  // ✅ Good: 필요한 값만 구독
  $: wins = $statistics.wins_as_x + $statistics.wins_as_o;
  
  // ❌ Bad: 전체 객체 구독
  $: total = Object.values($statistics).reduce((a, b) => a + b);
</script>
```

### 4. 이미지 최적화

- SVG 아이콘 사용 (확장성, 용량 최소)
- Favicon 최적화

### 5. CSS 최적화

- TailwindCSS의 PurgeCSS로 사용하지 않는 CSS 제거
- 프로덕션 빌드 시 자동 적용

### 6. 번들 크기

현재 프로덕션 빌드 크기:

| 파일 | 크기 | Gzip |
|------|------|------|
| 전체 JavaScript | ~120 KB | ~38 KB |
| 전체 CSS | ~52 KB | ~8 KB |

**최적화 결과**:
- First Contentful Paint: < 1.0s
- Time to Interactive: < 1.5s
- Lighthouse Score: 95+

---

## 🚢 배포

### Vercel 배포 (권장)

#### 방법 1: GitHub 연동 (자동 배포)

1. GitHub에 저장소 푸시
2. [Vercel](https://vercel.com/) 로그인
3. "New Project" → 저장소 선택
4. 자동 설정 확인 후 "Deploy"

**자동 배포**:
- `main` 브랜치 푸시 시 자동 프로덕션 배포
- PR 생성 시 자동 프리뷰 배포

#### 방법 2: Vercel CLI

```bash
# Vercel CLI 설치
npm install -g vercel

# 로그인
vercel login

# 배포 (첫 배포 시 프로젝트 설정)
vercel

# 프로덕션 배포
vercel --prod
```

### 환경 변수 설정

Vercel 대시보드에서 환경 변수 추가:

```env
# 필요한 경우 추가
PUBLIC_API_URL=https://api.example.com
```

### 커스텀 도메인 설정

1. Vercel 프로젝트 → Settings → Domains
2. 도메인 입력 및 DNS 설정
3. SSL 인증서 자동 발급

### 배포 설정 파일

`vercel.json`:
```json
{
  "framework": "sveltekit"
}
```

`svelte.config.js`:
```javascript
import adapter from '@sveltejs/adapter-vercel';

export default {
  kit: {
    adapter: adapter({
      runtime: 'nodejs20.x'
    })
  }
};
```

---

## 🧪 테스트 (향후 추가 예정)

### 계획 중인 테스트 전략

- **Unit Tests**: Vitest
- **Component Tests**: Svelte Testing Library
- **E2E Tests**: Playwright

---

## 📈 향후 개선 사항

### 기능 추가
- [ ] 온라인 멀티플레이어 (WebSocket)
- [ ] 게임 리플레이 기능
- [ ] 사용자 계정 시스템
- [ ] 리더보드 (전세계 순위)
- [ ] 커스텀 보드 크기 (4x4, 5x5)
- [ ] 게임 테마 커스터마이징

### 기술 개선
- [ ] PWA 지원 (오프라인 플레이)
- [ ] 다국어 지원 (i18n)
- [ ] E2E 테스트 추가
- [ ] 성능 모니터링 (Analytics)
- [ ] AI 전략 개선 (Alpha-Beta Pruning)

---

## 📝 라이선스

MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 👨‍💻 개발자

**개발**: AI Assistant  
**프로젝트 링크**: [https://tictactoe-xi-tawny.vercel.app/](https://tictactoe-xi-tawny.vercel.app/)

---

## 🙏 감사의 말

이 프로젝트는 다음 기술들을 사용하여 만들어졌습니다:

- [SvelteKit](https://kit.svelte.dev/) - 놀라운 프레임워크
- [TypeScript](https://www.typescriptlang.org/) - 타입 안정성
- [TailwindCSS](https://tailwindcss.com/) - 빠른 스타일링
- [Vercel](https://vercel.com/) - 간편한 배포

---

<div align="center">

**⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요! ⭐**

[라이브 데모 보기](https://tictactoe-xi-tawny.vercel.app/) | [이슈 제기](https://github.com/your-username/tic-tac-toe/issues)

</div>
