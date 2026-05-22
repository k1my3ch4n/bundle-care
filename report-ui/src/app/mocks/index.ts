import { mockFull } from "./full";
import { mockEmpty } from "./empty";
import { mockPartial } from "./partial";
import { mockNoRisk } from "./no-risk";
import { mockFsdHealthy } from "./fsd-healthy";
import { mockFsdBloated } from "./fsd-bloated";
import type { BndlReportData } from "@entities/report/model/types";

export const MOCKS: Record<string, BndlReportData | null> = {
  full: mockFull,
  empty: mockEmpty,
  partial: mockPartial,
  "no-risk": mockNoRisk,
  "fsd-healthy": mockFsdHealthy,
  "fsd-bloated": mockFsdBloated,
};

export function getDevMock(): BndlReportData | null {
  const param = new URLSearchParams(window.location.search).get("mock");
  if (!param) {
    return mockFull;
  }
  return MOCKS[param] ?? mockFull;
}
