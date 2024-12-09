# my-linter
A CLI tool combining Prettier and ESLint 
# My-Linter CLI

My-Linter CLI は、ESLint と Prettier を使用してコードスタイルを統一し、手動修正箇所のリストアップや音声通知機能を備えたツールです。

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
npm install -g my-linter
```

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

#### 4. 詳細ログ表示

```bash
my-linter --verbose
```
- 詳細なログを表示します。

#### 5. 音声通知の無効化

```bash
my-linter --no-sound
```
- 音声通知を無効化します。

#### 6. 特定のファイルやディレクトリを指定

```bash
my-linter --files "src/**/*.js"
```
- 対象ファイルを指定できます。

---

## 設定ファイルの例

以下は、ESLint と Prettier の設定例です。

### `.eslintrc.js`

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  rules: {
    "no-unused-vars": "warn",
    "prefer-const": "error",
  },
};
```

### `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2
}
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

## ライセンス

このプロジェクトは MIT ライセンスのもとで提供されています。
