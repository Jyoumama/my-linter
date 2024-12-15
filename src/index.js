#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Linter } from "./Linter.js";
import logger from "./logger.js";

const argv = yargs(hideBin(process.argv))
  .option("fix", {
    alias: "f",
    type: "boolean",
    description: "Automatically fix linting issues",
  })
  .option("check", {
    alias: "c",
    type: "boolean",
    description: "Check files for linting issues without fixing",
  })
  .option("no-sound", {
    type: "boolean",
    description: "音声通知を無効化",
    default: false,
  })
  .option("files", {
    type: "string",
    description: "対象ファイルやディレクトリを指定",
    default: "src/**/*.js",
  })
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Show detailed logs",
    default: false,
  })
  .help()
  .alias("help", "h").argv;

(async () => {
  try {
    const linter = new Linter(argv);

    if (argv.fix) {
      logger.info("🔧 自動修正を実行中...");
      await linter.lintAndFix();
    } else if (argv.check) {
      logger.info("🔍 チェックモードで実行中...");
      await linter.lintAndFix();
    } else {
      logger.info("🛠️ デフォルトモードで実行中...");
      await linter.lintAndFix();
    }
  } catch (error) {
    logger.error("❌ エラーが発生しました:");
    logger.error(error.message);
  }
})();
