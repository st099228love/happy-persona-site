const state = {
  currentPage: -1,
  answers: loadSavedAnswers(),
  result: null
};

const screens = {
  cover: document.getElementById('cover-screen'),
  question: document.getElementById('question-screen'),
  result: document.getElementById('result-screen')
};

const elements = {
  startBtn: document.getElementById('start-btn'),
  header: document.getElementById('page-header'),
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
    return JSON.parse(localStorage.getItem('happyPersonaAnswers')) || {};
  } catch (e) {
    return {};
  }
}

function saveAnswers() {
  localStorage.setItem('happyPersonaAnswers', JSON.stringify(state.answers));
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

function startSurvey() {
  state.currentPage = 0;
  showScreen('question');
  elements.progressWrap.classList.remove('hidden');
  renderCurrentPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCurrentPage() {
  const page = SURVEY_PAGES[state.currentPage];
  renderPageHeader(page);
  renderQuestions(page);
  updateNavigation(page);
  updateProgress();
}

function getGeometry(type) {

  if (type === 'mind') {
    return `
      <div class="cover-geometry small">
        <div class="geo-layer geo-bg"></div>
        <div class="geo-layer geo-wave mind-wave"></div>
        <div class="geo-layer geo-ring"></div>
        <div class="geo-layer geo-dot dot-a"></div>
        <div class="geo-layer geo-dot dot-b"></div>
      </div>
    `;
  }

  if (type === 'motive') {
    return `
      <div class="cover-geometry small">
        <div class="geo-layer geo-bg"></div>
        <div class="geo-layer geo-card motive-box"></div>
        <div class="geo-layer geo-dot dot-a"></div>
        <div class="geo-layer geo-dot dot-b"></div>
      </div>
    `;
  }

  // 預設（cinema）
  return `
    <div class="cover-geometry small">
      <div class="geo-layer geo-bg"></div>
      <div class="geo-layer geo-wave"></div>
      <div class="geo-layer geo-card"></div>
      <div class="geo-layer geo-face"></div>
    </div>
  `;
}

function renderPageHeader(page) {
  const html = [];

  if (page.pageIntroLayout === 'cinema') {
    html.push(`
      <div class="context-card-simple">
        <div class="context-icon-wrap">
        <div class="cover-geometry small">
          <div class="geo-layer geo-bg"></div>
          <div class="geo-layer geo-wave"></div>
          <div class="geo-layer geo-card"></div>
          <div class="geo-layer geo-face"></div>
          <div class="geo-layer geo-dot dot-a"></div>
          <div class="geo-layer geo-dot dot-b"></div>
        </div>
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

  elements.header.innerHTML = html.join('');
}

function renderQuestions(page) {
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
  const q = page.questions.find(item => item.id === questionId);
  return q?.type === 'likert';
}

function updateNavigation(page) {
  elements.prevBtn.style.visibility = state.currentPage === 0 ? 'hidden' : 'visible';
  elements.nextBtn.textContent = page.submitLabel || '下一頁';
}

function updateProgress() {
  const current = state.currentPage + 1;
  const total = SURVEY_PAGES.length;
  const percent = Math.round((current / total) * 100);

  elements.progressPageText.textContent = `第 ${current} / ${total} 頁`;
  elements.progressPercentText.textContent = `${percent}%`;
  elements.progressFill.style.width = `${percent}%`;
}

function validateCurrentPage() {
  const page = SURVEY_PAGES[state.currentPage];
  const missing = page.questions.filter(q => state.answers[q.id] === undefined || state.answers[q.id] === '');

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

  if (state.currentPage === SURVEY_PAGES.length - 1) {
    state.result = calculateResult();
    saveAnswers();
    await submitSurvey();
    renderResultPage();
    showScreen('result');
    elements.progressWrap.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  state.currentPage += 1;
  renderCurrentPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function average(ids) {
  const values = ids.map(id => Number(state.answers[id])).filter(v => !Number.isNaN(v));
  if (!values.length) return 0;
  const sum = values.reduce((total, current) => total + current, 0);
  return Number((sum / values.length).toFixed(2));
}

function calculateResult() {
  const physicalScore = average(['pb1', 'pb2', 'pb3', 'pb4', 'pb5', 'pb6', 'pb7', 'pb8', 'pb9', 'pb10']);
  const independentScore = average(['sc1', 'sc2', 'sc3', 'sc4', 'sc5', 'sc6']);
  const interdependentScore = average(['sc7', 'sc8', 'sc9', 'sc10', 'sc11', 'sc12']);
  const utilitarianScore = average(['m1', 'm2', 'm3', 'm4']);
  const selfNurturingScore = average(['m5', 'm6', 'm7', 'm8']);
  const territorialityScore = average(['th1', 'th2', 'th3', 'th4']);
  const hedonicScore = average(['th5', 'th6', 'th7']);
  const soloPsychologyScore = average(['pc1', 'pc2', 'pc3', 'pc4', 'pc5', 'pc6', 'pc7', 'pc8', 'pc9']);
  const behavioralIntentionScore = average(['bi1', 'bi2', 'bi3', 'bi4']);

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
      <button id="restart-btn" class="primary-button large" type="button">重新測驗</button>
      <button id="share-btn" class="ghost-button large" type="button">傳連結給好友</button>
    </div>
  `;

  document.getElementById('restart-btn').addEventListener('click', restartSurvey);
  document.getElementById('share-btn').addEventListener('click', shareSurvey);
}

function restartSurvey() {
  localStorage.removeItem('happyPersonaAnswers');
  clearLastRecommendedSpots();
  state.answers = {};
  state.result = null;
  state.currentPage = -1;
  showScreen('cover');
  elements.progressWrap.classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function shareSurvey() {
  const text = '我剛測完這個人格測驗，你也來測測看 👀';
  const url = window.location.href;

  if (navigator.share) {
    try {
      await navigator.share({ title: APP_CONFIG.appTitle, text, url });
    } catch (error) {}
  } else {
    await navigator.clipboard.writeText(url);
    alert('連結已複製，可以直接傳給朋友了！');
  }
}

async function submitSurvey() {
  if (!APP_CONFIG.backend.enabled || !APP_CONFIG.backend.googleScriptUrl) return;

  const payload = {
    submittedAt: new Date().toISOString(),
    resultType: state.result.typeData.name,
    typeKey: state.result.typeKey,
    recommendedSpotId: state.result.recommendation?.id || '',
    recommendedSpotTitle: state.result.recommendation?.title || '',
    labels: state.result.labels,
    scores: state.result.scores,
    answers: state.answers
  };

  try {
    await fetch(APP_CONFIG.backend.googleScriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.warn('後台送出失敗', error);
  }
}

elements.startBtn.addEventListener('click', startSurvey);
elements.prevBtn.addEventListener('click', previousPage);
elements.nextBtn.addEventListener('click', nextPage);