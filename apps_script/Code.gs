function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('responses');
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('responses');
      sheet.appendRow([
        'submittedAt', 'resultType', 'typeKey', 'physicalLabel', 'selfLabel', 'motiveLabel',
        'physicalScore', 'independentScore', 'interdependentScore', 'utilitarianScore', 'selfNurturingScore',
        'territorialityScore', 'hedonicScore', 'soloPsychologyScore', 'behavioralIntentionScore', 'answersJson'
      ]);
    }

    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.submittedAt || '',
      data.resultType || '',
      data.typeKey || '',
      data.labels?.physical || '',
      data.labels?.self || '',
      data.labels?.motive || '',
      data.scores?.physicalScore || '',
      data.scores?.independentScore || '',
      data.scores?.interdependentScore || '',
      data.scores?.utilitarianScore || '',
      data.scores?.selfNurturingScore || '',
      data.scores?.territorialityScore || '',
      data.scores?.hedonicScore || '',
      data.scores?.soloPsychologyScore || '',
      data.scores?.behavioralIntentionScore || '',
      JSON.stringify(data.answers || {})
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
