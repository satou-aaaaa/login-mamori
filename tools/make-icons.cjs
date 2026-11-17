// アプリのアイコン（icon-192.png・icon-512.png）を作る。青い地に、鍵穴のある南京錠と星印のパスワード。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#123554"/><stop offset="1" stop-color="#2f6fae"/></linearGradient></defs>
      <rect width="100" height="100" fill="url(#g)"/>
      <path d="M34 44 V32 a16 16 0 0 1 32 0 V44" fill="none" stroke="#e9eef8" stroke-width="7"/>
      <rect x="24" y="42" width="52" height="40" rx="7" fill="#f6d77a"/>
      <circle cx="50" cy="57" r="5.5" fill="#123554"/><rect x="47.5" y="58" width="5" height="12" rx="2" fill="#123554"/>
      <g fill="#fff"><circle cx="16" cy="90" r="2.4"/><circle cx="26" cy="90" r="2.4"/><circle cx="36" cy="90" r="2.4"/><circle cx="64" cy="90" r="2.4"/><circle cx="74" cy="90" r="2.4"/><circle cx="84" cy="90" r="2.4"/></g></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
