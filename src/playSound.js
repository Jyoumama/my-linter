import path from "path";
import { fileURLToPath } from "url";
import player from "play-sound";
import logger from "./logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PlayerInstance = player({});

/**
 * 指定した音声ファイルを再生する
 * @param {string} fileName - 再生する音声ファイル名
 */
export function playSound(fileName) {
  const filePath = path.resolve(__dirname, "../assets", fileName);

  try {
    PlayerInstance.play(filePath, (err) => {
      if (err) {
        logger.error(
          `音声再生エラー: ファイルパス=${filePath}, メッセージ=${err.message}, コード=${err.code}`
        );
        return;
      }
      logger.info(`音声が再生されました: ${filePath}`);
    });
  } catch (error) {
    logger.error(`予期せぬエラー: メッセージ=${error.message}`);
  }
}
