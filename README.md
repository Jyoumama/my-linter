# mama-linter CLI

A CLI tool combining Prettier and ESLint with sound notifications

mama-Linter CLI は、ESLint と Prettier を使用してコードスタイルを統一し、手動修正箇所のリストアップや音声通知機能🎵を備えたツールです。

---

## 特徴

- **自動修正**: ESLint と Prettier によるコードの自動修正。
- **手動修正箇所の特定**: 修正が必要な箇所をリストアップ。
- **音声通知**: 修正完了や手動修正が必要な箇所を音声で通知。
- **柔軟な設定**: 対象ファイルや動作モードをオプションで指定可能。

---

## インストール方法

以下のコマンドでインストールします:

```bash
npm install -g mama-linter
```

## 注意: インストールと実行時の名前について

このCLIツールのインストール時にはパッケージ名（mama-linter）を使用します。
実行時には、CLIコマンド名（my-linter）を使用します。

たとえば：

### インストールコマンド

```bash
npm install -g mama-linter
```

### 実行コマンド

```bash
my-linter --help
```

このように、**インストール時の名前（mama-linter）と実行時の名前（my-linter)**が異なることに注意してください。

---

## 基本的な使い方

### コマンド一覧

#### 1. デフォルト動作

```bash
my-linter
```

- 自動修正と手動修正箇所のリストアップを行います。
- 修正完了後、音声通知が再生されます。

#### 2. 修正のみ

```bash
my-linter --fix
```

- 自動修正のみを行います。

#### 3. チェックのみ

```bash
my-linter --check
```

- コードスタイルのチェックのみを行います。

#### 4. 音声通知の無効化

```bash
my-linter --noSound
```

- 音声通知を無効化します。

#### 5.特定のファイルやディレクトリを指定

```bash
my-linter --files "src/**/*.js"
```

- 対象ファイルを指定できます。

#### 6.実行モードの指定

```bash
my-linter --mode [mode]
```

- 実行モードを指定します。
  `default`: 自動修正と手動修正箇所のリストアップを行います。（デフォルト）
  `fix`: 自動修正のみを行います。
  `check`: チェックのみを行い、修正は行いません。

#### 7. 詳細ログ表示

```bash
my-linter --verbose
```

- 詳細なログを表示します。

#### 8. ヘルプの表示

```bash
my-linter --help
```

- 使用可能なすべてのオプションとその説明を表示します。

---

## デモ: 手動修正と音声通知

My-Linter では、手動修正が必要な箇所をリストアップし、修正が完了すると音声通知を行います。

### デモ手順

#### 以下の手順でデモを試してみてください

#### 1.テストファイルのリセット

リセットコマンドで`testFile.js` を初期状態（手動修正できる状態）に戻します：

```bash
my-linter reset-test
```

- `reset-test`コマンドは、デフォルトで`src/testFile.js` を `var` を含む初期状態にリセットします。

- `--verbose` オプションを付けると、詳細なログが表示されます。

```bash
my-linter reset-test --verbose
```

出力例:

```bash
🛠️ reset-test コマンドが呼び出されました！
リセットするファイル: src/testFile.js
✅ ファイルがリセットされました: src/testFile.js
```

#### 2.My-Linterの実行

My-Linterを実行して、手動修正が必要な箇所をリストアップします。

```bash
my-linter
```

出力例:

```bash
⚠️ 修正が必要な箇所が残っています:
`src/testFile.js`
- 4:1 Unexpected var, use let or const instead. (no-var)
//'var' を 'let' または 'const' に置き換えてください (no-var)
```

説明:

- var の使用が no-var ルールに違反していることを示しています。
- エラーメッセージを参考に修正を行います。

#### 3.手動修正の実施

- エディタで `testFile.js` を開き、`var` を `let` または `const` に置き換えます。

#### 4.修正完了の確認

再度My-Linterを実行して、修正が正しく反映されたか確認します。

```bash
my-linter
```

出力例：

```bash
🎉 手動修正が完了しました！
```

さらに、修正が完了したことを知らせる音声通知が再生されます。
**「やったね！」**という達成感を味わいましょう！🎵

### ユーザーカスタマイズの方法

リセット コマンドはデフォルトで `src/testFile.js` を対象にしていますが、`--file` オプションで別のファイルを指定することも可能です。

```bash
my-linter reset-test --file=path/to/your/file.js
```

---

## 設定ファイルの例

以下は、My-Linterで使用されるESLintとPrettierの設定ファイルです。

### `eslint.config.js`

```js
import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    languageOptions: { globals: globals.nodeBuiltin },
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      "no-var": ["error"],
      "prefer-const": ["error"],
      camelcase: ["warn"],
      "no-console": ["warn"],
      "no-unused-vars": ["warn"],
      semi: ["error", "always"],
      quotes: "off",
      indent: "off",
      "eol-last": ["error", "always"],
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
    },
  },
  {
    files: ["src/testFile.js", "src/testFileTemplate.js"],
    rules: {
      "no-unused-vars": "off",
      "no-console": "off",
      "no-undef": "off",
    },
  },
];
```

### `prettier.config.js`

```js
export default {
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  printWidth: 80,
};
```

---

## よくある質問（FAQ）

### Q1. 音声通知を無効化できますか？

A1. はい、`--no-sound` オプションを使用してください。

### Q2. 特定のファイルだけを修正したい場合は？

A2. `--files` オプションを使用して対象ファイルを指定してください。

### Q3. 設定ファイルが見つからない場合の動作は？

A3. デフォルト設定が適用されます。ただし、カスタマイズを推奨します。

---

### ライセンス

このプロジェクトは MIT ライセンスのもとで提供されています。

---

<!-- ダミー変更 -->
