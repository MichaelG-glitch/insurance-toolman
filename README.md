# 保險工具人｜Insurance Toolman

把複雜的保險，變成你自己能用的工具。

## 網站入口（給客戶看的網頁）

https://michaelg-glitch.github.io/insurance-toolman/

## 三個入口

- **實用工具**（`tools/`）：強制險申請通用版等自助手冊
- **保險觀念**（`learn/`）：車禍、汽車保險、人壽保險
- **常見問答**（`qa/`）：客戶常見問題整理

## 關於本站

[開啟「關於保險工具人」](https://michaelg-glitch.github.io/insurance-toolman/about/)

為什麼叫「工具人」、這裡有什麼與沒有什麼，以及那個關於「第四次死亡」的願望。

---

## 署名與授權

本站由 [MichaelG](https://github.com/MichaelG-glitch) 建立。

- 觀念文章與問答（`learn/`、`qa/`、`about/`）：CC BY-NC-SA 4.0
- 工具頁（`tools/`）：CC BY-NC-ND 4.0
- 「保險工具人」名稱與 Logo：保留一切權利，不開放使用
- 網站程式碼（HTML/CSS/JS）：MIT License

詳細授權與轉載（TASL）要求請見 [LICENSE](LICENSE)。

## 道路救援自助指南

[開啟道路救援自助指南](https://michaelg-glitch.github.io/insurance-toolman/tools/road-rescue/)

故障或事故需要拖吊時的自助手冊：產險公司道路救援專線速查、一般道路與國道現場 SOP、撥打話術、拖吊檢查表與後續處理。僅列官方可確認的專線，無法確認者附官網連結，不含任何客戶個資。

## 手機掃描不求人

[開啟長輩友善掃描教學](https://michaelg-glitch.github.io/insurance-toolman/tools/mobile-scan/)

iPhone、Android 逐步操作與陪伴逐字稿，包含拍攝示意圖、PDF 傳送及送件前檢查。

## 車禍現場處理 SOP

[開啟車禍現場處理指南](https://michaelg-glitch.github.io/insurance-toolman/learn/car-accident/)

包含傷勢分流、七步驟互動檢查表、現場拍照插圖、報警話術與理賠資料時間軸。僅提供通用流程，不包含客戶個案資料。

## 如何管理

本儲存庫以 [Eleventy](https://www.11ty.dev/) 建置。原始內容在 `src/`，`main` 分支推送後，GitHub Actions 會自動建置到 `_site/` 並發布至 GitHub Pages（約 1～2 分鐘後更新）。

- 共用模板：`src/_includes/`（頂欄、頁尾、Logo、明暗模式）
- 全站樣式與腳本：`src/assets/`（theme.css、site.css、brand.css、site.js）
- 新增工具：在 `src/tools/` 建立資料夾並放 `index.njk`（front matter 指定標題、授權等）
- 新增觀念：在 `src/learn/` 建立資料夾並放 `index.njk`
- 更新問答：編輯 `src/qa/index.njk`

本機預覽：`npm install && npm run build`（輸出至 `_site/`），或 `npm run serve` 啟動本地伺服器。

完整的架構、網站地圖、front matter 欄位與歸檔規則見 [ARCHITECTURE.md](ARCHITECTURE.md)。

## 回報管道

發現錯字、過時資訊或失效連結，請到 [Issues](https://github.com/MichaelG-glitch/insurance-toolman/issues/new) 回報。這是公開頁面，請勿留下姓名、身分證、保單號、車牌等個資。

## 免責聲明

本站內容僅供一般參考，不構成保險招攬、要約或個案建議，也不取代保險公司個案審核、醫師診斷或律師正式法律意見；法規與商品內容可能更新，請以主管機關及各公司最新公告為準。
