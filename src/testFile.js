// ESLint と Prettier の自動修正と手動修正をデモするためのファイル

// var は非推奨
let noUsedVar = "Hello"; // ダブルクォートではなくシングルクォート（Prettier の修正対象）

// 未使用の関数
function unusedFunction() {
  const unusedVariable = "This is unused"; // 未使用の変数（ESLint の警告対象）
}

// 警告対象のコード
logger.info(noUsedVar); // logger.info の利用が警告される可能性あり（ルール次第）

// 再代入（prefer-const ルールで警告）
noUsedVar = "Updated value"; // ダブルクォートではなくシングルクォート（Prettier の修正対象）
