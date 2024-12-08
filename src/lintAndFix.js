import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import fg from "fast-glob";
import chalk from "chalk";
import yargs from "yargs";
import { ESLint } from "eslint";
import * as prettier from "prettier";
import { playSound } from "./playSound.js";
import logger from "./logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const argv = yargs(process.argv.slice(2))
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
  .option("mode", {
    type: "string",
    description: "実行モード ('default', 'fix', 'check')",
    choices: ["default", "fix", "check"],
    default: "default",
  })
  .option("verbose", {
    type: "boolean",
    description: "詳細なログを表示",
    default: false,
  })
  .help()
  .alias("help", "h").argv;

const soundEnabled = !argv.noSound;
const targetFiles = argv.files;
const mode = argv.mode;
const verbose = argv.verbose;

/**
 * Prettier を使用してファイルを整形します。
 * @param {string} file - 整形対象のファイル
 * @returns {boolean} - 修正が行われたかどうか
 */
async function runPrettier(file) {
  const fileContent = await fs.readFile(file, "utf8");
  const options = await prettier.resolveConfig(file);
  const formatted = await prettier.format(fileContent, {
    ...options,
    filepath: file,
  });

  if (fileContent !== formatted) {
    await fs.writeFile(file, formatted, "utf8");
    logger.info(chalk.green(`✅ Prettier による修正が適用されました: ${file}`));
    if (soundEnabled) {
      playSound(path.resolve(__dirname, "../assets/prettier-fix.mp3"));
    }
    return true;
  }

  return false;
}

/**
 * ESLint を使用してファイルを修正します。
 * @param {string} file - 修正対象のファイル
 * @param {boolean} fix - 修正を実行するかどうか
 * @returns {boolean} - 手動修正が必要かどうか
 */
async function runEslint(file, { fix = true } = {}) {
  const eslint = new ESLint({ fix });
  const results = await eslint.lintFiles([file]);

  let hasManualFixes = false;

  for (const result of results) {
    if (result.output && fix) {
      await fs.writeFile(result.filePath, result.output, "utf8");
      logger.info(chalk.green(`✅ ESLint による修正が適用されました: ${file}`));
      if (soundEnabled) {
        playSound(path.resolve(__dirname, "../assets/eslint-fix.mp3"));
      }
    }

    if (result.messages.length > 0) {
      hasManualFixes = true;
      logger.info(chalk.yellow(`⚠️ 修正が必要な箇所が残っています: ${file}`));
      result.messages.forEach((message) => {
        let specificMessage = "";

        switch (message.ruleId) {
          case "no-undef":
            specificMessage = "未定義の変数を確認してください";
            break;
          case "no-unused-vars":
            specificMessage = "未使用の変数を削除してください";
            break;
          case "no-console":
            specificMessage = "console.log を削除または置き換えてください";
            break;
          default:
            specificMessage = message.message;
        }

        logger.info(
          chalk.yellow(
            `- ${message.line}:${message.column} ${specificMessage} (${message.ruleId})`
          )
        );
      });

      if (soundEnabled) {
        playSound(path.resolve(__dirname, "../assets/attention.mp3"));
      }
    }
  }

  return hasManualFixes;
}

/**
 * ファイルを検査・修正し、必要に応じて音声通知を行います。
 */
async function lintAndFix() {
  const files = await fg([targetFiles], { absolute: true });
  let manualFixRequired = false;

  for (const file of files) {
    const originalContent = await fs.readFile(file, "utf8");
    let prettierChanged = false;

    try {
      if (mode === "check") {
        logger.info(chalk.blue(`🔍 チェック中: ${file}`));
        if (verbose) {
          logger.info(chalk.blue(`詳細ログ: ${file} をチェックしています。`));
        }
        await runEslint(file, { fix: false });
      } else {
        logger.info(
          chalk.blue(
            mode === "fix"
              ? `🔧 修正中: ${file}`
              : `🛠️ 修正および手動修正箇所をリストアップ中: ${file}`
          )
        );
        if (verbose) {
          logger.info(chalk.blue(`詳細ログ: ${file} を処理中。`));
        }
        prettierChanged = await runPrettier(file);
        const manualFixes = await runEslint(file, { fix: mode === "fix" });
        manualFixRequired = manualFixRequired || manualFixes;
      }
    } catch (error) {
      logger.error(chalk.red(`❌ エラーが発生しました: ${file}`));
      logger.error(chalk.red(error.message));
    }

    const updatedContent = await fs.readFile(file, "utf8");

    if (
      !manualFixRequired &&
      originalContent === updatedContent &&
      !prettierChanged
    ) {
      logger.info(chalk.green(`✅ 修正の必要がありませんでした: ${file}`));
    }
  }

  if (!manualFixRequired) {
    logger.info(chalk.green("🎉 手動修正が完了しました！"));
    if (soundEnabled) {
      playSound(path.resolve(__dirname, "../assets/fix-applied.mp3"));
    }
  }
}

export { lintAndFix };
