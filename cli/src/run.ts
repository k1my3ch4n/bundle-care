import { loadConfig } from "./config.js";
import { logger, createSpinner } from "./utils/logger.js";
import { type CliOptions } from "./types.js";

export async function run(options: CliOptions): Promise<void> {
  logger.blank();
  logger.title("⚕  BndlCare — 번들 분석 시작");
  logger.blank();

  const config = loadConfig(options.config);

  const spinner = createSpinner("프로젝트 분석 중...");
  spinner.start();

  // TODO: Phase 2 — analyzer.ts 연동
  await Promise.resolve();

  spinner.succeed("분석 완료");

  if (!options.ai || !config.geminiApiKey) {
    logger.warn("AI 처방을 건너뜁니다. (--no-ai 또는 geminiApiKey 미설정)");
  } else {
    // TODO: Phase 3 — aiServiceClient.ts 연동
  }

  // TODO: Phase 9 — htmlBuilder.ts 연동
  logger.blank();
  logger.success("bndl-report.html 이 생성되었습니다.");

  if (options.open) {
    // TODO: Phase 9 — open() 연동
  }
}
