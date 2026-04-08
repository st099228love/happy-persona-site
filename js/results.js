window.RESULT_TYPES = {
  'high-independent-utilitarian': {
    key: 'high-independent-utilitarian',
    name: '掌控效率型',
    geometryType: 'geo-type-1',
    combo: '空間敏感型 × 自己作主 × 實用為主',
    shortTag: '計畫最好要趕得上變化',
    description: '你不太喜歡被打斷的感覺，尤其是在你已經想好今天要怎麼安排的時候。你不是不喜歡熱鬧，而是覺得等待、協調、配合，會很搞剛。當你一個人行動時，你會比較安心，因為事情能照自己的步調走，該看什麼、待多久、什麼時候離開，都很清楚。'
  },
  'high-independent-selfNurturing': {
    key: 'high-independent-selfNurturing',
    name: '自我充電型',
    geometryType: 'geo-type-2',
    combo: '個人空間 × 重視自己步調 × 療育',
    shortTag: '你需要專屬於你的me time!',
    description: '你很需要一段完全不被打擾的時間，尤其是在忙碌、內耗，或情緒很多的時候。你可能會發現，自己一個人反而比較容易放鬆。對你來說，獨處並不負面，反倒還挺舒服。'
  },
  'high-interdependent-utilitarian': {
    key: 'high-interdependent-utilitarian',
    name: '理性疏離型',
    geometryType: 'geo-type-3',
    combo: '在意他人關係 × 理性 × 行動效率',
    shortTag: '有時候一個人好像挺方便',
    description: '你不討厭人多，也很重視關係，只是有些時候你會覺得一個人比較簡單。當需要配合的地方變多時，你很容易先感到累，所以寧願自己來。這不是冷淡，而是一種很理性的選擇，你其實很知道什麼狀態比較適合現在的自己。'
  },
  'high-interdependent-selfNurturing': {
    key: 'high-interdependent-selfNurturing',
    name: '溫和退居型',
    geometryType: 'geo-type-4',
    combo: '重視連結感 × 容易察覺他人情緒 ',
    shortTag: '先慢下來，我才有力氣再靠近世界',
    description: '你其實很重視人和連結，只是有時候在關係裡待久了，會不自覺有點累。但你也不需要完全的抽離，而是給自己一段時間慢下來、好好睡到自然醒。對你來說，這是一種以退為進的應對方式。'
  },
  'low-independent-utilitarian': {
    key: 'low-independent-utilitarian',
    name: '自由行動型',
    geometryType: 'geo-type-5',
    combo: '自己最大! × 效率導向 × 對環境沒很挑',
    shortTag: '說走就走~我有的是時間',
    description: '你很享受不用被限制的感覺，尤其是在時間和行程上。當你一個人時，你可以隨時改變決定，這種彈性會讓你覺得很舒服。你也很可能發現，很多有趣的事，往往都是在沒有先規劃好的情況下自己跑出來的。'
  },
  'low-independent-selfNurturing': {
    key: 'low-independent-selfNurturing',
    name: '內在沉浸型',
    geometryType: 'geo-type-6',
    combo: '不太受外在干擾 × 自己的主人 × 自我充電',
    shortTag: '外面怎樣不是重點，我的內在always ok.',
    description: '你很能在自己的世界裡待著，即使旁邊有人，也不太容易被影響。對你來說，真正重要的不是外在環境多動盪，而是自己知不知道要往哪條路走。有時候你只需要一個地方坐下來，就能很專注、很平靜。'
  },
  'low-interdependent-utilitarian': {
    key: 'low-interdependent-utilitarian',
    name: '彈性社交型',
    geometryType: 'geo-type-7',
    combo: '去哪都OK × 重視關係 × 方便都好',
    shortTag: '有人很好，沒人也沒關係',
    description: '你其實蠻喜歡和人互動的，但同時也能接受一個人行動。你不會把自己綁死在某一種模式裡，有伴很開心，沒伴也不會覺得哪裡怪。這種彈性讓你在不同情境裡都能很自然地調整自己，所以你通常不太容易被侷限住。'
  },
  'low-interdependent-selfNurturing': {
    key: 'low-interdependent-selfNurturing',
    name: '柔性獨處型',
    geometryType: 'geo-type-8',
    combo: '對環境不敏感 × 重視陪伴 × 溫柔',
    shortTag: '我不是想完全一個人，我想要那種剛剛好的陪伴',
    description: '你不是真的想要完全一個人，而是比較喜歡那種「有人在，但不打擾」的感覺。有時候只要周圍有一點人群聲音，你反而更放鬆。你需要的不是孤立，而是一種背景式的陪伴感，讓你可以安靜做自己，但又不會覺得太空。'
  }
};

window.SPOT_POOL = {
  spot01: { title: '台南知事官邸逛逛＋曖寒光豆腐煲', icon: '🫶', detail: '先在知事官邸附近慢慢走走，再去吃一份熱熱的豆腐煲，整體節奏隨意，適合想把自己慢慢安頓下來的時候。' },
  spot02: { title: '赤崁樓餵魚＋武廟好好問個事', icon: '⛩️', detail: '魚飼料也可以去小北買，可以餵到自己開心。適合下課後一邊走、一邊想著晚餐要吃什麼的時候先餵魚放空，再到武廟把最近沒決定好的事情都速速KO。' },
  spot03: { title: '笑笑羊福爾摩沙酒店，純粹喜歡笑笑羊', icon: '🐑', detail: '如果你只是想單純去看自己喜歡的東西、被可愛療癒一下，但說實話大概也就半小時。' },
  spot04: { title: '成大綠色魔法學校看拚舟綠花園', icon: '🌿', detail: '台灣第一座綠建築，又有現代諾亞方舟之稱。一直以為這地標是被亂改，但沒想到他真的存在。希望你可以短暫看看新事物，看看綠意並浸泡在大自然的美麗之中。' },
  spot05: { title: '成大歷史文物博物館看瓷器＋成大消費合作社買短T', icon: '🏺', detail: '這種有明確目標、也有順手完成事情感的路線，很適合喜歡一趟出門有內容也有收穫的人。' },
  spot06: { title: '成大總圖古籍展覽＋3F-5F新空間＋品藏小館蛋沙拉吐司＋借《人類大歷史》', icon: '📚', detail: '這是一種可以安靜待很久、慢慢沉進自己節奏裡的行程。你可以看展、看書、坐著發呆，也可以讓時間過得很安靜。P.S.拜託一定要去看人類大歷史' },
  spot07: { title: '衛保組量 InBody＋了解 BK24 蒸汽火車歷史', icon: '🚂', detail: '免費inbody還不量嗎雖然這題限定成大人，但不是成大的朋友也希望你們都健健康康!這是一個適合喜歡清楚目的感的人的行程。' },
  spot08: { title: '成大學生會枕頭大戰4/11', icon: '🛏️', detail: '比較像是讓自己動起來、鬧一下、釋放一下能量的活動。很適合偶爾想換氣氛的人。' },
  spot09: { title: '青春放風曬生活市集3/28-3/29｜誠品生活台南', icon: '🛍️', detail: '有人氣，但不用硬社交。可以自己慢慢逛，也可以停在喜歡的攤位前，整體很自由。' },
  spot10: { title: '台南電影狸想世界Hoppers', icon: '🎬', detail: '如果你本來就對一個人看電影有感，這類行程很適合讓自己安靜進入情緒和故事裡。' },
  spot11: { title: '城南舊肆五妃廟＋慶中街豬血湯炒米粉', icon: '🍜', detail: '有一點在地、有一點舊城散步感，最後再用熱熱的食物收尾，整體很穩、很熟悉。' },
  spot12: { title: '又又美＋EVA泡芙＋台南歷史館＋延平郡王寺', icon: '🚶', detail: '很適合邊走邊決定、照心情增減停留點的路線。今天想停哪裡就停哪裡，不用太規矩。' },
  spot13: { title: '創意積木夢工場｜LEGO 樂高$120', icon: '🧱', detail: '有點玩心、有點投入感，也很適合讓腦袋暫時切換到比較輕鬆的模式。' },
  spot14: { title: '奇美博物館埃及展', icon: '🏛️', detail: '很適合慢慢看、慢慢沉進去。尤其如果你喜歡自己消化內容、自己連結，會很有味道。' },
  spot15: { title: '毛孩生活村看看狗狗、嚕嚕狗狗', icon: '🐶', detail: '有互動感，但不會太有壓力。你可以自己去，也能自然感受到現場的溫度。' },
  spot16: { title: '大次郎號玩古老任天堂（小貴）', icon: '🎮', detail: '有明確目的，也有一點懷舊玩樂感。適合想要「就是去做這件事」的時候。' },
  spot17: { title: 'Chun 純薏仁 at 公園吹風＋走去湯德章故居看看＋八吉境道署關帝廳問個事', icon: '🌿', detail: '不急、不吵，整體節奏很柔和。很適合想慢慢整理情緒、慢慢讓自己穩下來的時候。' },
  spot18: { title: '台灣歷史博物館沉浸式認識台灣', icon: '🗺️', detail: '如果你喜歡邊看邊想、自己和內容慢慢產生連結，這種沉浸式體驗會很適合你。' },
  spot19: { title: '林默娘公園放風箏、野餐、吹泡泡', icon: '🫧', detail: '有風、有空間、有人群，但大家都各自生活。這種不打擾卻不孤單的氛圍很剛好。' },
  spot20: { title: '嘴嘴桌遊店平日$130 不限時間，最低 5 人包廂還有 Switch', icon: '🎲', detail: '這類型比較偏互動和一起玩，適合想跟人或氣氛有一點連結、但不一定要很正式的人。' },
  spot21: { title: '花磚小展覽 土星工作室〈顆粒〉＋吳園散步餵魚', icon: '🪷', detail: '有小展覽、有散步、有停留感，整體很溫柔，很適合喜歡慢慢走、慢慢看的你。' },
  spot22: { title: '衝極商店選物店看看＋無名米糕', icon: '🍚', detail: '有點街頭感、有點生活感，可以邊走邊看、順手吃點東西，整體很隨性。' },
  spot23: { title: '溫刀鐵道＋西市場逛逛＋政大書城看看最近紅什麼', icon: '🚞', detail: '這條線很適合喜歡自己掌控節奏的人，有老味道、有書店、有逛的空間，也不會太亂。' },
  spot24: { title: 'takara 可愛雜貨店＋<不不> 看漫畫讀書不限時', icon: '📖', detail: '可以先逛可愛的東西，再去安靜坐著看書或漫畫，適合慢慢泡進自己世界裡。' },
  spot25: { title: '府城陶坊玩土 $100', icon: '🏺', detail: '手作很適合把注意力收回自己身上，也會有一種慢慢被安定下來的感覺。' },
  spot26: { title: '西竹圍之丘文創園區逛逛', icon: '🎨', detail: '不用太有目的，散步、看看、停一下就好，適合留一點空白給自己。' }
};

window.PERSONA_SPOT_MAP = {
  'high-independent-utilitarian': ['spot05', 'spot06', 'spot07', 'spot16', 'spot23', 'spot24', 'spot12', 'spot03', 'spot01'],
  'high-independent-selfNurturing': ['spot01', 'spot06', 'spot14', 'spot18', 'spot21','spot22', 'spot23', 'spot25', 'spot19', 'spot14'],
  'high-interdependent-utilitarian': ['spot21', 'spot10', 'spot17', 'spot23', 'spot26'],
  'high-interdependent-selfNurturing': ['spot11', 'spot17', 'spot19', 'spot21', 'spot01'],
  'low-independent-utilitarian': ['spot02', 'spot12', 'spot23', 'spot24', 'spot22'],
  'low-independent-selfNurturing': ['spot06', 'spot14', 'spot18', 'spot25', 'spot24'],
  'low-interdependent-utilitarian': ['spot25', 'spot08', 'spot13', 'spot15', 'spot20'],
  'low-interdependent-selfNurturing': ['spot19', 'spot17', 'spot15', 'spot25', 'spot03']
};