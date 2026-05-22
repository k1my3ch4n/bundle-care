import type { BndlReportData } from "@entities/report/model/types";

// FSD 프로젝트 — shared 레이어 비대화 (shared 비율 40% 초과)
export const mockFsdBloated: BndlReportData = {
  generatedAt: "2026-05-21 14:00:00",
  projectName: "fsd-bloated-app",
  totalBundleSizeKB: 680.0,
  isFsdProject: true,
  chunks: [
    {
      name: "index",
      size: 696320,
      modules: [
        { name: "./src/app/main.tsx", size: 4000 },
        { name: "./src/pages/MainPage/index.tsx", size: 12000 },
        { name: "./src/widgets/Header/index.tsx", size: 8000 },
        { name: "./src/features/Login/index.tsx", size: 10000 },
        { name: "./src/entities/user/model/store.ts", size: 6000 },
        { name: "./src/shared/components/Button.tsx", size: 3000 },
        { name: "./src/shared/components/Input.tsx", size: 4000 },
        { name: "./src/shared/components/Modal.tsx", size: 5000 },
        { name: "./src/shared/components/Table.tsx", size: 38000 },
        { name: "./src/shared/components/Chart.tsx", size: 95000 },
        { name: "./src/shared/utils/api.ts", size: 22000 },
        { name: "./src/shared/utils/auth.ts", size: 18000 },
        { name: "./src/shared/utils/validation.ts", size: 15000 },
        { name: "./src/shared/store/globalStore.ts", size: 28000 },
        { name: "./node_modules/react/index.js", size: 140000 },
        { name: "./node_modules/react-dom/index.js", size: 120000 },
        { name: "./node_modules/zustand/esm/index.js", size: 18000 },
        { name: "./node_modules/recharts/index.js", size: 150320 },
      ],
    },
  ],
  dockerRisks: [],
  treeshakingLeaks: [],
  aiPrescriptions: [],
  fsdLayers: [
    { layer: "app", sizeKB: 8.0, fileCount: 1 },
    { layer: "pages", sizeKB: 32.0, fileCount: 3 },
    { layer: "widgets", sizeKB: 24.0, fileCount: 2 },
    { layer: "features", sizeKB: 28.0, fileCount: 3 },
    { layer: "entities", sizeKB: 18.0, fileCount: 2 },
    { layer: "shared", sizeKB: 590.0, fileCount: 22 },
  ],
};
