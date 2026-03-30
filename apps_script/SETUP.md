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
