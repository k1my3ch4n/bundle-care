import { create } from "zustand";
import type { BndlReportData } from "./types";

export type ViewMode = "default" | "fsd";

interface ReportState {
  reportData: BndlReportData | null;
  viewMode: ViewMode;
  selectedChunkName: string | null;
  setReportData: (data: BndlReportData) => void;
  setViewMode: (mode: ViewMode) => void;
  setSelectedChunkName: (name: string | null) => void;
}

export const useReportStore = create<ReportState>((set) => ({
  reportData: null,
  viewMode: "default",
  selectedChunkName: null,
  setReportData: (data) => set({ reportData: data }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setSelectedChunkName: (name) => set({ selectedChunkName: name }),
}));
