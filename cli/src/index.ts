#!/usr/bin/env node
import { Command } from "commander";
import { run } from "./run.js";
import { type CliOptions } from "./types.js";

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
  .action((options: CliOptions) => run(options));

program.parse();
