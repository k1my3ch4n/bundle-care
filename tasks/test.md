# BndlCare Report UI — 테스트 가이드

## 실행 방법

```bash
cd report-ui
npm run dev
```

브라우저에서 아래 URL의 `?mock=<이름>` 파라미터로 시나리오를 전환합니다.

---

## 시나리오 목록

| # | 시나리오 | URL | mock 파일 |
|---|----------|-----|-----------|
| 1 | 모든 정보가 있는 경우 | `http://localhost:5173/?mock=full` | `mocks/full.ts` |
| 2 | 모든 정보가 없는 경우 | `http://localhost:5173/?mock=empty` | `mocks/empty.ts` |
| 3 | 일부 정보가 없는 경우 | `http://localhost:5173/?mock=partial` | `mocks/partial.ts` |
| 4a | 리스크가 있는 경우 | `http://localhost:5173/?mock=full` | `mocks/full.ts` |
| 4b | 리스크가 없는 경우 | `http://localhost:5173/?mock=no-risk` | `mocks/no-risk.ts` |
| 5 | FSD 아키텍처 정상 | `http://localhost:5173/?mock=fsd-healthy` | `mocks/fsd-healthy.ts` |
| 6 | FSD 아키텍처 비정상 | `http://localhost:5173/?mock=fsd-bloated` | `mocks/fsd-bloated.ts` |

---

## 시나리오별 체크리스트

### 1. 모든 정보가 있는 경우 (`?mock=full`)

> 모든 섹션이 데이터와 함께 정상 렌더링되는지 확인

- [ ] 헤더에 프로젝트명 `my-app`, 생성 시각 표시
- [ ] 요약 카드: 총 번들 `843.2 KB`, Docker 위험 `2개`, Tree-shaking 누수 `2개`
- [ ] 번들 트리맵 SVG 렌더링 (index / vendor 청크 필터 동작)
- [ ] Docker 리스크 목록: `webpack`, `jest` 2건 표시
- [ ] Tree-shaking 누수 목록: `lodash (0.7%)`, `moment (0.5%)` 표시
- [ ] AI 처방전: `lodash`, `moment` 카드 각각 렌더링
- [ ] 대안 라이브러리 테이블 표시 (radash, dayjs 등)
- [ ] Vanilla JS 코드 블록 표시
- [ ] `복사` 버튼 클릭 시 `복사됨 ✓`로 2초간 변경
- [ ] FSD 토글 버튼 노출 → 클릭 시 FSD 뷰로 전환
- [ ] FSD 뷰: shared `380 KB (44%)` 비대화 경고 배너 표시

---

### 2. 모든 정보가 없는 경우 (`?mock=empty`)

> 데이터가 null일 때 앱이 오류 없이 graceful하게 처리되는지 확인

- [ ] 화면에 "데이터를 불러오는 중..." 메시지 표시
- [ ] 콘솔에 JS 에러 없음
- [ ] 흰 화면(White Screen of Death) 없음

---

### 3. 일부 정보가 없는 경우 (`?mock=partial`)

> AI 처방 없음 / FSD 없음 / Tree-shaking 누수 없음 상태

- [ ] 헤더: FSD 토글 버튼 **미노출** (`isFsdProject: false`)
- [ ] 요약 카드: Tree-shaking 누수 `0개` 표시
- [ ] Docker 리스크: `typescript` 1건만 표시
- [ ] Tree-shaking 누수 섹션 **미노출** (항목 없음)
- [ ] AI 처방전 섹션: "AI 처방 데이터가 없습니다." 안내 메시지 표시

---

### 4a. 리스크가 있는 경우 (`?mock=full`)

> 시나리오 1과 동일. Docker/Tree-shaking 경고 UI 확인

- [ ] Docker 리스크 카드가 빨간 강조색으로 표시
- [ ] Tree-shaking 누수 항목의 사용률이 노란색으로 표시

---

### 4b. 리스크가 없는 경우 (`?mock=no-risk`)

> 리스크 섹션이 깨끗하게 숨겨지는지 확인

- [ ] Docker 리스크 섹션 **미노출**
- [ ] Tree-shaking 누수 섹션 **미노출**
- [ ] AI 처방전 섹션 "AI 처방 데이터가 없습니다." 표시
- [ ] 요약 카드: Docker 위험 `0개`, 누수 `0개`

---

### 5. FSD 아키텍처 정상 (`?mock=fsd-healthy`)

> shared 비율 약 15% — 경고 없는 균형 잡힌 레이어 구조

- [ ] FSD 토글 버튼 노출
- [ ] FSD 뷰 전환 시 6개 레이어 바 차트 표시
- [ ] `shared` 바가 가장 짧지 않아도 전체의 40% 미만
- [ ] **비대화 경고 배너 미노출**
- [ ] 총 파일 수 / 총 크기 합계 footer 표시

---

### 6. FSD 아키텍처 비정상 (`?mock=fsd-bloated`)

> shared `590 KB (86%)` — 비대화 경고 발동 조건

- [ ] FSD 토글 버튼 노출
- [ ] FSD 뷰 전환 시 `shared` 바가 압도적으로 긴 상태로 렌더링
- [ ] **노란 경고 배너**: "shared 레이어가 전체의 86.8%를 차지합니다. 비대화 징후입니다." 표시
- [ ] shared 항목 옆 `비대화` 배지 표시
