#!/usr/bin/env node
import { Command } from "commander";
import { loadConfig } from "./config.js";
import { logger, createSpinner } from "./utils/logger.js";

const program = new Command();

program
  .name("bndl-care")
  .description("프론트엔드 번들 분석 및 AI 처방 리포트 생성 도구")
  .version("0.1.0")
  .option(
    "-c, --config <path>",
    "설정 파일 경로 (기본값: bndlcare.config.json)",
  )
  .option("--no-ai", "AI 처방 없이 정적 분석만 수행")
  .option("--no-open", "리포트 생성 후 브라우저 자동 오픈 비활성화")
  .action(async (options: { config?: string; ai: boolean; open: boolean }) => {
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
  });

program.parse();
