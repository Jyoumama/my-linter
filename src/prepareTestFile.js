import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import logger from "./logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// プロジェクトのルートディレクトリを基準にファイルを作成する
const projectRoot = path.resolve(__dirname, ".."); // srcディレクトリの一つ上がルート

// 初期状態のテストファイルの内容
const testFileContent = `
// ESLint と Prettier の自動修正と手動修正をデモするためのファイル

// var は非推奨
var noUsedVar = 'Hello'; // ダブルクォートではなくシングルクォート（Prettier の修正対象）

// 未使用の関数
function unusedFunction() {
  const unusedVariable = "This is unused"; // 未使用の変数（ESLint の警告対象）
}

// 再代入（prefer-const ルールで警告）
noUsedVar = 'Updated value';
`;

export default async function prepareTestFile(fileToReset) {
  try {
    // デフォルトのリセットファイルは src/testFile.js
    const filePath = fileToReset
      ? path.isAbsolute(fileToReset)
        ? fileToReset
        : path.resolve(process.cwd(), fileToReset)
      : path.join(projectRoot, "src/testFile.js");

    logger.info(`🛠️ リセットするファイルパス: ${filePath}`); // 追加
    await fs.writeFile(filePath, testFileContent, "utf8");
    logger.info(`✅ ファイルがリセットされました: ${filePath}`);
  } catch (error) {
    logger.error("❌ テストファイルのリセット中にエラーが発生しました:");
    logger.error(error.message);
  }
}
