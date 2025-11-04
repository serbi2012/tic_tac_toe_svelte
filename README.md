# 틱택토 게임

SvelteKit과 TypeScript로 구현한 모던한 틱택토 게임입니다.

## ✨ 주요 기능

- 🎮 **로컬 1:1 대전**: 같은 컴퓨터에서 친구와 대결
- 🤖 **CPU 대전**: 3가지 난이도(쉬움, 보통, 어려움)의 AI와 대결
- ⏱️ **시간 제한**: 턴별 시간 제한 옵션
- 🎵 **사운드 효과**: Web Audio API 기반 사운드
- 📊 **통계**: 승률, 연승 기록 등 상세 통계
- 🌓 **다크/라이트 모드**: 테마 전환 가능
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 대응

## 🏗️ 기술 스택

### 핵심
- **SvelteKit 2.x** - 풀스택 프레임워크
- **TypeScript 5.x** - 타입 안정성
- **Vite 5.x** - 빌드 툴

### 스타일링
- **TailwindCSS 3.x** - 유틸리티 기반 CSS
- **PostCSS** - CSS 전처리

### 상태 관리
- **Svelte Stores** - 내장 상태 관리

### 배포
- **Vercel** - 자동 배포 및 호스팅

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.x 이상
- npm 또는 pnpm

### 설치

\`\`\`bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프리뷰
npm run preview
\`\`\`

## 📁 프로젝트 구조

\`\`\`
src/
├── lib/
│   ├── components/          # UI 컴포넌트 (Atomic Design)
│   │   ├── atoms/          # 기본 단위
│   │   ├── molecules/      # 조합 단위
│   │   └── organisms/      # 복잡한 UI
│   │
│   ├── domains/            # 도메인 로직
│   │   ├── game/          # 게임 핵심 로직
│   │   ├── ai/            # AI 전략
│   │   ├── settings/      # 설정 관리
│   │   ├── statistics/    # 통계 관리
│   │   └── sound/         # 사운드 서비스
│   │
│   └── styles/            # 전역 스타일
│
└── routes/                # SvelteKit 라우팅
    ├── +layout.svelte
    ├── +page.svelte       # 메인 페이지
    └── game/              # 게임 페이지
\`\`\`

## 🎯 아키텍처

### 계층형 아키텍처
- **Presentation Layer**: Svelte 컴포넌트
- **Application Layer**: Svelte Stores
- **Domain Layer**: 비즈니스 로직 & 서비스
- **Infrastructure Layer**: 유틸리티 & 외부 연동

### AI 전략 패턴
- **Easy**: 랜덤 선택
- **Medium**: 승리/방어 우선 + 전략적 선택
- **Hard**: Minimax 알고리즘 (완벽한 플레이)

## 🎮 게임 규칙

1. 플레이어 X가 먼저 시작합니다
2. 3x3 보드에서 번갈아가며 수를 둡니다
3. 가로, 세로, 대각선으로 3개를 연속으로 놓으면 승리
4. 보드가 가득 차면 무승부

## 📝 개발 규칙

### 네이밍 컨벤션
- 컴포넌트 파일: `PascalCase.svelte`
- 변수명: `snake_case`
- 함수명: `camelCase`
- 유틸리티 파일: `snake_case.ts`

### 코드 품질
- ESLint로 코드 린팅
- Prettier로 코드 포맷팅
- TypeScript로 타입 체크

## 🚢 배포

Vercel에 자동 배포됩니다:

\`\`\`bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
\`\`\`

## 📄 라이선스

MIT License

## 👨‍💻 개발자

개발: AI Assistant
