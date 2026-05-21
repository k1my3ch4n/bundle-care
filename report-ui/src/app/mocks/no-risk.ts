import type { BndlReportData } from "@entities/report/model/types";

// Docker 리스크 없음, Tree-shaking 누수 없음, AI 처방 없음
export const mockNoRisk: BndlReportData = {
  generatedAt: "2026-05-21 14:00:00",
  projectName: "clean-app",
  totalBundleSizeKB: 185.0,
  isFsdProject: false,
  chunks: [
    {
      name: "index",
      size: 120000,
      modules: [
        { name: "./src/main.tsx", size: 4000 },
        { name: "./src/App.tsx", size: 6000 },
        { name: "./src/pages/Home.tsx", size: 5000 },
        { name: "./node_modules/react/index.js", size: 105000 },
      ],
    },
    {
      name: "vendor",
      size: 69440,
      modules: [
        { name: "./node_modules/react-dom/index.js", size: 60000 },
        { name: "./node_modules/zustand/esm/index.js", size: 9440 },
      ],
    },
  ],
  dockerRisks: [],
  treeshakingLeaks: [],
  aiPrescriptions: [],
};
