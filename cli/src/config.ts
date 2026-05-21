import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

export interface BndlCareConfig {
  maxBundleSizeKB?: number;
  geminiApiKey?: string;
  failOnDockerRisk?: boolean;
  statsJsonPath?: string;
  packageJsonPath?: string;
}

const DEFAULT_CONFIG: Required<BndlCareConfig> = {
  maxBundleSizeKB: 500,
  geminiApiKey: '',
  failOnDockerRisk: false,
  statsJsonPath: 'stats.json',
  packageJsonPath: 'package.json',
};

export function loadConfig(configPath?: string): Required<BndlCareConfig> {
  const resolvedPath = resolve(process.cwd(), configPath ?? 'bndlcare.config.json');

  if (!existsSync(resolvedPath)) {
    return DEFAULT_CONFIG;
  }

  try {
    const raw = readFileSync(resolvedPath, 'utf-8');
    const parsed = JSON.parse(raw) as BndlCareConfig;
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch {
    return DEFAULT_CONFIG;
  }
}
