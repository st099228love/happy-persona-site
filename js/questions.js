window.SURVEY_SETS = {
  shared: {
    consent: {
      id: 'consent',
      progressText: '',
      pageIntroLayout: 'text',
      introTitle: '填答說明',
      introText: `
        親愛的受試者，您好：<br><br>
        感謝您撥冗填寫本研究問卷。<br><br>

        本研究為國立成功大學企業管理學研究所之學術研究，
        旨在探討個體於「獨自參與娛樂活動」情境中的空間感知、
        心理感受與行為意圖。<br><br>

        本問卷採匿名方式蒐集資料，僅供學術研究使用，
        不涉及任何商業用途。<br><br>

        填寫時間約5-8分鐘，請依直覺作答。<br><br>

        若有疑問，歡迎聯繫研究人員。<br><br>

        國立成功大學 企業管理學研究所<br>
        指導教授：黃瀞瑩 教授<br>
        研究生：羅珮紓<br>
        聯絡信箱：r46134070@gs.ncku.edu.tw
      `,
      type: 'consent'
    },

    selfConstrual: {
      id: 'self-construal',
      progressText: '第 7 / 8 頁',
      pageIntroLayout: 'cinema',
      contextText: '接下來想了解你的個性與待人處事的方式',
      introText: '這頁題目比較多，請不要打我😭',
      iconType: 'motive',
      questions: [
        { id: 'IND1', type: 'likert', text: '我覺得保持活躍的想像力很重要。', dimension: 'independent' },
        { id: 'IND2', type: 'likert', text: '當我被單獨表揚時，我感到很自然。', dimension: 'independent' },
        { id: 'IND3', type: 'likert', text: '我願意在公眾場合表達自己的意見。', dimension: 'independent' },
        { id: 'IND4', type: 'likert', text: '我覺得擁有獨特的個性很重要。', dimension: 'independent' },
        { id: 'IND5', type: 'likert', text: '我很開心自己與他人不同。', dimension: 'independent' },
        { id: 'IND6', type: 'likert', text: '當我認識新的人時，我傾向表現得直接坦率。', dimension: 'independent' },

        { id: 'INT1', type: 'likert', text: '我會尊重與我有互動的權威人物。（例如：老師、主管或長輩）', dimension: 'interdependent' },
        { id: 'INT2', type: 'likert', text: '我認為團體內的和諧是重要的。', dimension: 'interdependent' },
        { id: 'INT3', type: 'likert', text: '我尊重謙遜的人。', dimension: 'interdependent' },
        { id: 'INT4', type: 'likert', text: '我覺得尊重集體決策很重要。', dimension: 'interdependent' },
        { id: 'INT5', type: 'likert', text: '我願意為我所屬的團體犧牲自己的利益。', dimension: 'interdependent' },
        { id: 'INT6', type: 'likert', text: '我覺得維持與他人的和諧關係非常重要。', dimension: 'interdependent' }
      ],
      dividerAfter: 6,
      dividerText: '以下是關於你與他人互動的看法'
    },

    demographics: {
      id: 'demographics',
      progressText: '第 8 / 8 頁',
      pageIntroLayout: 'cinema',
      contextText: '最後請讓我們更了解你一點點就好',
      introText: '完成後即可查看結果',
      iconType: 'cinema',
      submitLabel: '查看測驗結果',
      questions: [
        { id: 'd1', type: 'choice', text: '請問您的性別為何？', options: ['男性', '女性', '其他'] },
        { id: 'd2', type: 'choice', text: '請問您的年齡為何？', options: ['14–29歲', '30–45歲', '46–61歲', '62–80歲'] },
        { id: 'd3', type: 'choice', text: '請問您的最高教育程度為何？', options: ['高中（含）以下', '大學（含專科）', '研究所以上'] },
        { id: 'd4', type: 'choice', text: '請問您目前主要居住地區為何？', options: ['北部', '中部', '南部', '東部與離島'] },
        { id: 'd5', type: 'choice', text: '請問您的職業為何？', options: ['學生', '上班族', '自由業', '待業中', '其他'] },
        { id: 'd6', type: 'choice', text: '請問您目前的居住型態為何？', options: ['與家人同住', '與伴侶同住', '與朋友同住', '獨居', '其他'] },
        { id: 'd7', type: 'choice', text: '請問您是否曾有「獨自參與娛樂活動」（例如：看電影、逛市集等）的經驗？', options: ['有', '沒有'] },
        { id: 'd8', type: 'choice', text: '請問您「獨自參與娛樂活動」的頻率為何？', options: ['幾乎沒有', '偶爾', '有時', '經常'] }
      ]
    }
  },

  movie: {
    scenarioPages: [
      {
        id: 'scenario-intro',
        type: 'scenarioIntro',
        progressText: '第 1 / 8 頁',
        submitLabel: '開始作答',
        scenarioImage: 'images/movie-scenario.png',
        scenarioAlt: '電影院情境示意圖',
        scenarioTitle: '請想像以下情境：',
        scenarioBody: [
          '今天你一個人來到電影院，準備看一場電影。',
          '你已進入影廳並來到自己的座位附近，周圍也有其他觀眾正在入座或等待電影開始。',
          '請先不要考慮電影內容，而是根據自己在這樣的觀影環境中可能的感受與想法，回答以下問題。'
        ]
      },
      {
        id: 'physical-boundary',
        progressText: '第 2 / 8 頁',
        pageIntroLayout: 'cinema',
        contextText: '今天你一個人來到電影院，準備看一場電影。',
        introText: '請你試想在這樣的環境中，你的想法與感受',
        iconType: 'cinema',
        questions: [
          { id: 'PHB_D_1', type: 'likert', text: '我在意自己與其他觀眾之間保有適當的距離。', dimension: 'physicalBoundary' },
          { id: 'PHB_D_3', type: 'likert', text: '我在意座位之間的走道與排距可不可以自在進出。', dimension: 'physicalBoundary' },
          { id: 'PHB_E_1', type: 'likert', text: '我在意座位周邊有足夠空間供我放個人物品。（例如：包包、飲料或外套）', dimension: 'physicalBoundary' },
          { id: 'PHB_E_2', type: 'likert', text: '我不希望與旁邊觀眾共用空間（例如：一邊的扶手或放包包）。', dimension: 'physicalBoundary' },
          { id: 'PHB_E_3', type: 'likert', text: '我希望座位周邊的空間是屬於我個人使用的。（例如：一邊的扶手或放包包）', dimension: 'physicalBoundary' }
        ]
      },
      {
        id: 'psychological-acceptance',
        progressText: '第 3 / 8 頁',
        pageIntroLayout: 'cinema',
        contextText: '接下來想了解你對一個人看電影的感受',
        introText: '請照直覺回答就行',
        iconType: 'cinema',
        questions: [
          { id: 'PSB_D_1', type: 'likert', text: '我認為看電影是適合一個人娛樂的方式。', dimension: 'soloPsychology' },
          { id: 'PSB_D_2', type: 'likert', text: '就一個人娛樂而言，我很難想到有比獨自看電影更好的活動。', dimension: 'soloPsychology' },
          { id: 'PSB_D_3', type: 'likert', text: '當我想一個人娛樂時，看電影通常會是我的選擇。', dimension: 'soloPsychology' },
          { id: 'PSB_I_1', type: 'likert', text: '我對獨自看電影感到熟悉。', dimension: 'soloPsychology' },
          { id: 'PSB_I_2', type: 'likert', text: '獨自看電影讓我感到歸屬感。', dimension: 'soloPsychology' },
          { id: 'PSB_I_3', type: 'likert', text: '獨自看電影是我生活的一部分。', dimension: 'soloPsychology' },
          { id: 'PSB_U_1', type: 'likert', text: '我不會因為其他觀眾的目光而感到不舒服。', dimension: 'soloPsychology' },
          { id: 'PSB_U_2', type: 'likert', text: '當其他人注意到我一個人看電影時，我感到自在，不會尷尬。', dimension: 'soloPsychology' },
          { id: 'PSB_U_3', type: 'likert', text: '我不會覺得其他觀眾會因為我是一個人看電影，而用帶有同情或特別意味的眼光看我。', dimension: 'soloPsychology' }
        ]
      },
      {
        id: 'territoriality-hedonics',
        progressText: '第 4 / 8 頁',
        pageIntroLayout: 'cinema',
        contextText: '接下來想了解你在電影院中，是否有覺得是自己的空間',
        introText: '請照直覺回答就行',
        iconType: 'mind',
        questions: [
          { id: 'PT1', type: 'likert', text: '我覺得自己座位周圍有足夠且不容易被打擾的個人空間。', dimension: 'territoriality' },
          { id: 'PT2', type: 'likert', text: '我覺得自己擁有足夠的個人空間。', dimension: 'territoriality' },
          { id: 'PT3', type: 'likert', text: '我覺得自己的座位是屬於我的個人空間。', dimension: 'territoriality' },
          { id: 'PT4', type: 'likert', text: '當座位及周邊使用空間是明確供我個人使用時，會讓我感到安心。（例如：放飲料、包包、不用共用扶手）', dimension: 'territoriality' },
          { id: 'PE1', type: 'likert', text: '獨自看電影是愉快的。', dimension: 'hedonic' },
          { id: 'PE2', type: 'likert', text: '獨自看電影讓我感到平靜。', dimension: 'hedonic' },
          { id: 'PE3', type: 'likert', text: '獨自看電影讓我感到輕鬆。', dimension: 'hedonic' }
        ]
      },
      {
        id: 'behavior-intention',
        progressText: '第 5 / 8 頁',
        pageIntroLayout: 'cinema',
        contextText: '接下來想了解你對「獨自看電影」的行動意願',
        introText: '你已經完成一大半了，謝謝你的耐心填寫！',
        iconType: 'mind',
        questions: [
          { id: 'SDI1', type: 'likert', text: '我認為獨自看電影是可以接受的娛樂方式。', dimension: 'behavioralIntention' },
          { id: 'SDI2', type: 'likert', text: '如果有機會，我願意獨自去看電影。', dimension: 'behavioralIntention' },
          { id: 'SDI3', type: 'likert', text: '我想要獨自看電影。', dimension: 'behavioralIntention' },
          { id: 'SDI4', type: 'likert', text: '如果有人想一個人看電影，我會推薦他這樣做。', dimension: 'behavioralIntention' }
        ]
      },
      {
        id: 'motivation',
        progressText: '第 6 / 8 頁',
        pageIntroLayout: 'cinema',
        contextText: '接下來想了解你選擇一個人看電影的原因',
        introText: '非常感謝你的協助...快要結束了!!',
        iconType: 'motive',
        questions: [
          { id: 'UT1', type: 'likert', text: '獨自看電影讓我感到比較輕鬆。', dimension: 'utilitarian' },
          { id: 'UT2', type: 'likert', text: '當我獨自看電影時，我可以自由決定何時去看、看哪一部。', dimension: 'utilitarian' },
          { id: 'UT3', type: 'likert', text: '有時候我和朋友對電影的偏好不太相同，因此我會選擇一個人去看。（例如：我想看劇情片，但對方想看動作片；或我想慢慢選要看哪部，但對方很急。）', dimension: 'utilitarian' },
          { id: 'UT4', type: 'likert', text: '獨自看電影時，我不需要顧慮他人的需求。（例如：選片、時間）', dimension: 'utilitarian' },
          { id: 'EG1', type: 'likert', text: '獨自看電影讓我感到快樂。', dimension: 'selfNurturing' },
          { id: 'EG2', type: 'likert', text: '我比較喜歡獨自看電影時的自己。', dimension: 'selfNurturing' },
          { id: 'EG3', type: 'likert', text: '獨自看電影讓我感到自由。', dimension: 'selfNurturing' },
          { id: 'EG4', type: 'likert', text: '獨自看電影讓我感到充實。', dimension: 'selfNurturing' }
        ]
      }
    ]
  },

  weekend: {
    scenarioPages: [
      {
        id: 'scenario-intro',
        type: 'scenarioIntro',
        progressText: '第 1 / 8 頁',
        submitLabel: '開始作答',
        scenarioImage: 'images/weekend-scenario.png',
        scenarioAlt: '城市周末活動情境示意圖',
        scenarioTitle: '請想像以下情境：',
        scenarioBody: [
          '今天是週末，你一個人去城市裡的戶外活動。',
          '那裡有很多攤位、吃的東西、表演和可以逛逛拍照的地方，也有不少人在現場走動、停留、聊天或休息。你可以自己決定要去哪裡、停多久、要不要看表演、吃東西或繼續逛。',
          '以下我們簡稱上述活動為<span class="scenario-keyword">城市周末活動</span>，請根據這樣的情境，回答以下問題。'
        ]
      },
      {
        id: 'physical-boundary',
        progressText: '第 2 / 8 頁',
        pageIntroLayout: 'cinema',
        contextText: '想像今天你一個人去了一場城市週末活動',
        introText: '有很多攤位、吃的東西、表演和可以逛逛拍照的地方',
        iconType: 'cinema',
        questions: [
          { id: 'PHB_D_1', type: 'likert', text: '我在意自己與周圍其他人之間保有適當的距離。', dimension: 'physicalBoundary' },
          { id: 'PHB_D_3', type: 'likert', text: '我在意活動場地的走道與動線可不可以自在移動。', dimension: 'physicalBoundary' },
          { id: 'PHB_E_1', type: 'likert', text: '我在意活動現場有足夠空間供我個人使用（例如：休息區、看表演時）。', dimension: 'physicalBoundary' },
          { id: 'PHB_E_2', type: 'likert', text: '我不希望與他人共用休息區或看表演的空間。', dimension: 'physicalBoundary' },
          { id: 'PHB_E_3', type: 'likert', text: '我希望活動現場有空間可供我個人單獨使用或停留（例如：休息區、看表演時）。', dimension: 'physicalBoundary' }
        ]
      },
      {
        id: 'psychological-acceptance',
        progressText: '第 3 / 8 頁',
        pageIntroLayout: 'cinema',
        contextText: '接下來想了解你對一個人參與城市週末活動的感受',
        introText: '請照直覺回答就行',
        iconType: 'cinema',
        questions: [
          { id: 'PSB_D_1', type: 'likert', text: '我認為參與城市週末活動是適合一個人娛樂的方式。', dimension: 'soloPsychology' },
          { id: 'PSB_D_2', type: 'likert', text: '就一個人娛樂而言，我很難想到有比獨自城市週末活動更好的活動。', dimension: 'soloPsychology' },
          { id: 'PSB_D_3', type: 'likert', text: '當我想要一個人娛樂時，城市週末活動通常會是我的選擇。', dimension: 'soloPsychology' },
          { id: 'PSB_I_1', type: 'likert', text: '我對獨自參與城市週末活動感到熟悉。', dimension: 'soloPsychology' },
          { id: 'PSB_I_2', type: 'likert', text: '獨自參與城市週末活動讓我感到歸屬感。', dimension: 'soloPsychology' },
          { id: 'PSB_I_3', type: 'likert', text: '獨自參加城市週末活動是我生活的一部分。', dimension: 'soloPsychology' },
          { id: 'PSB_U_1', type: 'likert', text: '我不會因為其他人的目光而感到不舒服。', dimension: 'soloPsychology' },
          { id: 'PSB_U_2', type: 'likert', text: '當其他人注意到我一個人參與活動時，我感到自在，不會尷尬。', dimension: 'soloPsychology' },
          { id: 'PSB_U_3', type: 'likert', text: '我不會覺得其他人會因為我是一個人參與活動，而用帶有同情或特別意味的眼光看我。', dimension: 'soloPsychology' }
        ]
      },
      {
        id: 'territoriality-hedonics',
        progressText: '第 4 / 8 頁',
        pageIntroLayout: 'cinema',
        contextText: '接下來想了解你在活動現場中，是否有覺得是自己的空間',
        introText: '請照直覺回答就行',
        iconType: 'mind',
        questions: [
          { id: 'PT1', type: 'likert', text: '我覺得自己周圍有足夠且不容易被打擾的空間可以參與活動。', dimension: 'territoriality' },
          { id: 'PT2', type: 'likert', text: '我覺得自己擁有足夠的個人空間。', dimension: 'territoriality' },
          { id: 'PT3', type: 'likert', text: '我覺得自己所在的空間是屬於我的個人空間。', dimension: 'territoriality' },
          { id: 'PT4', type: 'likert', text: '當活動現場有明確供我個人停留或使用的空間時，會讓我感到安心。（例如：休息區、看表演時的位置）', dimension: 'territoriality' },
          { id: 'PE1', type: 'likert', text: '獨自參與城市週末活動是愉快的。', dimension: 'hedonic' },
          { id: 'PE2', type: 'likert', text: '獨自參與城市週末活動讓我感到平靜。', dimension: 'hedonic' },
          { id: 'PE3', type: 'likert', text: '獨自參與城市週末活動讓我感到輕鬆。', dimension: 'hedonic' }
        ]
      },
      {
        id: 'behavior-intention',
        progressText: '第 5 / 8 頁',
        pageIntroLayout: 'cinema',
        contextText: '接下來想了解你對「獨自參與城市週末活動」的行動意願',
        introText: '你已經完成一大半了，謝謝你的耐心填寫！',
        iconType: 'mind',
        questions: [
          { id: 'SDI1', type: 'likert', text: '我認為獨自參與城市週末活動是可以接受的娛樂方式。', dimension: 'behavioralIntention' },
          { id: 'SDI2', type: 'likert', text: '如果有機會，我願意獨自參與城市週末活動。', dimension: 'behavioralIntention' },
          { id: 'SDI3', type: 'likert', text: '我想要獨自去城市周末活動。', dimension: 'behavioralIntention' },
          { id: 'SDI4', type: 'likert', text: '如果有人想一個人參加城市週末活動，我會推薦他這樣做。', dimension: 'behavioralIntention' }
        ]
      },
      {
        id: 'motivation',
        progressText: '第 6 / 8 頁',
        pageIntroLayout: 'cinema',
        contextText: '接下來想了解你選擇一個人參與城市週末活動的原因',
        introText: '非常感謝你的協助...快要結束了!!',
        iconType: 'motive',
        questions: [
          { id: 'UT1', type: 'likert', text: '獨自去城市週末活動讓我感到比較輕鬆。', dimension: 'utilitarian' },
          { id: 'UT2', type: 'likert', text: '當我獨自參與城市週末活動時，我可以自由決定什麼時候去、去多久、要參與哪些活動。', dimension: 'utilitarian' },
          { id: 'UT3', type: 'likert', text: '有時候我和朋友對活動內容的偏好不太相同，因此我會選擇一個人參與。（例如：我想逛市集，但朋友比較想看表演；或我想慢慢逛攤位，但對方想走馬看花。）', dimension: 'utilitarian' },
          { id: 'UT4', type: 'likert', text: '獨自去城市週末活動時，我不需要顧慮他人的需求。（例如：行程安排、慢慢看還是看很快）', dimension: 'utilitarian' },
          { id: 'EG1', type: 'likert', text: '獨自參與城市週末活動讓我感到快樂。', dimension: 'selfNurturing' },
          { id: 'EG2', type: 'likert', text: '我比較喜歡獨自參與城市周末活動時的自己。', dimension: 'selfNurturing' },
          { id: 'EG3', type: 'likert', text: '獨自參與城市週末活動讓我感到自由。', dimension: 'selfNurturing' },
          { id: 'EG4', type: 'likert', text: '獨自參與城市周末活動讓我感到充實。', dimension: 'selfNurturing' }
        ]
      }
    ]
  }
};

window.buildSurveyPages = function (scenario) {
  const shared = window.SURVEY_SETS.shared;
  const scenarioSet = window.SURVEY_SETS[scenario];

  if (!scenarioSet) {
    console.error(`找不到情境設定：${scenario}`);
    return [
      shared.consent,
      shared.selfConstrual,
      shared.demographics
    ];
  }

  return [
    shared.consent,
    ...scenarioSet.scenarioPages,
    shared.selfConstrual,
    shared.demographics
  ];
};