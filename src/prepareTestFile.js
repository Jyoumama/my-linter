import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import logger from "./logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testFileContent = `
// ESLint と Prettier の自動修正と手動修正をデモするためのファイル


// var は非推奨
var noUsedVar = 'Hello'; // ダブルクォートではなくシングルクォート（Prettier の修正対象）

// 未使用の関数
function unusedFunction() {
  const unusedVariable = "This is unused"; // 未使用の変数（ESLint の警告対象）
}

// 警告対象のコード
logger.info(noUsedVar); // logger.info の利用が警告される可能性あり（ルール次第）

// 再代入（prefer-const ルールで警告）
noUsedVar = 'Updated value'; // ダブルクォートではなくシングルクォート（Prettier の修正対象）
`;

const filesToReset = [
  {
    filePath: path.join(__dirname, "testFile.js"),
    content: testFileContent,
  },
];

(async () => {
  try {
    for (const file of filesToReset) {
      await fs.writeFile(file.filePath, file.content, "utf8");
      logger.info(`Reset file: ${file.filePath}`);
    }
    logger.info("Test file has been reset.");
  } catch (error) {
    logger.error("Error resetting test files:", error);
  }
})();
