var SECURITY_DEFAULTS = {
  requestTtlSeconds: 600,
  maxSubmissionPerMinute: 3,
  maxTextLength: 2000,
  captchaProvider: 'turnstile',
  requireCaptcha: false
};

function sanitizeCellValue(value) {
  if (value === null || value === undefined) return '';

  var text = String(value)
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .trim();

  if (/^[=+\-@]/.test(text)) {
    text = "'" + text;
  }

  if (text.length > SECURITY_DEFAULTS.maxTextLength) {
    text = text.slice(0, SECURITY_DEFAULTS.maxTextLength);
  }

  return text;
}

function sanitizeLikertAnswer(value) {
  var numeric = Number(value);

  if (!isFinite(numeric)) return null;

  numeric = Math.round(numeric);
  if (numeric < 1 || numeric > 5) return null;

  return numeric;
}

function sanitizeAnswers(answers) {
  if (!answers || typeof answers !== 'object') {
    return {};
  }

  var clean = {};

  Object.keys(answers).forEach(function(key) {
    if (!/^[A-Za-z0-9_]{1,30}$/.test(key)) {
      return;
    }

    var value = answers[key];

    if (typeof value === 'number') {
      var likert = sanitizeLikertAnswer(value);
      if (likert !== null) {
        clean[key] = likert;
      }
      return;
    }

    if (typeof value === 'string') {
      clean[key] = sanitizeCellValue(value);
    }
  });

  return clean;
}

function getSecurityConfig() {
  var props = PropertiesService.getScriptProperties();

  return {
    requestTtlSeconds: Number(props.getProperty('REQUEST_TTL_SECONDS') || SECURITY_DEFAULTS.requestTtlSeconds),
    maxSubmissionPerMinute: Number(props.getProperty('MAX_SUBMISSION_PER_MINUTE') || SECURITY_DEFAULTS.maxSubmissionPerMinute),
    captchaProvider: props.getProperty('CAPTCHA_PROVIDER') || SECURITY_DEFAULTS.captchaProvider,
    requireCaptcha: String(props.getProperty('REQUIRE_CAPTCHA') || SECURITY_DEFAULTS.requireCaptcha) === 'true',
    turnstileSecretKey: props.getProperty('TURNSTILE_SECRET_KEY') || ''
  };
}

function getSecurityLogSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('security_logs');

  if (!sheet) {
    sheet = ss.insertSheet('security_logs');
    sheet.appendRow(['timestamp', 'reason', 'clientId', 'detail']);
  }

  return sheet;
}

function logSecurityEvent(reason, security, detail) {
  try {
    var sheet = getSecurityLogSheet();
    sheet.appendRow([
      new Date().toISOString(),
      sanitizeCellValue(reason),
      sanitizeCellValue(security && security.clientId),
      sanitizeCellValue(detail || '')
    ]);
  } catch (error) {
    Logger.log('security log failed: ' + error);
  }
}

function verifyTurnstileToken(token, securityConfig) {
  if (!securityConfig.turnstileSecretKey) {
    return { ok: false, message: 'TURNSTILE_SECRET_KEY not configured' };
  }

  try {
    var response = UrlFetchApp.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'post',
      payload: {
        secret: securityConfig.turnstileSecretKey,
        response: token
      },
      muteHttpExceptions: true
    });

    var data = JSON.parse(response.getContentText() || '{}');
    if (data.success) {
      return { ok: true };
    }

    return {
      ok: false,
      message: 'captcha verification failed'
    };
  } catch (error) {
    return { ok: false, message: 'captcha verify error: ' + error };
  }
}

function validateSecurityPayload(payload, securityConfig) {
  var security = payload.security || {};

  if (typeof security.honeypot === 'string' && security.honeypot.trim() !== '') {
    return { ok: false, reason: 'honeypot_triggered' };
  }

  if (!/^nonce_[A-Za-z0-9_]+$/.test(String(security.nonce || ''))) {
    return { ok: false, reason: 'invalid_nonce' };
  }

  if (!/^client_[A-Za-z0-9_]+$/.test(String(security.clientId || ''))) {
    return { ok: false, reason: 'invalid_client_id' };
  }

  var requestTime = new Date(String(security.timestamp || ''));
  if (isNaN(requestTime.getTime())) {
    return { ok: false, reason: 'invalid_timestamp' };
  }

  var now = Date.now();
  var maxSkew = securityConfig.requestTtlSeconds * 1000;
  if (Math.abs(now - requestTime.getTime()) > maxSkew) {
    return { ok: false, reason: 'expired_request' };
  }

  var cache = CacheService.getScriptCache();
  var nonceKey = 'nonce:' + security.nonce;
  if (cache.get(nonceKey)) {
    return { ok: false, reason: 'replay_detected' };
  }

  var minuteKey = 'rate:' + security.clientId + ':' + Math.floor(now / 60000);
  var minuteCount = Number(cache.get(minuteKey) || 0);
  if (minuteCount >= securityConfig.maxSubmissionPerMinute) {
    return { ok: false, reason: 'rate_limited' };
  }

  var captchaToken = String(security.captchaToken || '').trim();
  if (securityConfig.requireCaptcha) {
    if (!captchaToken) {
      return { ok: false, reason: 'captcha_required' };
    }

    if (securityConfig.captchaProvider === 'turnstile') {
      var verifyResult = verifyTurnstileToken(captchaToken, securityConfig);
      if (!verifyResult.ok) {
        return { ok: false, reason: 'captcha_failed', detail: verifyResult.message };
      }
    }
  }

  cache.put(nonceKey, '1', securityConfig.requestTtlSeconds);
  cache.put(minuteKey, String(minuteCount + 1), 70);

  return { ok: true };
}

function getResponseSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('responses');

  if (!sheet) {
    sheet = ss.insertSheet('responses');
    sheet.appendRow([
      'submittedAt', 'scenario', 'clientId', 'answersJson'
    ]);
  }

  return sheet;
}

function doPost(e) {
  try {
    var securityConfig = getSecurityConfig();
    var rawData = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    var securityResult = validateSecurityPayload(rawData, securityConfig);
    if (!securityResult.ok) {
      logSecurityEvent(securityResult.reason, rawData.security || {}, securityResult.detail || '');
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'error', message: 'invalid request' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var scenario = rawData.scenario === 'movie' || rawData.scenario === 'weekend'
      ? rawData.scenario
      : '';

    var answers = sanitizeAnswers(rawData.answers);

    var sheet = getResponseSheet();
    sheet.appendRow([
      sanitizeCellValue(new Date().toISOString()),
      sanitizeCellValue(scenario),
      sanitizeCellValue(rawData.security && rawData.security.clientId),
      sanitizeCellValue(JSON.stringify(answers))
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    logSecurityEvent('server_exception', {}, String(error));
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
