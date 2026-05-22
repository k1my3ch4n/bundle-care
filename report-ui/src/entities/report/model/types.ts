export interface ChunkInfo {
  name: string;
  size: number;
  modules: ModuleInfo[];
}

export interface ModuleInfo {
  name: string;
  size: number;
}

export interface DockerRisk {
  packageName: string;
  reason: string;
  sizeKB: number;
  location: "devDependencies" | "dependencies";
}

export interface TreeshakingLeak {
  packageName: string;
  importedSymbols: string[];
  totalPackageSizeKB: number;
  usageRatio: number;
}

export interface AlternativeLibrary {
  name: string;
  sizeKB: number;
  description: string;
}

export interface AiPrescription {
  targetPackage: string;
  alternatives: AlternativeLibrary[];
  vanillaSnippet: string;
  reasoning: string;
}

export interface FsdLayerStat {
  layer: "app" | "pages" | "widgets" | "features" | "entities" | "shared";
  sizeKB: number;
  fileCount: number;
}

export interface BndlReportData {
  generatedAt: string;
  projectName: string;
  totalBundleSizeKB: number;
  chunks: ChunkInfo[];
  dockerRisks: DockerRisk[];
  treeshakingLeaks: TreeshakingLeak[];
  aiPrescriptions: AiPrescription[];
  fsdLayers?: FsdLayerStat[];
  isFsdProject: boolean;
}
