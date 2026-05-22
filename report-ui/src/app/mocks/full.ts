import type { BndlReportData } from "@entities/report/model/types";

export const mockFull: BndlReportData = {
  generatedAt: "2026-05-21 14:00:00",
  projectName: "my-app",
  totalBundleSizeKB: 843.2,
  isFsdProject: true,
  chunks: [
    {
      name: "index",
      size: 512000,
      modules: [
        { name: "./src/app/main.tsx", size: 12000 },
        { name: "./src/pages/DashboardPage/index.tsx", size: 8000 },
        { name: "./src/widgets/BundleTreemap/index.tsx", size: 24000 },
        { name: "./src/shared/components/Button.tsx", size: 3000 },
        { name: "./src/shared/utils/buildTree.ts", size: 2000 },
        { name: "./node_modules/lodash/lodash.js", size: 280000 },
        { name: "./node_modules/moment/moment.js", size: 183000 },
      ],
    },
    {
      name: "vendor",
      size: 331200,
      modules: [
        { name: "./node_modules/react/index.js", size: 140000 },
        { name: "./node_modules/react-dom/index.js", size: 120000 },
        { name: "./node_modules/zustand/esm/index.js", size: 18000 },
        { name: "./node_modules/d3-hierarchy/src/index.js", size: 53200 },
      ],
    },
  ],
  dockerRisks: [
    {
      packageName: "webpack",
      reason: "빌드 전용 도구가 프로덕션 이미지에 포함됨",
      sizeKB: 2400,
      location: "devDependencies",
    },
    {
      packageName: "jest",
      reason: "테스트 프레임워크가 프로덕션 이미지에 포함됨",
      sizeKB: 1800,
      location: "devDependencies",
    },
  ],
  treeshakingLeaks: [
    {
      packageName: "lodash",
      importedSymbols: ["debounce", "throttle"],
      totalPackageSizeKB: 280,
      usageRatio: 0.007,
    },
    {
      packageName: "moment",
      importedSymbols: ["format"],
      totalPackageSizeKB: 183,
      usageRatio: 0.005,
    },
  ],
  aiPrescriptions: [
    {
      targetPackage: "lodash",
      reasoning:
        "lodash 전체를 번들에 포함하고 있지만 debounce, throttle 2개 함수만 사용합니다. 바닐라 JS 또는 경량 대안으로 교체 시 약 277 KB를 절감할 수 있습니다.",
      alternatives: [
        { name: "radash", sizeKB: 12, description: "TypeScript 기반의 현대적인 유틸리티 라이브러리" },
        { name: "just-debounce", sizeKB: 1, description: "debounce 단일 기능 마이크로 패키지" },
      ],
      vanillaSnippet:
        "function debounce(fn, delay) {\n  let timer;\n  return function (...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}",
    },
    {
      targetPackage: "moment",
      reasoning:
        "moment.js는 트리쉐이킹이 불가능한 구조로 format 함수 하나에 183 KB 전체가 포함됩니다. dayjs로 교체 시 97% 절감 가능합니다.",
      alternatives: [
        { name: "dayjs", sizeKB: 7, description: "moment 호환 API를 제공하는 2KB 경량 라이브러리" },
        { name: "date-fns", sizeKB: 23, description: "트리쉐이킹 지원 함수형 날짜 유틸리티" },
      ],
      vanillaSnippet:
        "function formatDate(date, locale = 'ko-KR') {\n  return new Intl.DateTimeFormat(locale, {\n    year: 'numeric', month: '2-digit', day: '2-digit'\n  }).format(new Date(date));\n}",
    },
  ],
  fsdLayers: [
    { layer: "app", sizeKB: 15.2, fileCount: 2 },
    { layer: "pages", sizeKB: 28.4, fileCount: 4 },
    { layer: "widgets", sizeKB: 64.1, fileCount: 6 },
    { layer: "features", sizeKB: 31.5, fileCount: 5 },
    { layer: "entities", sizeKB: 22.8, fileCount: 4 },
    { layer: "shared", sizeKB: 380.0, fileCount: 18 },
  ],
};
