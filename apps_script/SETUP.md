Google Sheets 後台設定方式

1. 先建立一個新的 Google Sheet。
2. 在 Google Sheet 中選「擴充功能」→「Apps Script」。
3. 把 Code.gs 的內容整份貼上。
4. 儲存後，選「部署」→「新增部署作業」。
5. 類型選「網頁應用程式」。
6. 執行身分選「我」。
7. 存取權限選「任何知道連結的人」。
8. 部署後，複製 Web App URL。
9. 打開網站裡的 js/config.js：
   - 把 googleScriptUrl 換成你的 Web App URL
   - 把 enabled 改成 true

完成後，填完問卷就會把資料寫進 Google Sheet 的 responses 工作表。

---

## 安全設定（建議公開前完成）

### 1) 設定 Apps Script Script Properties
在 Apps Script 專案中開啟「專案設定」→「Script properties」，新增以下鍵值：

- `REQUEST_TTL_SECONDS`：建議 `600`
- `MAX_SUBMISSION_PER_MINUTE`：建議 `3`
- `REQUIRE_CAPTCHA`：`true` 或 `false`
- `CAPTCHA_PROVIDER`：`turnstile`
- `TURNSTILE_SECRET_KEY`：你的 Cloudflare Turnstile secret key（若啟用 captcha 必填）

### 2) 前端設定
`js/config.js` 的 `backend.security`：
- `requireCaptcha`：上線建議改成 `true`
- `captchaProvider`：`turnstile`
- `captchaSiteKey`：填入 Turnstile site key

### 3) Captcha token 接線
目前前端會讀取 `#captcha-token` 欄位作為 token。
你可以在 Turnstile callback 裡把 token 寫入：

```js
document.getElementById('captcha-token').value = token;
```

### 4) 反濫用機制（已內建）
- honeypot 欄位檢查（`website-field`）
- nonce replay 防護
- 每分鐘送出次數限制
- 異常請求會寫入 `security_logs` 工作表
