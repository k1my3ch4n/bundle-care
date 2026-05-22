import type { BndlReportData } from "@entities/report/model/types";

// AI 처방 없음, FSD 레이어 없음, treeshaking 누수 없음
export const mockPartial: BndlReportData = {
  generatedAt: "2026-05-21 14:00:00",
  projectName: "partial-app",
  totalBundleSizeKB: 312.4,
  isFsdProject: false,
  chunks: [
    {
      name: "index",
      size: 319897,
      modules: [
        { name: "./src/main.tsx", size: 5000 },
        { name: "./src/App.tsx", size: 8000 },
        { name: "./src/components/Header.tsx", size: 4000 },
        { name: "./node_modules/react/index.js", size: 140000 },
        { name: "./node_modules/react-dom/index.js", size: 120000 },
        { name: "./node_modules/axios/index.js", size: 42897 },
      ],
    },
  ],
  dockerRisks: [
    {
      packageName: "typescript",
      reason: "컴파일러가 런타임 이미지에 포함됨",
      sizeKB: 62000,
      location: "devDependencies",
    },
  ],
  treeshakingLeaks: [],
  aiPrescriptions: [],
};
