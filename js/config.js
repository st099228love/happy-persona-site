window.APP_CONFIG = {
  appTitle: '你是哪種HAPPY人格?',
  surveySubtitle: '5～8分鐘測驗你的遊玩人格',
  researchNote: '此測驗完全匿名，僅供羅珮紓研究論文調查使用',
  likertLabels: ['非常不同意', '不同意', '普通', '同意', '非常同意'],
  backend: {
    // 把這裡換成你部署好的 Google Apps Script Web App URL
    googleScriptUrl: 'https://script.google.com/macros/s/AKfycbxGHyanpk8dquV5VrhxM-8SeHkVb5rdxqeF3rqZ3A-y2xLb1kK2V32uDnZVFiUx-KciiA/exec',
    enabled: true,
    security: {
      // 建議上線時啟用，並在 Apps Script 的 Script Properties 設定 TURNSTILE_SECRET_KEY
      requireCaptcha: false,
      captchaProvider: 'turnstile',
      // 可由 Turnstile callback 把 token 填進 #captcha-token
      captchaSiteKey: '',
      maxSubmissionPerMinute: 3,
      requestTtlSeconds: 600
    }
  },
  thresholds: {
    physicalHighCutoff: 4.0,
    closeDifference: 0.3
  }
};
