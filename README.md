# BndlCare (번들케어)

> 프론트엔드 DX & 인프라 최적화 가드레일 — 번들 분석부터 AI 처방까지, 명령어 한 줄로

---

## 왜 BndlCare인가?

현대 프론트엔드 개발 환경에서 흔히 묵인되는 3가지 인프라 리스크를 자동으로 잡아냅니다.

| 리스크 | 문제 | BndlCare의 해결 |
|---|---|---|
| **Docker 이미지 비대화** | `devDependencies` 누수로 프로덕션 이미지에 불필요한 패키지 포함 | `package.json` 정적 분석으로 위험 패키지 사전 탐지 |
| **Tree-shaking 누수** | `lodash`, `moment` 등에서 일부 함수만 쓰면서 수백 KB 낭비 | 임포트 패턴 분석으로 누수 코드 식별 및 대안 제시 |
| **사후약방문식 최적화** | 배포 후에야 문제를 인지하는 악순환 | CI/CD 단계에 끼어들어 임계값 초과 시 빌드 강제 종료 |

---

## 핵심 특징

- **Zero-Config & No-Server** — 설치 없이 `npx bndl-care` 한 줄, 5초 이내 리포트 생성
- **Single-File Report** — 외부 네트워크 의존성 0%, 더블클릭만으로 열리는 독립형 `bndl-report.html`
- **AI 처방전** — Gemini API 기반으로 대안 라이브러리 비교표 + Vanilla JS 리팩토링 스니펫 자동 생성
- **2-Track 아키텍처 분석** — 범용 트리맵 + FSD(Feature-Sliced Design) 패턴 자동 감지 및 레이어 진단

---

## 빠른 시작

```bash
# 1. 빌드 도구로 stats.json 생성 (Webpack 예시)
webpack --profile --json > stats.json

# 2. BndlCare 실행
npx bndl-care

# 3. 브라우저에서 자동으로 bndl-report.html 오픈
```

### 설정 파일 (선택)

프로젝트 루트에 `bndlcare.config.json`을 생성해 임계값을 설정할 수 있습니다.

```json
{
  "maxBundleSizeKB": 500,
  "geminiApiKey": "YOUR_API_KEY",
  "failOnDockerRisk": true
}
```

---

## 동작 방식

```
npx bndl-care 실행
│
├── stats.json + package.json 정적 스캔
│   ├── Docker 리스크 탐지 (devDependencies 누수)
│   ├── Tree-shaking 누수 진단
│   └── Fail-Safe: 임계값 초과 시 process.exit(1)
│
├── Gemini API 연동 (선택)
│   ├── 대안 라이브러리 비교표 생성
│   └── Vanilla JS 리팩토링 스니펫 생성
│
└── bndl-report.html 생성 및 브라우저 자동 오픈
    └── Zustand + D3.js 기반 인터랙티브 대시보드
```

---

## 프로젝트 구조

```
bndl-care/
├── cli/          # Node.js CLI 도구 (분석 엔진 + HTML 빌더)
├── report-ui/    # React 대시보드 UI (Vite + Single-file 빌드)
└── tasks/        # 개발 작업 관리
```

---

## 기술 스택

| 영역 | 기술 |
|---|---|
| CLI | Node.js, TypeScript, Commander.js, Picocolors, Ora |
| AI | Google Gemini API |
| UI | React, TypeScript, Zustand, D3.js, Tailwind CSS |
| 빌드 | Vite, vite-plugin-singlefile |
| 아키텍처 | FSD (Feature-Sliced Design) |
