## 프로젝트 개요

### 🩺 배경 및 개발 목적 (Background)

현대의 웹 프론트엔드 개발 환경은 다양한 오픈소스 라이브러리와 컨테이너 기반 배포(Docker, GCP, AWS 등)를 적극적으로 활용합니다. 하지만 이 과정에서 다음과 같은 잠재적 인프라 및 비용 리스크가 묵인되는 경우가 많습니다.

1. **인프라 비용의 스노우볼:** `package.json`의 의존성 분리 오류로 인해 불필요한 개발용 대형 패키지들이 프로덕션 Docker 이미지에 포함되고, 이는 이미지 용량 비대화로 이어져 클라우드 스토리지 비용 및 네트워크 전송 비용(Egress)을 불필요하게 낭비시킵니다.
2. **트리쉐이킹(Tree-shaking) 누수:** 거대한 유틸리티 라이브러리(`lodash`, `moment` 등)에서 단 몇 개의 함수만 사용함에도 번들러의 최적화 한계로 인해 수십~수백 KB의 거대한 청크(Chunk)가 그대로 빌드 결과물에 포함되어 클라이언트 초기 로딩 속도를 저하시킵니다.
3. **사후약방문식 최적화:** 대다수의 번들 분석 도구는 웹 호스팅이 필요하거나, 개발자가 기억해 내어 수동으로 툴을 켜야만 확인이 가능합니다. 이로 인해 이미 성능 저하나 비용 낭비가 발생한 후에야 문제를 인지하는 악순환이 반복됩니다.

**BndlCare(번들케어)**는 이러한 문제를 해결하기 위해, 개발자의 빌드 및 CI/CD 단계에 직접 개입하여 리스크를 선제 차단하고, AI 진단 처방전이 결합된 독립형 리포트를 제공하는 **'프론트엔드 DX & 인프라 최적화 가드레일'**입니다.

### ✨ 핵심 차별점 (Core Architecture)

- **Zero-Config & No-Server:** 복잡한 인프라나 서버 구축, 데이터베이스 연동이 일절 필요 없습니다. 유저 프로젝트 터미널에서 명령어 한 줄(`npx bndl-care`)만 실행하면 5초 이내에 로컬에 독립형 파일이 생성됩니다.
- **Single-File Inlining 아키텍처:** 개발할 때는 확장성 높은 컴포넌트 아키텍처(FSD)와 상태 관리(Zustand)를 누리며 풍부하게 작성하되, 최종 배포본은 외부 네트워크 의존성이 0%인 **단 하나의 독립된 `bndl-report.html` 파일**로 압축 마이그레이션하여 제공합니다. 더블클릭만으로 언제 어디서든 완벽한 인터랙티브 대시보드가 구동됩니다.
- **2-Track 아키텍처 인지 분석:** 일반적인 프로젝트 구조는 물론, 최근 트렌드인 FSD(Feature-Sliced Design) 아키텍처 패턴을 자동으로 감지하여 레이어별 균형도 및 아키텍처 위반 리스크를 정밀 진단합니다.

## 프로젝트 목표

### 🛠️ 개발자 경험(DX) 및 자동화 목표

- **Single-File Inlining 배포 아키텍처:**
  - 개발 단계에서는 **FSD 아키텍처, Zustand, Tailwind CSS, D3.js**를 활용해 확장성 있는 React 앱으로 쪼개어 개발합니다.
  - 배포 시에는 빌드 도구(Vite)를 활용해 모든 자바스크립트와 스타일이 내장된 **단 하나의 독립형 HTML 템플릿 파일**로 패키징하는 파이프라인을 구축합니다.
- **터미널 가드레일 (Fail-Safe):** CI/CD 환경이나 로컬 빌드 스크립트 단계에서 설정 파일(`bndlcare.config.json`)에 정의된 최대 허용 번들 용량이나 Docker 위험 패키지 감지 시, 프로세스를 강제 종료(`process.exit(1)`)하여 문제 있는 코드가 배포되는 것을 원천 차단합니다.

### 📊 분석 및 지능형 처방 목표 (Analysis & AI Prescription)

#### 1. 2-Track 범용 구조 분석 및 시각화

- **범용 폴더 트리맵 (기본 모드):** 프로젝트 아키텍처와 관계없이 모든 웹 프로젝트의 소스코드 구조를 정밀 파싱하여, 파일 및 폴더별 번들 용량 점유율을 인터랙티브 트리맵(Treemap)으로 시각화합니다.
- **FSD 아키텍처 진단 (확장 모드):** 프로젝트 내 FSD(Feature-Sliced Design) 패턴 감지 시 별도의 '아키텍처 뷰'를 활성화합니다. 레이어별(Features, Entities, Shared 등) 용량 균형도를 측정하고, 특정 레이어(예: Shared)의 비상상적인 비대화를 경고합니다.

#### 2. 3대 인프라 및 빌드 리스크 탐지

- **Docker 컨테이너 리스크 스캔:** `package.json`을 분석하여 프로덕션 배포 이미지에 포함되지 않아야 할 개발용 무거운 패키지(`devDependencies` 누수)나 불필요한 대형 의존성을 찾아내어 인프라 비용 절감 포인트를 짚어냅니다.
- **트리쉐이킹(Tree-shaking) 누수 진단:** 대형 유틸리티 라이브러리에서 극히 일부의 함수만 가져다 쓰면서 번들 사이즈를 수십 KB씩 낭비하고 있는 코드를 정적 분석으로 식별합니다.

#### 3. AI 기반 청크(Chunk) 치료 및 리팩토링 처방 (Gemini API)

- **대안 라이브러리 스펙 매칭:** 감지된 비대 패키지(예: `moment`, `lodash`)를 대체할 수 있는 가볍고 현대적인 오픈소스(예: `dayjs`, `radash`)와의 용량 및 기능 비교표를 리포트 내에 자동으로 생성합니다.
- **Vanilla JS 대체 코드 스니펫(Snippet) 생성:** 외부 라이브러리 의존성 없이 자바스크립트 최신 표준(배포 환경 스펙 기준)만으로 직접 구현할 수 있는 리팩토링 소스코드를 AI가 직접 작성하여 주입합니다. 개발자는 리포트 화면에서 코드를 즉시 복사하여 적용할 수 있습니다.

## 시스템 핵심 매커니즘

```
[유저 터미널: npx bndl-care 실행]
│
├──> 1. stats.json & package.json 정적 스캔
├──> 2. Gemini API 연동을 통한 최적화 제안 생성
└──> 3. 내장된 React 빌드본(Single HTML 템플릿) 로드
│
▼
[문자열 치환 및 파일 생성]
template.html의 구멍(/_ **DATA_SLOT** _/)을 분석 결과 JSON 데이터로 교체
│
▼
[결과물: bndl-report.html 생성 및 브라우저 자동 오픈]
더블클릭만으로 언제 어디서든 열리는 Zustand + D3.js 기반의 완벽한 독자적 대시보드 구동
```

## 디렉토리 구조 및 아키텍쳐 환경

```
📁 bndl-care (Repository Root)
├── 📁 cli                       # 1. 터미널에서 실행될 Node.js 기반 CLI 소스코드
│   ├── 📁 src
│   │   ├── 📁 utils
│   │   │   └── 📄 logger.ts     # 터미널 스타일링 출력 (picocolors, ora 활용)
│   │   ├── 📄 index.ts          # CLI 엔트리포인트 (Commander.js 명령어 및 옵션 정의)
│   │   ├── 📄 config.ts         # bndlcare.config.json 파일을 찾아 로드 및 파싱
│   │   ├── 📄 analyzer.ts       # 로컬 stats.json 및 package.json 정적 분석 (Docker 리스크/누수 스캔)
│   │   ├── 📄 aiServiceClient.ts# Gemini API 호출 및 프롬프트 제어 (최적화 처방 JSON 수집)
│   │   └── 📄 htmlBuilder.ts    # React 빌드본 HTML을 읽어 분석 데이터를 주입 후 로컬 파일 생성
│   ├── 📁 assets
│   │   └── 📄 template.html     # [생성 파일] report-ui가 빌드해준 단일 HTML 파일이 복사되어 위치함
│   ├── 📄 tsconfig.json         # Node.js 컴파일 설정
│   └── 📄 package.json          # bin 스크립트 지정 및 cli 의존성 (commander, google-genai 등)
│
├── 📁 report-ui                 # 2. 브라우저에서 열릴 독립 대시보드 화면 (Vite + React + TS)
│   ├── 📁 src
│   │   ├── 📁 app               # 글로벌 설정 및 스타일
│   │   │   ├── 📄 index.css     # Tailwind CSS 메인 스타일시트
│   │   │   └── 📄 main.tsx      # React 루트 렌더링 및 window.__BNDL_DATA__ 주입 확인
│   │   │
│   │   ├── 📁 pages             # 레이아웃 및 메인 대시보드 페이지
│   │   │   └── 📁 DashboardPage
│   │   │       └── 📄 index.tsx # 기본 트리맵과 AI 처방전을 배치하는 메인 페이지
│   │   │
│   │   ├── 📁 widgets           # 복잡한 비즈니스 로직 단위의 거대 컴포넌트
│   │   │   ├── 📁 BundleTreemap # 데이터 가공 및 D3 차트 렌더링이 결합된 트리맵 위젯
│   │   │   └── 📁 AiPrescription# AI가 제안한 리팩토링 스니펫 및 대안 라이브러리 렌더링 위젯
│   │   │
│   │   ├── 📁 features          # 유저 인터랙션 중심의 기능 단위
│   │   │   ├── 📁 ViewToggle    # 일반 모드 <-> FSD 아키텍처 분석 뷰 전환 스위치
│   │   │   └── 📁 CodeCopier    # AI가 추천한 Vanilla JS 코드를 한 줄로 클립보드 복사하는 버튼
│   │   │
│   │   ├── 📁 entities          # 도메인 모델 및 상태 관리 (Zustand 스토어 배치)
│   │   │   └── 📁 report
│   │   │       └── 📁 model
│   │   │           ├── 📄 store.ts # 주입받은 데이터를 보관하고 필터링 상태를 관리하는 Zustand 스토어
│   │   │           └── 📄 types.ts # 분석 데이터 구조(BndlReportData) 인터페이스 정의
│   │   │
│   │   └── 📁 shared            # 아키텍처에 종속되지 않는 범용 재사용 요소
│   │       ├── 📁 components    # Button, Card, Badge, Modal 등 공통 UI 컴포넌트
│   │       └── 📁 utils         # 대용량 경로 문자열을 트리 구조로 파싱하는 공통 순회 알고리즘
│   │
│   ├── 📄 index.html            # 데이터 슬롯 가상의 구멍이 뚫려있는 HTML 뼈대
│   ├── 📄 vite.config.ts        # vite-plugin-singlefile을 심어 단일 파일 묶음을 강제하는 설정
│   ├── 📄 tailwind.config.js    # Tailwind CSS 스타일 유틸리티 설정
│   └── 📄 package.json          # react, zustand, d3-hierarchy 등 프론트엔드 의존성
│
├── 📄 .gitignore
├── 📄 README.md                 # 프로젝트 개요 및 기획 명세서
└── 📄 package.json              # 전체 빌드 파이프라인 자동화 스크립트 관리 (workspace 간 조율)
```

- 상태관리 도구로 zustand 사용
- FSD 구조 세팅

## 작업 규칙

### 토큰 절약 규칙

1. 이미 읽은 파일은 읽지 않는다.
2. 하나의 파일에 모든 것을 다 넣지 말고 모듈화한다.
3. 사용자가 이미 설명한 내용을 반복하지 않는다.
4. 많은 부분을 수정해야 한다면, 다시 물어보고 진행한다.
5. 요청이 명확하지 않을 때 추론 및 실행하지 말고 우선 설명을 제대로 이해했는지 말한다.

### 코딩 계획 규칙

1. 진행하는 phase의 계획을 todo.md 에서 확인하고 todo list 순서대로 진행한다.
2. todo.md 의 작업 내용이 명확하지 않은 경우, 설명을 제대로 이해했는지 말한다.
3. 작업이 변경된 경우, todo.md 도 함께 수정한다.

## 코딩 표준

### 변수명

- 콜백 파라미터는 축약하지 않고 의미있는 이름을 사용한다
  - `(r) => r.data` ❌ → `(response) => response.data` ✅
  - `arr.map((i) => i.name)` ❌ → `arr.map((item) => item.name)` ✅
  - `arr.filter((m) => m.active)` ❌ → `arr.filter((membership) => membership.active)` ✅
- 단, 관용적으로 허용되는 단일 문자 (`e` for event, `_` for ignored) 는 예외

### 제어 흐름

- if 문은 항상 중괄호를 사용한다 (한 줄이어도 예외 없음)
  - `if (a) return b` ❌
  - `if (a) { return b }` ✅
- 삼항 연산자는 허용하지만, 중첩은 금지

### 시멘틱 태그 설정

- <div> , <p> 등을 그냥 사용하는게 아닌, 시멘틱 태그를 적극적으로 사용한다.
- 예시

```
<article>, <aside> <details> <header> <footer> <main> <nav> <section> 등
```

## 스킬 목록

- pull-request
- refactoring
- staging
