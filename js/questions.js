window.SURVEY_PAGES = [
  {
    id: 'physical-boundary',
    progressText: '第 1 / 7 頁',
    pageIntroLayout: 'cinema',
    contextText: '想像今天晚上，你一個人走進電影院，準備看一場電影。',
    introText: '請依照你的感受評分　1 非常不同意｜2 不同意｜3 普通｜4 同意｜5 非常同意',
    iconType: 'cinema',

    questions: [
      { id: 'pb1', type: 'likert', text: '我希望我的座位與左右觀眾之間保有足夠的距離。', dimension: 'physicalBoundary' },
      { id: 'pb2', type: 'likert', text: '我在意我與前後排觀眾之間的座位間距，是否足夠。', dimension: 'physicalBoundary' },
      { id: 'pb3', type: 'likert', text: '我希望座位之間的走道與排距讓我可以自在進出。', dimension: 'physicalBoundary' },
      { id: 'pb4', type: 'likert', text: '我希望座位周邊有可放置個人物品的位置。（例如：包包、飲料或外套）', dimension: 'physicalBoundary' },
      { id: 'pb5', type: 'likert', text: '我希望不需要與旁邊觀眾共用空間或互相協調（例如：共用一邊扶手或置物空間）。', dimension: 'physicalBoundary' },
      { id: 'pb6', type: 'likert', text: '我希望座位周邊的空間是屬於我個人使用的（例如：扶手、置物空間等）。', dimension: 'physicalBoundary' },
      { id: 'pb7', type: 'likert', text: '電影院的空間讓我感到舒適。', dimension: 'physicalBoundary' },
      { id: 'pb8', type: 'likert', text: '電影院內的色彩搭配讓人感覺和諧。（例如：牆面、地毯、座椅）', dimension: 'physicalBoundary' },
      { id: 'pb9', type: 'likert', text: '電影院內的裝潢與設計元素看起來是和諧的。（例如：主題牆面、整體風格設計）', dimension: 'physicalBoundary' },
      { id: 'pb10', type: 'likert', text: '電影院的空間大小適合獨自看電影。', dimension: 'physicalBoundary' }
    ]
  },
  {
    id: 'psychological-acceptance',
    progressText: '第 2 / 7 頁',
    pageIntroLayout: 'cinema',
    contextText: '接下來想了解你對一個人看電影的感受',
    introText: '請照直覺回答就行',
    iconType: 'cinema',
    questions: [
      { id: 'pc1', type: 'likert', text: '我認為獨自看電影是適合一個人娛樂的方式。', dimension: 'soloPsychology' },
      { id: 'pc2', type: 'likert', text: '就一個人娛樂而言，我很難想到有比獨自看電影更好的活動。', dimension: 'soloPsychology' },
      { id: 'pc3', type: 'likert', text: '當我想一個人娛樂時，看電影通常會是我的選擇。', dimension: 'soloPsychology' },
      { id: 'pc4', type: 'likert', text: '我對獨自看電影這件事情感到熟悉。', dimension: 'soloPsychology' },
      { id: 'pc5', type: 'likert', text: '獨自看電影會讓我感到自在或有一種歸屬感。', dimension: 'soloPsychology' },
      { id: 'pc6', type: 'likert', text: '獨自看電影已經成為我生活的一部分。', dimension: 'soloPsychology' },
      { id: 'pc7', type: 'likert', text: '我不會特別在意其他觀眾是否注意到我。', dimension: 'soloPsychology' },
      { id: 'pc8', type: 'likert', text: '當其他觀眾注意到我一個人看電影時，我仍然感到自在。', dimension: 'soloPsychology' },
      { id: 'pc9', type: 'likert', text: '我不會覺得其他觀眾會因為我是一個人而特別看待我。', dimension: 'soloPsychology' }
    ]
  },
  {
    id: 'territoriality-hedonics',
    progressText: '第 3 / 7 頁',
    pageIntroLayout: 'cinema',
    contextText: '接下來想了解你在電影院中，是否有覺得是自己的空間',
    introText: '請照直覺回答就行',
    iconType: 'cinema',
    questions: [
      { id: 'th1', type: 'likert', text: '我覺得自己座位周圍有足夠且被保障的個人空間。', dimension: 'territoriality' },
      { id: 'th2', type: 'likert', text: '我覺得自己擁有足夠的個人空間。', dimension: 'territoriality' },
      { id: 'th3', type: 'likert', text: '我會覺得自己的座位是屬於我的個人空間。', dimension: 'territoriality' },
      { id: 'th4', type: 'likert', text: '當座位與設施（例如：放飲料、置物空間）是為我安排並由我使用時，我會感到安心與自在。', dimension: 'territoriality' },
      { id: 'th5', type: 'likert', text: '對我來說，獨自看電影是愉快的。', dimension: 'hedonic' },
      { id: 'th6', type: 'likert', text: '對我來說，獨自看電影讓我感到平靜。', dimension: 'hedonic' },
      { id: 'th7', type: 'likert', text: '對我來說，我獨自看電影時感到輕鬆自在。', dimension: 'hedonic' }
    ]
  },
  {
    id: 'behavior-intention',
    progressText: '第 4 / 7 頁',
    pageIntroLayout: 'cinema',
    contextText: '接下來想了解你對「獨自看電影」的行動意願',
    introText: '你已經完成一大半了，謝謝你的耐心填寫！',
    iconType: 'cinema',
    questions: [
      { id: 'bi1', type: 'likert', text: '我認為獨自看電影是可以接受的娛樂方式。', dimension: 'behavioralIntention' },
      { id: 'bi2', type: 'likert', text: '如果有機會，我願意獨自去看電影。', dimension: 'behavioralIntention' },
      { id: 'bi3', type: 'likert', text: '未來我有可能會選擇獨自去看電影。', dimension: 'behavioralIntention' },
      { id: 'bi4', type: 'likert', text: '如果有人想一個人看電影，我會推薦他這樣做。', dimension: 'behavioralIntention' }
    ]
  },
  {
    id: 'motivation',
    progressText: '第 5 / 7 頁',
    pageIntroLayout: 'cinema',
    contextText: '接下來想了解你選擇一個人看電影的原因',
    introText: '非常感謝你的協助...快要結束了!!',
    iconType: 'cinema',
    questions: [
      { id: 'm1', type: 'likert', text: '有時候和別人一起看電影反而我不覺得比較輕鬆。', dimension: 'utilitarian' },
      { id: 'm2', type: 'likert', text: '當我一個人看電影時，我可以自由決定何時去看、看哪一部。', dimension: 'utilitarian' },
      { id: 'm3', type: 'likert', text: '有時候我和朋友或家人想看的電影類型不太相同，因此我會選擇一個人看電影。', dimension: 'utilitarian' },
      { id: 'm4', type: 'likert', text: '我不需要顧慮或配合他人的需求。（例如選片、時間）', dimension: 'utilitarian' },
      { id: 'm5', type: 'likert', text: '獨自看電影會讓我感到快樂。', dimension: 'selfNurturing' },
      { id: 'm6', type: 'likert', text: '當我一個人看電影時，我會更喜歡自己現在的樣子。', dimension: 'selfNurturing' },
      { id: 'm7', type: 'likert', text: '獨自看電影會讓我感到自由。', dimension: 'selfNurturing' },
      { id: 'm8', type: 'likert', text: '當我一個人看電影時，我不會太在意其他觀眾如何看待我。', dimension: 'selfNurturing' }
    ],
    dividerAfter: 4,
    dividerText: '以下是關於你一個人看電影時的感受'
  },
  {
    id: 'self-construal',
    progressText: '第 6 / 7 頁',
    pageIntroLayout: 'cinema',
    contextText: '接下來想了解你的個性與待人處事的方式',
    introText: '這頁題目比較多，請不要打我😭',
    iconType: 'cinema',
    questions: [
      { id: 'sc1', type: 'likert', text: '保持活躍的想像力對我來說很重要。', dimension: 'independent' },
      { id: 'sc2', type: 'likert', text: '當我因表現優異而被特別表揚時，我感到很自然。', dimension: 'independent' },
      { id: 'sc3', type: 'likert', text: '我願意在公開場合表達自己的意見。', dimension: 'independent' },
      { id: 'sc4', type: 'likert', text: '擁有獨特的個性對我來說很重要。', dimension: 'independent' },
      { id: 'sc5', type: 'likert', text: '我很開心自己與他人不同，並擁有獨特性。', dimension: 'independent' },
      { id: 'sc6', type: 'likert', text: '當我與陌生人互動時，我傾向於直接坦率。', dimension: 'independent' },
      { id: 'sc7', type: 'likert', text: '我尊重與我互動的權威人物。', dimension: 'interdependent' },
      { id: 'sc8', type: 'likert', text: '我認為維持團體內的和諧是重要的。', dimension: 'interdependent' },
      { id: 'sc9', type: 'likert', text: '我尊重那些非常謙遜的人。', dimension: 'interdependent' },
      { id: 'sc10', type: 'likert', text: '尊重集體決策對我來說很重要。', dimension: 'interdependent' },
      { id: 'sc11', type: 'likert', text: '我願意為我所屬的團體犧牲自己的利益。', dimension: 'interdependent' },
      { id: 'sc12', type: 'likert', text: '維持與他人的和諧關係對我來說非常重要。', dimension: 'interdependent' }
    ],
    dividerAfter: 6,
    dividerText: '以下是關於你與他人互動的看法'
  },
  {
    id: 'demographics',
    progressText: '第 7 / 7 頁',
    pageIntroLayout: 'cinema',
    contextText: '最後請讓我們更了解你一點點就好',
    introText: '完成後即可查看結果',
    iconType: 'cinema',
    questions: [
      { id: 'd1', type: 'choice', text: '請問您的性別為何？', options: ['男性', '女性', '其他'] },
      { id: 'd2', type: 'choice', text: '請問您的年齡為何？', options: ['14–29歲', '30–45歲', '46–61歲', '62–80歲'] },
      { id: 'd3', type: 'choice', text: '請問您的最高教育程度為何？', options: ['高中（含）以下', '大學（含專科）', '研究所以上'] },
      { id: 'd4', type: 'choice', text: '請問您目前主要居住地區為何？', options: ['北部', '中部', '南部', '東部與離島'] },
      { id: 'd5', type: 'choice', text: '請問您的職業為何？', options: ['學生', '上班族', '自由業', '待業中', '其他'] },
      { id: 'd6', type: 'choice', text: '請問您目前的居住型態為何？', options: ['與家人同住', '與伴侶同住', '與朋友同住', '獨居', '其他'] },
      { id: 'd7', type: 'choice', text: '請問您是否曾有「獨自參與娛樂活動」（例如：看電影、逛市集等）的經驗？', options: ['有', '沒有'] },
      { id: 'd8', type: 'choice', text: '請問您「獨自參與娛樂活動」的頻率為何？', options: ['幾乎沒有', '偶爾', '有時', '經常'] }
    ],
    submitLabel: '查看測驗結果'
  }
];
