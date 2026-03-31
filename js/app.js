const STORAGE_KEYS = {
  answers: 'happyPersonaAnswers',
  assignedScenario: 'happyPersonaAssignedScenario',
  completed: 'happyPersonaCompleted'
};

const state = {
  currentPage: -1,
  surveyPages: [window.SURVEY_SETS?.shared?.consent].filter(Boolean),
  answers: loadSavedAnswers(),
  scenario: loadAssignedScenario(),
  result: null,
  isSubmitting: false,
  startTime: null
};

if (state.scenario) {
  state.surveyPages = buildSurveyPages(state.scenario);
}

const screens = {
  cover: document.getElementById('cover-screen'),
  question: document.getElementById('question-screen'),
  result: document.getElementById('result-screen')
};

const elements = {
  startBtn: document.getElementById('start-btn'),
  pageHeader: document.getElementById('page-header'),
  questionList: document.getElementById('question-list'),
  prevBtn: document.getElementById('prev-btn'),
  nextBtn: document.getElementById('next-btn'),
  progressWrap: document.getElementById('progress-bar-wrap'),
  progressFill: document.getElementById('progress-fill'),
  progressPageText: document.getElementById('progress-page-text'),
  progressPercentText: document.getElementById('progress-percent-text'),
  resultCard: document.getElementById('result-card')
};

function loadSavedAnswers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.answers)) || {};
  } catch (e) {
    return {};
  }
}

function saveAnswers() {
  localStorage.setItem(STORAGE_KEYS.answers, JSON.stringify(state.answers));
}

function loadAssignedScenario() {
  const saved = localStorage.getItem(STORAGE_KEYS.assignedScenario);
  return saved === 'movie' || saved === 'weekend' ? saved : null;
}

function saveAssignedScenario(scenario) {
  state.scenario = scenario;
  localStorage.setItem(STORAGE_KEYS.assignedScenario, scenario);
}

function isSurveyCompleted() {
  return localStorage.getItem(STORAGE_KEYS.completed) === 'true';
}

function markSurveyCompleted() {
  localStorage.setItem(STORAGE_KEYS.completed, 'true');
}

function clearSurveyRuntimeData() {
  localStorage.removeItem(STORAGE_KEYS.answers);
  localStorage.removeItem(STORAGE_KEYS.assignedScenario);
}

function getLastSpotStorageKey(typeKey) {
  return `lastRecommendedSpot_${typeKey}`;
}

function pickRandomSpotForType(typeKey) {
  const spotIds = window.PERSONA_SPOT_MAP?.[typeKey] || [];

  if (!spotIds.length) {
    return {
      id: null,
      title: '尚未設定推薦景點',
      icon: '📍',
      detail: '這個人格目前還沒有綁定景點，請先到 results.js 設定 PERSONA_SPOT_MAP。'
    };
  }

  const lastSpotId = localStorage.getItem(getLastSpotStorageKey(typeKey));
  let availableSpotIds = [...spotIds];

  if (lastSpotId && spotIds.length > 1) {
    availableSpotIds = spotIds.filter(id => id !== lastSpotId);
  }

  const randomIndex = Math.floor(Math.random() * availableSpotIds.length);
  const selectedSpotId = availableSpotIds[randomIndex];
  const selectedSpot = window.SPOT_POOL?.[selectedSpotId];

  if (!selectedSpot) {
    return {
      id: selectedSpotId,
      title: `找不到景點資料：${selectedSpotId}`,
      icon: '⚠️',
      detail: '請檢查 results.js 的 SPOT_POOL 是否有這個景點編號。'
    };
  }

  localStorage.setItem(getLastSpotStorageKey(typeKey), selectedSpotId);

  return {
    id: selectedSpotId,
    ...selectedSpot
  };
}

function clearLastRecommendedSpots() {
  if (!window.RESULT_TYPES) return;
  Object.keys(window.RESULT_TYPES).forEach(typeKey => {
    localStorage.removeItem(getLastSpotStorageKey(typeKey));
  });
}

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  screens[name].classList.add('active');
}

function getCurrentPages() {
  return state.surveyPages || [];
}

function getCurrentPage() {
  return getCurrentPages()[state.currentPage];
}

function startSurvey() {
  if (isSurveyCompleted()) {
    alert('你已經完成填答囉，謝謝你的幫忙！');
    return;
  }

  if (!state.startTime) {
    state.startTime = Date.now();
  }

  state.currentPage = 0;
  state.surveyPages = state.scenario ? buildSurveyPages(state.scenario) : [window.SURVEY_SETS.shared.consent];
  showScreen('question');
  renderCurrentPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCurrentPage() {
  const page = getCurrentPage();
  if (!page) return;

  renderPageHeader(page);
  renderQuestions(page);
  updateNavigation(page);
  updateProgress();
}

function getGeometryByType(type) {
  if (type === 'mind') {
    return `<div class="context-icon mind"></div>`;
  }

  if (type === 'motive') {
    return `<div class="context-icon motive"></div>`;
  }

  return `
    <div class="cover-geometry small">
      <div class="geo-layer geo-bg"></div>
      <div class="geo-layer geo-wave"></div>
      <div class="geo-layer geo-card"></div>
      <div class="geo-layer geo-face"></div>
      <div class="geo-layer geo-dot dot-a"></div>
      <div class="geo-layer geo-dot dot-b"></div>
    </div>
  `;
}

function renderPageHeader(page) {
  const html = [];

  if (page.type === 'scenarioIntro') {
    html.push(`
      <div class="scenario-intro-card">
        <div class="scenario-intro-image-wrap">
          <img
            src="${page.scenarioImage}"
            alt="${page.scenarioAlt || page.scenarioTitle || '情境圖片'}"
            class="scenario-intro-image"
          />
        </div>

        <div class="scenario-intro-content">
          <h2 class="scenario-intro-title">${page.scenarioTitle || ''}</h2>
          ${(page.scenarioBody || []).map(text => `
            <p class="scenario-intro-text">${text}</p>
          `).join('')}
        </div>
      </div>
    `);

    elements.pageHeader.innerHTML = html.join('');
    return;
  }

  if (page.pageIntroLayout === 'cinema') {
    html.push(`
      <div class="context-card-simple">
        <div class="context-icon-wrap">
          ${getGeometryByType(page.iconType)}
        </div>
        <div class="context-content">
          ${page.sectionLabel ? `<div class="context-badge">${page.sectionLabel}</div>` : ''}
          <h2 class="context-main-title">${page.contextText || ''}</h2>
          <p class="context-sub">${page.introText || ''}</p>
        </div>
      </div>
    `);
  } else {
    if (page.encouragement) {
      html.push(`<div class="encouragement-box">${page.encouragement}</div>`);
    }
    if (page.introTitle) {
      html.push(`<h2 class="page-intro-title">${page.introTitle}</h2>`);
    }
    if (page.introText) {
      html.push(`<p class="page-intro-text">${page.introText}</p>`);
    }
  }

  elements.pageHeader.innerHTML = html.join('');
}

function renderQuestions(page) {
  if (page.type === 'consent' || page.type === 'scenarioIntro') {
    elements.questionList.innerHTML = '';
    return;
  }

  const html = [];

  page.questions.forEach((question, index) => {
    if (page.dividerAfter !== undefined && index === page.dividerAfter) {
      html.push(`<div class="question-divider">${page.dividerText || ''}</div>`);
    }

    html.push(`
      <article class="question-card">
        <p class="question-text">${index + 1}. ${question.text}</p>
        ${question.type === 'likert' ? renderLikert(question) : renderChoice(question)}
      </article>
    `);
  });

  elements.questionList.innerHTML = html.join('');
  bindQuestionEvents(page);
}

function renderLikert(question) {
  return `
    <div class="option-grid likert-grid" data-question-id="${question.id}">
      ${APP_CONFIG.likertLabels.map((label, idx) => {
        const value = idx + 1;
        const selected = Number(state.answers[question.id]) === value ? 'selected' : '';
        return `
          <button type="button" class="option-pill ${selected}" data-question-id="${question.id}" data-value="${value}">
            <span class="pill-number">${value}</span>
            <span class="pill-label">${label}</span>
          </button>
        `;
      }).join('')}
    </div>
  `;
}

function renderChoice(question) {
  return `
    <div class="option-grid choice-grid" data-question-id="${question.id}">
      ${question.options.map(option => {
        const selected = state.answers[question.id] === option ? 'selected' : '';
        return `
          <button type="button" class="choice-card ${selected}" data-question-id="${question.id}" data-value="${option}">
            ${option}
          </button>
        `;
      }).join('')}
    </div>
  `;
}

function bindQuestionEvents(page) {
  elements.questionList.querySelectorAll('[data-question-id][data-value]').forEach(button => {
    button.addEventListener('click', () => {
      const { questionId, value } = button.dataset;
      state.answers[questionId] = isLikertPage(page, questionId) ? Number(value) : value;
      saveAnswers();
      renderQuestions(page);
    });
  });
}

function isLikertPage(page, questionId) {
  if (!page.questions) return false;
  const q = page.questions.find(item => item.id === questionId);
  return q?.type === 'likert';
}

function updateNavigation(page) {
  elements.prevBtn.style.visibility = state.currentPage === 0 ? 'hidden' : 'visible';

  let label = page.submitLabel || '下一頁';

  if (page.type === 'consent') {
    label = '我已閱讀並同意，開始填答';
  }

  elements.nextBtn.disabled = false;
  elements.nextBtn.textContent = label;
}

function updateProgress() {
  const page = getCurrentPage();

  if (!page || page.type === 'consent') {
    elements.progressWrap.classList.add('hidden');
    return;
  }

  elements.progressWrap.classList.remove('hidden');

  const current = state.currentPage;
  const total = getCurrentPages().length - 1;
  const percent = Math.round((current / total) * 100);

  elements.progressPageText.textContent = `第 ${current} / ${total} 頁`;
  elements.progressPercentText.textContent = `${percent}%`;
  elements.progressFill.style.width = `${percent}%`;
}

function validateCurrentPage() {
  const page = getCurrentPage();

  if (!page || page.type === 'consent' || page.type === 'scenarioIntro') {
    return true;
  }

  const missing = page.questions.filter(
    q => state.answers[q.id] === undefined || state.answers[q.id] === ''
  );

  if (missing.length) {
    alert('這一頁還有題目沒有作答喔，先幫我把它填完～');
    return false;
  }

  return true;
}

function previousPage() {
  if (state.currentPage > 0) {
    state.currentPage -= 1;
    renderCurrentPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

async function nextPage() {
  if (!validateCurrentPage()) return;

  const pages = getCurrentPages();
  const page = getCurrentPage();

  if (!page) return;

  if (page.type === 'consent' && !state.scenario) {
    elements.nextBtn.disabled = true;
    elements.nextBtn.textContent = '分派情境中...';

    try {
      const assignedScenario = await fetchScenarioAssignment();
      saveAssignedScenario(assignedScenario);
      state.surveyPages = buildSurveyPages(assignedScenario);
      state.currentPage = 1;
      renderCurrentPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('情境分派失敗', error);
      elements.nextBtn.disabled = false;
      elements.nextBtn.textContent = '我已閱讀並同意，開始填答';
      alert('情境分派失敗：' + error.message);
    }

    return;
  }

  if (state.currentPage === pages.length - 1) {
    if (state.isSubmitting) return;

    state.isSubmitting = true;
    elements.nextBtn.disabled = true;
    elements.nextBtn.textContent = '送出中...';

    try {
      const submittedAt = new Date();
      const startedAt = state.startTime ? new Date(state.startTime) : submittedAt;
      const durationSeconds = Math.round((submittedAt.getTime() - startedAt.getTime()) / 1000);

      state.answers.started_at = startedAt.toISOString();
      state.answers.submitted_at = submittedAt.toISOString();
      state.answers.duration_seconds = durationSeconds;

      state.result = calculateResult();
      saveAnswers();
      await submitSurvey();
      markSurveyCompleted();
      clearSurveyRuntimeData();
      renderResultPage();
      showScreen('result');
      elements.progressWrap.classList.add('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('送出失敗', error);
      state.isSubmitting = false;
      elements.nextBtn.disabled = false;
      elements.nextBtn.textContent = '查看測驗結果';
      alert('送出失敗：' + error.message);
    }

    return;
  }

  state.currentPage += 1;
  renderCurrentPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function average(ids) {
  const values = ids
    .map(id => Number(state.answers[id]))
    .filter(v => !Number.isNaN(v));

  if (!values.length) return 0;

  const sum = values.reduce((total, current) => total + current, 0);
  return Number((sum / values.length).toFixed(2));
}

function calculateResult() {
  const physicalScore = average(['PHB_D_1', 'PHB_D_3', 'PHB_E_1', 'PHB_E_2', 'PHB_E_3']);
  const independentScore = average(['IND1', 'IND2', 'IND3', 'IND4', 'IND5', 'IND6']);
  const interdependentScore = average(['INT1', 'INT2', 'INT3', 'INT4', 'INT5', 'INT6']);
  const utilitarianScore = average(['UT1', 'UT2', 'UT3', 'UT4']);
  const selfNurturingScore = average(['EG1', 'EG2', 'EG3', 'EG4']);
  const territorialityScore = average(['PT1', 'PT2', 'PT3', 'PT4']);
  const hedonicScore = average(['PE1', 'PE2', 'PE3']);
  const soloPsychologyScore = average([
    'PSB_D_1', 'PSB_D_2', 'PSB_D_3',
    'PSB_I_1', 'PSB_I_2', 'PSB_I_3',
    'PSB_U_1', 'PSB_U_2', 'PSB_U_3'
  ]);
  const behavioralIntentionScore = average(['SDI1', 'SDI2', 'SDI3', 'SDI4']);

  const physical = physicalScore >= APP_CONFIG.thresholds.physicalHighCutoff ? 'high' : 'low';
  const self = independentScore >= interdependentScore ? 'independent' : 'interdependent';
  const motive = utilitarianScore >= selfNurturingScore ? 'utilitarian' : 'selfNurturing';

  const typeKey = `${physical}-${self}-${motive}`;
  const typeData = RESULT_TYPES[typeKey];
  const recommendation = pickRandomSpotForType(typeKey);

  return {
    typeKey,
    typeData,
    recommendation,
    scores: {
      physicalScore,
      independentScore,
      interdependentScore,
      utilitarianScore,
      selfNurturingScore,
      territorialityScore,
      hedonicScore,
      soloPsychologyScore,
      behavioralIntentionScore,
      independentDiff: Number((independentScore - interdependentScore).toFixed(2)),
      motiveDiff: Number((utilitarianScore - selfNurturingScore).toFixed(2))
    },
    labels: { physical, self, motive }
  };
}

function renderResultPage() {
  const { typeData, scores, recommendation } = state.result;

  elements.resultCard.innerHTML = `
    <div class="result-hero">
      <div class="result-text-main">
        <h1 class="result-name">${typeData.name}</h1>
        <p class="result-combo">${typeData.combo}</p>
        <p class="result-tag">${typeData.shortTag}</p>
      </div>
      <div class="result-image-wrap">
        <div class="result-geometry ${typeData.geometryType}"></div>
      </div>
    </div>

    <section class="result-section description-card">
      <h2 class="section-title">你有時候會這樣覺得</h2>
      <p class="result-description">${typeData.description}</p>
    </section>

    <section class="result-section recommend-card">
      <div class="recommend-heading-row">
        <h2 class="section-title">這週去哪！</h2>
        <span class="recommend-icon">${recommendation.icon}</span>
      </div>
      <div class="spot-card">
        <div class="spot-illustration">📍</div>
        <div>
          <h3 class="spot-title">${recommendation.title}</h3>
          <p class="spot-detail">${recommendation.detail}</p>
        </div>
      </div>
    </section>

    <section class="result-section score-mini-card">
      <h2 class="section-title">這次的判斷依據</h2>
      <div class="score-chips">
        <span class="score-chip">實體邊界 ${scores.physicalScore}</span>
        <span class="score-chip">獨立 ${scores.independentScore}</span>
        <span class="score-chip">相依 ${scores.interdependentScore}</span>
        <span class="score-chip">功利 ${scores.utilitarianScore}</span>
        <span class="score-chip">自我滋養 ${scores.selfNurturingScore}</span>
      </div>
    </section>

    <div class="result-actions">
      <button id="go-home-btn" class="primary-button large" type="button">返回首頁</button>
      <button id="share-btn" class="ghost-button large" type="button">傳連結給好友</button>
    </div>
  `;

  document.getElementById('go-home-btn').addEventListener('click', goHomeAfterFinish);
  document.getElementById('share-btn').addEventListener('click', shareSurvey);
}

function goHomeAfterFinish() {
  showScreen('cover');
  updateCoverState();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shareSurvey() {
  const shareData = {
    title: document.title,
    text: '來測測看你的 HAPPY 型人格！',
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
    return;
  }

  navigator.clipboard.writeText(window.location.href)
    .then(() => alert('連結已複製！快傳給朋友吧～'))
    .catch(() => alert('目前無法自動複製，請手動複製網址分享。'));
}

async function fetchScenarioAssignment() {
  if (!APP_CONFIG.backend.enabled || !APP_CONFIG.backend.googleScriptUrl) {
    throw new Error('後台未啟用或網址未設定');
  }

  const url = `${APP_CONFIG.backend.googleScriptUrl}?action=assign`;
  const response = await fetch(url, { method: 'GET' });

  if (!response.ok) {
    throw new Error(`分派請求失敗：${response.status}`);
  }

  const result = await response.json();

  if (result.status !== 'success' || !result.scenario) {
    throw new Error(result.message || '後台沒有回傳有效情境');
  }

  return result.scenario;
}

async function submitSurvey() {
  if (!APP_CONFIG.backend.enabled || !APP_CONFIG.backend.googleScriptUrl) {
    return;
  }

  if (!state.scenario) {
    throw new Error('尚未取得 scenario');
  }

  const payload = {
    scenario: state.scenario,
    answers: state.answers
  };

  const response = await fetch(APP_CONFIG.backend.googleScriptUrl, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  const text = await response.text();
  console.log('submit raw response:', text);

  let result;
  try {
    result = JSON.parse(text);
  } catch (error) {
    throw new Error('後台回傳不是 JSON：' + text);
  }

  if (!response.ok) {
    throw new Error(`提交失敗：${response.status}`);
  }

  if (result.status !== 'success') {
    throw new Error(result.message || '後台回傳失敗');
  }
}

function updateCoverState() {
  if (isSurveyCompleted()) {
    elements.startBtn.textContent = '已完成填答';
    elements.startBtn.disabled = true;
    elements.startBtn.style.opacity = '0.7';
    elements.startBtn.style.cursor = 'not-allowed';
  } else {
    elements.startBtn.textContent = '開始測驗';
    elements.startBtn.disabled = false;
    elements.startBtn.style.opacity = '1';
    elements.startBtn.style.cursor = 'pointer';
  }
}

function initApp() {
  updateCoverState();
  showScreen('cover');

  elements.startBtn.addEventListener('click', startSurvey);
  elements.prevBtn.addEventListener('click', previousPage);
  elements.nextBtn.addEventListener('click', nextPage);
}

initApp();