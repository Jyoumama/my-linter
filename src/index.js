#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Linter } from "./Linter.js";
import logger from "./logger.js";
import prepareTestFile from "./prepareTestFile.js";

yargs(hideBin(process.argv))
  .command(
    "reset-test",
    "テストファイルを初期状態にリセットします",
    (yargs) => {
      return yargs
        .option("file", {
          alias: "f",
          type: "string",
          description: "リセットするファイルを指定します",
          default: "src/testFile.js",
        })
        .option("verbose", {
          alias: "v",
          type: "boolean",
          description: "詳細なログを表示します",
          default: false,
        });
    },
    async (argv) => {
      logger.info("🛠️ reset-test コマンドが呼び出されました！"); // デバッグログ追加
      try {
        if (argv.verbose) {
          logger.info("リセット処理を詳細モードで実行します...");
        }
        const fileToReset = argv.file; // ユーザーが指定したファイル
        logger.info(`リセットするファイル: ${fileToReset}`);
        await prepareTestFile(fileToReset);
        logger.info("✅ テストファイルがリセットされました。");
      } catch (error) {
        logger.error("❌ テストファイルのリセットに失敗しました。");
        logger.error(error.message);
      }
    }
  )
  .command(
    "*",
    "指定したオプションでリンターを実行します",
    (yargs) => {
      return yargs
        .option("fix", {
          alias: "f",
          type: "boolean",
          description: "検出された問題を自動修正します",
        })
        .option("check", {
          alias: "c",
          type: "boolean",
          description: "問題を修正せずに検出のみを行います",
        })
        .option("no-sound", {
          type: "boolean",
          description: "音声通知を無効化します",
          default: false,
        })
        .option("files", {
          type: "string",
          description: "対象のファイルやディレクトリを指定します",
          default: "src/**/*.js",
        })
        .option("verbose", {
          alias: "v",
          type: "boolean",
          description: "詳細なログを表示します",
          default: false,
        });
    },
    async (argv) => {
      try {
        const filesPattern = argv.files || "src/**/*.js";
        logger.info(`🔍 ファイルパターン: ${filesPattern}`); // デバッグログ追加
        const linter = new Linter({
          soundEnabled: argv["no-sound"] ? false : true,
          targetFiles: filesPattern,
          mode: argv.fix ? "fix" : argv.check ? "check" : "default",
          verbose: argv.verbose,
        });
        await linter.lintAndFix();
      } catch (error) {
        logger.error("❌ エラーが発生しました:");
        logger.error(error.stack);
      }
    }
  )
  .help()
  .alias("help", "h")
  .epilogue("詳細については、README を参照してください。")
  .parse();
