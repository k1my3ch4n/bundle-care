export interface BndlCareConfig {
  maxBundleSizeKB?: number;
  geminiApiKey?: string;
  failOnDockerRisk?: boolean;
  statsJsonPath?: string;
  packageJsonPath?: string;
}

export interface CliOptions {
  config?: string;
  ai: boolean;
  open: boolean;
}

export const DEFAULT_CONFIG: Required<BndlCareConfig> = {
  maxBundleSizeKB: 500,
  geminiApiKey: "",
  failOnDockerRisk: false,
  statsJsonPath: "stats.json",
  packageJsonPath: "package.json",
};
