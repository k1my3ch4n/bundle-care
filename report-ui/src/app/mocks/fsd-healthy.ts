import type { BndlReportData } from "@entities/report/model/types";

// FSD 프로젝트 — 레이어 균형 정상 (shared 비율 20% 이하)
export const mockFsdHealthy: BndlReportData = {
  generatedAt: "2026-05-21 14:00:00",
  projectName: "fsd-healthy-app",
  totalBundleSizeKB: 420.0,
  isFsdProject: true,
  chunks: [
    {
      name: "index",
      size: 430080,
      modules: [
        { name: "./src/app/main.tsx", size: 5000 },
        { name: "./src/pages/MainPage/index.tsx", size: 18000 },
        { name: "./src/pages/SettingsPage/index.tsx", size: 15000 },
        { name: "./src/widgets/Header/index.tsx", size: 12000 },
        { name: "./src/features/Auth/index.tsx", size: 22000 },
        { name: "./src/features/Search/index.tsx", size: 19000 },
        { name: "./src/entities/user/model/store.ts", size: 8000 },
        { name: "./src/entities/product/model/store.ts", size: 9000 },
        { name: "./src/shared/components/Button.tsx", size: 3000 },
        { name: "./src/shared/utils/format.ts", size: 2000 },
        { name: "./node_modules/react/index.js", size: 140000 },
        { name: "./node_modules/react-dom/index.js", size: 120000 },
        { name: "./node_modules/zustand/esm/index.js", size: 18000 },
        { name: "./node_modules/react-router-dom/index.js", size: 39080 },
      ],
    },
  ],
  dockerRisks: [],
  treeshakingLeaks: [],
  aiPrescriptions: [],
  fsdLayers: [
    { layer: "app", sizeKB: 18.0, fileCount: 2 },
    { layer: "pages", sizeKB: 95.0, fileCount: 8 },
    { layer: "widgets", sizeKB: 82.0, fileCount: 7 },
    { layer: "features", sizeKB: 110.0, fileCount: 10 },
    { layer: "entities", sizeKB: 52.0, fileCount: 6 },
    { layer: "shared", sizeKB: 63.0, fileCount: 8 },
  ],
};
