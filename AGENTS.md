# AGENTS.md

ログインまもり：だれかのアカウントの守り方を2つ比べ、安全なほう（ときどき、危ないほう）を選ぶ1日5問の学習ゲーム。正解したら「何のための守り？」（作り方・しまい方・鍵を足す/機械を守る・おかしいと思ったら）も選ぶ。`index.html` と `data.js`（問題の種類）を GitHub Pages で公開する。

## 準備（最初に一度）

```bash
bash scripts/setup.sh   # Node.js（版は .nvmrc）を確かめ、検査の依存とブラウザを入れる。何度実行してもよい
```

Claude Code のクラウドセッションでは `.claude/settings.json` のフックが自動で実行する。

## push する前の確認

```bash
node qa/run.mjs   # 問題（20種類×3000問：選び肢2つ・答えは1つ・よいほうと分け方が資料の表どおり・問いの向き・出典）・今日の5問と上級（3年分）・とことん・通しで遊ぶ・続きから・2段目・復習・幅320px・PWA・引き継ぎ・見やすさ（CI の QA と同じ）
```

## このリポジトリの決まり

- 中身は総務省「国民のためのサイバーセキュリティサイト」・国家サイバー統括室「インターネットの安全・安心ハンドブック」第4・5章・IPA「不正ログイン対策特集ページ」で確かめたことだけ（2026-11-17 に読んだ。要点は共有フォルダ `games/login-research.md`）。読んだ資料に文が無かった「SMS の認証コードを人に教えない」「秘密の質問」は出さない。種類を足すときも資料を読み、`src` に出典を付け、`qa/run.mjs` の `TB`（別に書いた資料の表）にも足す。
- 公式の情報の代わりにしない：遊び方と「このゲームについて」と README に、公式の情報の代わりではないこと・サービスの設定は公式の案内に従うことを置く（QA が見る）。「絶対に安全」「必ず防げる」と言い切らない。フィッシングの見分け（sagi-minuki）・アプリの権限（kengen-check）・SNS の投稿（dashisugi-check）は扱わない。実在のサービス名・ロゴは出さない。
- 人はすべて架空で、年や立場（中学生・会社員・70代の人など）だけで書き、性別を決めない。
- 問題はどれも2つの選び肢。どの種類も4回に1回「危ないのはどっち？」と逆に聞く（`P.rev`）。2段目は「何のための守り？」（4つ）で、種類（`grp`）で決まる。選び肢が2つなので、2回目のヒントは選び肢を消さず、資料の言葉（`key`）を見せる。
- 今日の5問（やさしい2・ふつう2・むずかしい1、種類は重ねない）・上級（むずかしい3、今日のむずかしいと別）は日本時間の日付の種で決まり、だれでも同じ。`Math.random()` は練習・とことんの種だけ。乱数は `sort` の比較の中で引かない。`KINDS`・言い回しの並びは最後に足すだけ（QA の `PIN` が第1回の1問目を見る）。`data.js` を変える PR は自動ではマージされない（`hold_paths`）。
- ★はまちがい＋ヒントの数（0で★3・1で★2・2以上で★1）。上級はヒントなし。時間制限なし。
- 好きなだけ遊べる：チケット・ライフ・回数制限・🔒で開くモードを入れない（shared-workflows `routines/game-dev.md` F1〜F7。QA が見る）。とことん（`runs.e`）はまちがえても続き、「ここで降りる」で終わる。
- 1問を深くする：`depth.js` と `qa/depth-check.mjs` は shared-workflows `template/` の写しで、ここでは直さない。自信あり・2段目「何のためのコツ？」・復習（1→3→7日後）。記録 `lgm-v1`・文字 `lgm-fs`・復習 `lgm-depth`。
- 共有は遊ぶ人が押したときに開くリンクだけ。シェアの文に問題・答えを出さない。感想は Issue フォーム（`.github/ISSUE_TEMPLATE/feedback.yml`）を開くだけ。応援は Ko-fi へのただのリンクだけ。
- 外へ通信しない（CSP の `connect-src 'self'` を広げない）。見やすさ（`<!-- a11y:begin -->`〜`end`・`qa/a11y.mjs`）と引き継ぎ（`transfer.js`・`qa/transfer-check.mjs`）は shared-workflows `template/` の写しで、ここでは直さない。
- 画面の土台は眠りのコツ（nemuri-kotsu）から写した。写し元の言葉が残っていないかを QA が見る。
- PWA：画面のファイルを足したら `sw.js` の `SHELL` にも足し、中身を大きく変えたら `CACHE` の版を上げる。アイコンは `node tools/make-icons.cjs`、`og.png` は `node tools/make-og.cjs`。
- 公開リポジトリなので、個人情報・鍵を入れない。

## 公開

- GitHub Pages は `main` のルート（`/`）を公開する。PR の QA と Secret scan が ✅ になると `automerge.yml` が自動でマージする。止めたいときは下書きにするか、ラベル「自動マージしない」を付ける。
- `sw.js`・`manifest.webmanifest`・`data.js` を変える PR は自動ではマージされない（`hold_paths`）。CodeRabbit のレビューを読み、手でマージする直前に今の head へのレビューを読み直す。CodeRabbit は PR に `@coderabbitai review` とコメントして頼む。

## 共通のきまり

- PR の作り方・マージの仕方は satou-aaaaa/shared-workflows の `routines/pr.md`、全体のきまりは `routines/common.md` に従う。
- CI の部品は shared-workflows の共通部品を呼ぶ。リポジトリ側の .github/workflows には呼び出しと設定値だけを書く。
- Claude 以外の AI・人が作業するときは、shared-workflows の `routines/tool-map.md` と `routines/without-claude.md` を読む。
