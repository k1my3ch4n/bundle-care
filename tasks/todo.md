# BndlCare (번들케어) — Todo

## Phase 0. 프로젝트 초기 세팅

- [ ] 루트 `package.json` 작성 (npm workspaces: `cli`, `report-ui`)
- [ ] `.gitignore` 작성
- [ ] `README.md` 기본 내용 작성 (프로젝트 개요, 실행 방법)
- [ ] `tasks/lessons.md` 파일 생성

---

## Phase 1. CLI — 기반 구조 세팅

> `cli/` 디렉토리: Node.js + TypeScript 기반 CLI 도구

- [x] `cli/package.json` 작성
- [x] `cli/tsconfig.json` 작성 (NodeNext ESM 모듈)
- [x] `cli/src/index.ts` — CLI 엔트리포인트 (commander, --config / --no-ai / --no-open)
- [x] `cli/src/config.ts` — `bndlcare.config.json` 로드 및 파싱
- [x] `cli/src/utils/logger.ts` — 터미널 스타일링 출력 (picocolors + ora)

---

## Phase 2. CLI — 정적 분석 엔진

- [ ] `cli/src/analyzer.ts` — 핵심 분석 로직
  - `stats.json` 파싱 및 청크(Chunk) 트리 구조 변환
  - `package.json` 분석: `dependencies` vs `devDependencies` 분리
  - **Docker 리스크 스캔:** `devDependencies` 누수 패키지 탐지
  - **Tree-shaking 누수 진단:** 대형 유틸리티 라이브러리 과다 임포트 탐지
    - 대상: `lodash`, `moment`, `rxjs`, `antd`, `@mui/material` 등
  - Fail-Safe 로직: 설정 임계값 초과 시 `process.exit(1)` 처리
- [ ] 분석 결과 타입 정의 (`BndlReportData` 인터페이스)

---

## Phase 3. CLI — AI 처방 연동

- [ ] `cli/src/aiServiceClient.ts` — Gemini API 호출
  - 탐지된 비대 패키지 목록을 기반으로 프롬프트 생성
  - 응답 파싱: 대안 라이브러리 비교표 + Vanilla JS 스니펫 JSON 추출
  - API 키 없을 시 AI 처방 없이 리포트 생성하는 fallback 처리

---

## Phase 4. Report UI — 기반 구조 세팅

> `report-ui/` 디렉토리: Vite + React + TypeScript + FSD 아키텍처

- [x] `report-ui/package.json` 작성
  - 의존성: `react`, `react-dom`, `zustand`, `d3-hierarchy`
  - devDependencies: `vite`, `vite-plugin-singlefile`, `tailwindcss`, `typescript`, `@types/react`
- [x] `report-ui/vite.config.ts` — `vite-plugin-singlefile` 적용 (단일 HTML 번들)
- [x] `report-ui/tailwind.config.js` 작성
- [x] `report-ui/index.html` — 데이터 슬롯(`/* __BNDL_DATA__ */`) 포함한 HTML 뼈대
- [x] `report-ui/src/app/index.css` — Tailwind CSS 메인 스타일
- [x] `report-ui/src/app/main.tsx` — React 루트 렌더링, `window.__BNDL_DATA__` 주입 확인

---

## Phase 5. Report UI — 도메인 모델 및 상태 관리

- [x] `report-ui/src/entities/report/model/types.ts`
  - `BndlReportData`, `ChunkInfo`, `DockerRisk`, `TreeshakingLeak`, `AiPrescription` 타입 정의
- [x] `report-ui/src/entities/report/model/store.ts`
  - Zustand 스토어: 주입 데이터 보관, 필터링 상태 관리
  - 뷰 모드 상태: `'default' | 'fsd'`

---

## Phase 6. Report UI — 공유 컴포넌트 및 유틸리티

- [x] `report-ui/src/shared/components/` — 공통 UI 컴포넌트
  - `Button`, `Card`, `Badge`, `Modal`
- [x] `report-ui/src/shared/utils/` — 공통 유틸리티
  - 경로 문자열 → 트리 구조 변환 알고리즘

---

## Phase 7. Report UI — 위젯 및 기능 구현

- [x] `report-ui/src/widgets/BundleTreemap/` — 번들 트리맵 위젯
  - `d3-hierarchy` 기반 인터랙티브 트리맵 렌더링
  - 청크 선택 시 상세 정보 표시
- [x] `report-ui/src/widgets/AiPrescription/` — AI 처방전 위젯
  - 대안 라이브러리 비교표 렌더링
  - Vanilla JS 스니펫 표시
- [x] `report-ui/src/features/ViewToggle/` — 뷰 전환 스위치
  - 기본 모드 ↔ FSD 아키텍처 분석 뷰 전환
- [x] `report-ui/src/features/CodeCopier/` — 코드 복사 버튼
  - AI 추천 코드를 클립보드에 복사
- [x] `report-ui/src/pages/DashboardPage/index.tsx` — 메인 대시보드 레이아웃 조립

---

## Phase 8. Report UI — FSD 아키텍처 진단 뷰 (확장 모드)

- [x] FSD 패턴 자동 감지 로직 (`features/`, `entities/`, `shared/` 디렉토리 존재 여부)
- [x] 레이어별(`features`, `entities`, `widgets`, `pages`, `shared`) 용량 집계 및 균형도 시각화
- [x] `shared` 레이어 비대화 경고 로직

---

## Phase 9. CLI — HTML 빌더 및 파이프라인 완성

- [ ] `cli/src/htmlBuilder.ts` — 리포트 HTML 생성
  - `cli/assets/template.html` 읽기
  - `/* __BNDL_DATA__ */` 슬롯에 분석 JSON 데이터 주입
  - `bndl-report.html` 로컬 파일 생성
  - `--open` 옵션 시 브라우저 자동 오픈
- [ ] `cli/assets/template.html` — `report-ui` 빌드 결과물 복사 자동화 스크립트

---

## Phase 9-1. Report UI — 코드 품질 (ESLint 설정)

- [ ] `report-ui/` ESLint 설정 추가
  - `eslint`, `@typescript-eslint/eslint-plugin`, `eslint-plugin-react-hooks` 설치
  - `report-ui/.eslintrc.cjs` (또는 `eslint.config.js`) 작성
  - `package.json` `lint` 스크립트 추가: `"lint": "eslint src --ext ts,tsx"`

---

## Phase 10. 통합 빌드 파이프라인

- [ ] 루트 `package.json` 빌드 스크립트 작성
  - `build:ui` → `report-ui` Vite 빌드 → `cli/assets/template.html` 복사
  - `build:cli` → `cli` TypeScript 컴파일
  - `build` → `build:ui` + `build:cli` 순차 실행
- [ ] `npx bndl-care` 엔드-투-엔드 동작 검증
  - 샘플 `stats.json` + `package.json` 으로 전체 파이프라인 테스트
- [ ] `bndlcare.config.json` 샘플 파일 작성 및 문서화

---

## 완료 기준

- `npx bndl-care` 한 줄 실행으로 5초 이내 `bndl-report.html` 생성
- 외부 네트워크 의존성 없이 브라우저에서 단독 구동
- Docker 리스크 패키지 탐지 + Tree-shaking 누수 탐지 정상 동작
- AI 처방 (Gemini) 연동 및 fallback 처리 정상 동작
- Fail-Safe: 임계값 초과 시 `process.exit(1)` 동작 확인
