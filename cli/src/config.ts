import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { type BndlCareConfig, DEFAULT_CONFIG } from "./types.js";

export function loadConfig(configPath?: string): Required<BndlCareConfig> {
  const resolvedPath = resolve(
    process.cwd(),
    configPath ?? "bndlcare.config.json",
  );

  if (!existsSync(resolvedPath)) {
    return DEFAULT_CONFIG;
  }

  try {
    const raw = readFileSync(resolvedPath, "utf-8");
    const parsed = JSON.parse(raw) as BndlCareConfig;
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch {
    return DEFAULT_CONFIG;
  }
}
