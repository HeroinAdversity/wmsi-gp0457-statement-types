/**
 * All content data for the Identifying Perspectives page.
 * Content is sourced from the original static HTML tool (Jun 2026 exam material)
 * with additions from the Oxford IGCSE Global Perspectives 3rd edition textbook.
 */

export type LevelKey = 'GLOBAL' | 'NATIONAL' | 'LOCAL' | 'PERSONAL';

export interface LevelDef {
  key: LevelKey;
  en: { name: string; def: string; example: string };
  zh: { name: string; def: string; example: string };
  colorVar: string; // css var name for the accent
}

export const LEVEL_DEFS: LevelDef[] = [
  {
    key: 'GLOBAL',
    colorVar: '--color-cobalt',
    en: {
      name: 'GLOBAL',
      def: 'A viewpoint held by people, organisations, or agreements that affect or represent the whole world — international bodies, global treaties, worldwide movements.',
      example:
        'The Paris Agreement represents a global perspective on climate change — nations agreeing to a shared worldwide target.',
    },
    zh: {
      name: '全球',
      def: '由影响或代表整个世界的人、组织或协议所持有的观点——例如国际组织、全球性协议、世界性运动。',
      example: '《巴黎协定》代表了对气候变化的全球视角：各国就一个共同的全球目标达成一致。',
    },
  },
  {
    key: 'NATIONAL',
    colorVar: '--color-forest',
    en: {
      name: 'NATIONAL',
      def: 'A viewpoint held at the level of a country — a government, a national law, or a policy applying across the whole nation.',
      example: 'A government raising the national minimum wage is acting from a national perspective on fair pay.',
    },
    zh: {
      name: '国家',
      def: '在国家层面持有的观点——例如政府、国家法律，或适用于全国的政策。',
      example: '政府提高全国最低工资标准，就是从国家层面对公平薪酬采取的行动。',
    },
  },
  {
    key: 'LOCAL',
    colorVar: '--color-amber',
    en: {
      name: 'LOCAL',
      def: 'A viewpoint held within a particular town, neighbourhood, or community — often shaped by conditions specific to that place.',
      example:
        'A town council rejecting a new highway because it would divide the community is a local perspective.',
    },
    zh: {
      name: '地方',
      def: '在某个特定城镇、社区或邻里范围内持有的观点——通常受该地特有情况的影响。',
      example: '市议会因新高速公路会分割社区而反对建设，这是一种地方层面的观点。',
    },
  },
  {
    key: 'PERSONAL',
    colorVar: '--color-violet',
    en: {
      name: 'PERSONAL',
      def: "An individual's own response to an issue, formed after their own learning, experience, and reflection.",
      example:
        'A farmer who has personally noticed rainfall becoming less predictable holds a personal perspective on climate change.',
    },
    zh: {
      name: '个人',
      def: '个人在自身学习、经历和反思之后，对某一议题形成的看法。',
      example: '一位亲身注意到降雨变得难以预测的农民，对气候变化持有个人层面的观点。',
    },
  },
];

/* ─────────── Five Elements ─────────── */
export interface Element {
  id: 'issues' | 'values' | 'causes' | 'consequences' | 'actions';
  labelEn: string;
  labelZh: string;
  descEn: string;
  descZh: string;
  signalsEn: string;
  signalsZh: string;
}

export const FIVE_ELEMENTS: Element[] = [
  {
    id: 'issues',
    labelEn: 'Issues',
    labelZh: '议题',
    descEn: "The problem(s) the source is responding to — what's going wrong, or what's lacking.",
    descZh: '该资料正在回应的问题——出了什么问题，或缺少什么。',
    signalsEn: 'Look for words describing a gap, a difficulty, or a need.',
    signalsZh: '留意描述差距、困难或需求的词语。',
  },
  {
    id: 'values',
    labelEn: 'Values',
    labelZh: '价值观',
    descEn: 'Why the source believes this issue matters — what it values or cares about.',
    descZh: '该资料为何认为这个议题重要——它看重或在意什么。',
    signalsEn: 'Often signalled by words like "believe", "important", or "should".',
    signalsZh: '常常通过“相信”“重要”“应该”等词语体现出来。',
  },
  {
    id: 'causes',
    labelEn: 'Causes',
    labelZh: '原因',
    descEn: 'What the source says caused the issue.',
    descZh: '该资料认为是什么导致了这个问题。',
    signalsEn: 'Look for "because", "due to", "in response to", or a named event.',
    signalsZh: '留意“因为”“由于”“为应对……”等词语，或一个具体事件。',
  },
  {
    id: 'consequences',
    labelEn: 'Consequences',
    labelZh: '后果',
    descEn: 'The effects mentioned — either of the problem itself, or of what the source has done about it.',
    descZh: '提到的后果——无论是问题本身的后果，还是该资料所采取行动带来的后果。',
    signalsEn: 'Watch for "so that", "meaning that", "as a result".',
    signalsZh: '留意“因此”“意味着”“结果”等表述。',
  },
  {
    id: 'actions',
    labelEn: 'Actions',
    labelZh: '行动',
    descEn: 'What the source is actually doing in response — programmes, policies, partnerships, or requests.',
    descZh: '该资料为此实际采取的行动——项目、政策、合作关系，或诉求。',
    signalsEn: 'Verbs of doing — "we run", "we work with", "we call for".',
    signalsZh: '“开展”“合作”“呼吁”等动词。',
  },
];

/* ─────────── Case study voice cards (Miren Valley) ─────────── */
export interface VoiceCard {
  level: LevelKey;
  whoEn: string;
  whoZh: string;
  quoteEn: string;
  quoteZh: string;
  fiveElements: {
    en: [string, string, string, string, string];
    zh: [string, string, string, string, string];
  };
  cultural?: { en: string; zh: string };
}

export const VOICE_CARDS: VoiceCard[] = [
  {
    level: 'GLOBAL',
    whoEn: 'Spokesperson, International Refugee Coordination Office (IRCO)',
    whoZh: '国际难民协调办公室（IRCO）发言人',
    quoteEn:
      '"Two years into the ceasefire, funding for the camps has fallen by half. Without renewed international support, thousands of returning families will have nowhere safe to rebuild."',
    quoteZh:
      '“停火两年以来，难民营的资金已经减少了一半。如果没有新的国际支持，成千上万返乡的家庭将无处安全重建家园。”',
    fiveElements: {
      en: [
        '"funding for the camps has fallen by half" — a specific, measurable issue.',
        'Not directly stated, but implied: continuing international responsibility for displaced people.',
        'Not given in this short quote — a reminder that not every element is always present.',
        '"families will have nowhere safe to rebuild" — a stated result of the funding drop.',
        'A request rather than a completed action: "renewed international support."',
      ],
      zh: [
        '“难民营的资金已经减少了一半”——一个具体、可衡量的议题。',
        '并未直接说明，但暗含：国际社会对流离失所者持续负有责任。',
        '这段简短的话中并未说明——提醒我们：并非每个要素都会一直出现。',
        '“家庭将无处安全重建家园”——资金减少所带来的一个明确后果。',
        '这是一项诉求，而非已完成的行动：“新的国际支持”。',
      ],
    },
  },
  {
    level: 'NATIONAL',
    whoEn: 'Deputy Minister for Border Affairs, Kavara',
    whoZh: '卡瓦拉边境事务副部长',
    quoteEn:
      '"The ceasefire line protects Kavaran citizens and reflects the historic boundary our people have recognised for generations. We will not renegotiate our national security for short-term convenience."',
    quoteZh:
      '“停火线保护了卡瓦拉公民，也反映了我们人民世代认可的历史边界。我们不会为了一时方便而重新谈判国家安全问题。”',
    fiveElements: {
      en: [
        'Implied pressure to move or renegotiate the ceasefire line.',
        'National security and historical continuity — "our people have recognised for generations."',
        'Not explicitly stated why security would be at risk.',
        'Not directly stated in this quote.',
        'A refusal: "We will not renegotiate our national security."',
      ],
      zh: [
        '暗示存在要求改动或重新谈判停火线的压力。',
        '国家安全与历史延续性——“我们人民世代认可”。',
        '并未明确说明为何安全会受到威胁。',
        '这段话中并未直接说明。',
        '一项拒绝：“我们不会……重新谈判国家安全问题。”',
      ],
    },
    cultural: {
      en: 'Notice the phrase "our people have recognised for generations" — this national position leans on a specific cultural and historical narrative about the valley, one that a Denrithi audience might tell very differently.',
      zh: '注意“我们人民世代认可”这句话——这个国家层面的立场依赖于一种关于米伦谷的特定文化与历史叙事，而登里斯的民众很可能会讲述一个截然不同的版本。',
    },
  },
  {
    level: 'LOCAL',
    whoEn: 'Village council leader, Miren town (sits exactly on the ceasefire line)',
    whoZh: '米伦镇（正好位于停火线上）村议会领袖',
    quoteEn:
      '"The politicians in the capital argue about a border they\'ve never had to farm. We want the old market road reopened — traders on both sides have been walking two hours around checkpoints for two years."',
    quoteZh:
      '“首都的政客们争论着一条他们从未耕种过的边界。我们希望重新开放旧的集市道路——两年来，双方的商贩都要绕检查站走两个小时。”',
    fiveElements: {
      en: [
        'Traders forced into a two-hour detour around checkpoints.',
        'Practical daily life over abstract political argument — "politicians... argue about a border they\'ve never had to farm."',
        'Implied: the closed market road, a result of the wider border dispute.',
        '"walking two hours around checkpoints for two years" — a concrete, quantified consequence.',
        'A specific demand: "We want the old market road reopened."',
      ],
      zh: [
        '商贩被迫绕检查站多走两小时的路。',
        '重视实际的日常生活，而非抽象的政治争论——“政客们争论着一条他们从未耕种过的边界”。',
        '暗示原因：集市道路被关闭，是更大范围边界争端的结果。',
        '“绕检查站走两个小时，持续了两年”——一个具体、可量化的后果。',
        '一项具体诉求：“我们希望重新开放旧的集市道路。”',
      ],
    },
    cultural: {
      en: "The council leader's frustration reflects a border-community identity — cross-border kinship and trading ties that existed long before the modern national border was drawn, and that national-level narratives often don't account for.",
      zh: '村议会领袖的不满反映了一种边境社区的身份认同——跨境的亲缘与贸易联系早在现代国界划定之前就已存在，而国家层面的叙事往往没有考虑到这一点。',
    },
  },
  {
    level: 'PERSONAL',
    whoEn: 'Amara, 16, currently living in a resettlement camp on the Kavaran side',
    whoZh: '阿玛拉，16岁，目前住在卡瓦拉一侧的安置营中',
    quoteEn:
      "\"I was ten when we left. I don't remember which side of the line our house was actually on — I just remember the smell of my grandmother's kitchen. I don't care whose flag is there. I want to go home.\"",
    quoteZh:
      '“我们离开的时候我才十岁。我已经不记得我们家到底在线的哪一边——我只记得祖母厨房的味道。我不在乎那里插着谁的旗子，我只想回家。”',
    fiveElements: {
      en: [
        'Displacement and loss of her childhood home.',
        'Memory and home over politics — "I don\'t care whose flag is there."',
        'Not stated — the conflict itself is implied, but never named.',
        'Not directly stated beyond her ongoing separation from home.',
        'None — this is a wish, not a report of action: "I want to go home."',
      ],
      zh: [
        '流离失所，失去了儿时的家。',
        '重视记忆与家园，而非政治——“我不在乎那里插着谁的旗子”。',
        '并未说明——冲突本身是暗含的，但从未被直接点明。',
        '除了她与家园持续分离之外，并未直接说明其他后果。',
        '没有——这是一种愿望，而不是一项行动报告：“我只想回家。”',
      ],
    },
  },
];

/* ─────────── Classify & explain practice ─────────── */
export interface PracticeStatement {
  quoteEn: string;
  quoteZh: string;
  correct: LevelKey;
  needsWhy?: boolean;
  whyPromptEn?: string;
  whyPromptZh?: string;
  feedbackEn: string;
  feedbackZh: string;
}

export const PRACTICE_STATEMENTS: PracticeStatement[] = [
  {
    quoteEn:
      'A representative from a global food-aid agency said continued access for aid convoys into the valley remains their top priority this year.',
    quoteZh: '一家全球粮食援助机构的代表表示，确保援助车队持续进入山谷仍是他们今年的首要任务。',
    correct: 'GLOBAL',
    feedbackEn:
      'This speaker represents a worldwide humanitarian agency, not one country or community — a global perspective.',
    feedbackZh: '这位发言人代表的是一个全球性人道主义机构，而不是某一个国家或社区——这是全球层面的观点。',
  },
  {
    quoteEn:
      "Denrith's opposition leader accused the government of abandoning citizens who still can't return to land inside the ceasefire zone.",
    quoteZh: '登里斯的反对派领袖指责政府抛弃了那些仍无法返回停火区内土地的公民。',
    correct: 'NATIONAL',
    needsWhy: true,
    whyPromptEn: 'Why is this a national perspective, and what reasoning is being used?',
    whyPromptZh: '为什么这是国家层面的观点？用了什么理由？',
    feedbackEn:
      'A national opposition politician is speaking about government policy affecting citizens across the whole country — national level.',
    feedbackZh: '一位国家层面的反对派政治人物在谈论影响全国公民的政府政策——这是国家层面。',
  },
  {
    quoteEn:
      'A schoolteacher in a border town raised money to rebuild the shared library that both communities used before the conflict.',
    quoteZh: '一位边境小镇的教师筹款重建了冲突前两个社区共用的图书馆。',
    correct: 'LOCAL',
    feedbackEn: 'This is about one specific town and one shared community resource — a local perspective.',
    feedbackZh: '这涉及一个具体的城镇和一项社区共用的资源——这是地方层面的观点。',
  },
  {
    quoteEn:
      'A former soldier from Kavara said he no longer believes the valley is worth the cost his unit paid to hold it.',
    quoteZh: '一位来自卡瓦拉的退伍军人表示，他不再认为这片山谷值得他所在部队为守住它而付出的代价。',
    correct: 'PERSONAL',
    needsWhy: true,
    whyPromptEn:
      "Why is this a personal perspective rather than a national one, even though he's talking about a national issue?",
    whyPromptZh: '尽管他谈论的是国家层面的议题，为什么这是个人层面的观点，而不是国家层面？',
    feedbackEn:
      "Even though he's discussing a national issue, this is his own individual reflection based on personal experience — a personal perspective.",
    feedbackZh: '虽然他谈论的是国家议题，但这是他基于个人经历所作的反思——这是个人层面的观点。',
  },
  {
    quoteEn:
      "Kavara's trade ministry announced it would keep the border crossing closed until Denrith agrees to a formal treaty.",
    quoteZh: '卡瓦拉贸易部宣布，在登里斯同意签署正式条约之前，边境口岸将维持关闭。',
    correct: 'NATIONAL',
    feedbackEn: 'A government ministry setting policy that applies to the whole country — national level.',
    feedbackZh: '一个政府部门制定适用于全国的政策——这是国家层面。',
  },
  {
    quoteEn:
      'Farmers on both sides of the line have quietly agreed among themselves to share irrigation water, without involving either government.',
    quoteZh: '停火线两侧的农民私下达成协议共享灌溉用水，没有让任何一方政府介入。',
    correct: 'LOCAL',
    feedbackEn:
      'A specific, informal arrangement among a small group of farmers on the ground — a local perspective, and notably one that bypasses national politics entirely.',
    feedbackZh:
      '这是当地一小群农民之间达成的具体、非正式安排——这是地方层面的观点，而且它完全绕开了国家层面的政治。',
  },
  {
    quoteEn:
      'A global health-and-conflict NGO reported that ceasefire-zone hospitals still lack basic medicine three years on.',
    quoteZh: '一家关注健康与冲突问题的全球性非政府组织报告称，三年过去了，停火区的医院仍然缺乏基本药品。',
    correct: 'GLOBAL',
    feedbackEn:
      'An international NGO reporting on conditions across the whole ceasefire zone, not tied to one government or town — a global perspective.',
    feedbackZh:
      '一家国际非政府组织在报告整个停火区的状况，不隶属于任何一方政府或城镇——这是全球层面的观点。',
  },
  {
    quoteEn:
      'A Denrithi grandmother said she took the photo of the old family farmhouse down from her wall, because it made the wait to return feel too long.',
    quoteZh:
      '一位登里斯的老奶奶说，她已经不再把家中老农舍的照片摆出来了，因为那会让等待返乡的日子显得更加漫长。',
    correct: 'PERSONAL',
    needsWhy: true,
    whyPromptEn:
      "Why is this a personal perspective, and what does it reveal that a government statement about the same conflict wouldn't?",
    whyPromptZh: '为什么这是个人层面的观点？它揭示了哪些政府关于同一冲突的声明所无法呈现的内容？',
    feedbackEn:
      "This is one woman's private emotional coping strategy — deeply personal, and it reveals a human cost that a policy statement would never capture.",
    feedbackZh: '这是一位普通女性私下的情感应对方式——非常个人化，它揭示了政策声明永远无法呈现的人性代价。',
  },
  {
    quoteEn:
      "Denrith's foreign ministry proposed a joint economic zone spanning both sides of the valley to encourage cooperation.",
    quoteZh: '登里斯外交部提议在山谷两侧共同设立一个联合经济区，以促进合作。',
    correct: 'NATIONAL',
    needsWhy: true,
    whyPromptEn:
      'Why is this a national perspective, and how does its reasoning differ from the earlier statement about keeping the border crossing closed?',
    whyPromptZh: '为什么这是国家层面的观点？它的理由与此前“维持边境口岸关闭”的说法有何不同？',
    feedbackEn:
      'A government ministry proposing policy for the whole nation — national level. Note it reasons from cooperation and shared economic benefit, the opposite approach from the earlier closed-border statement.',
    feedbackZh:
      '一个政府部门为整个国家提出政策——这是国家层面。请注意，它的理由是基于合作与共享经济利益，与此前“关闭边境”的说法所采用的思路正好相反。',
  },
  {
    quoteEn:
      'Two rival football clubs from either side of the ceasefire line agreed to play an annual friendly match in the neutral zone.',
    quoteZh: '停火线两侧的两支对立足球俱乐部同意每年在中立区举行一场友谊赛。',
    correct: 'LOCAL',
    feedbackEn:
      'Two specific community clubs making their own arrangement, independent of national policy — a local perspective in action.',
    feedbackZh: '两家具体的地方俱乐部自行做出安排，独立于国家政策之外——这是地方层面观点的一种体现。',
  },
];

/* ─────────── Describe-questions for exam practice ─────────── */
export interface DescribeQuestion {
  qid: string;
  authentic: boolean;
  topicEn: string;
  topicZh: string;
  titleEn: string;
  titleZh: string;
  sourceLabelEn: string;
  sourceLabelZh: string;
  sourceEn: string;
  sourceZh: string;
  promptEn: string;
  promptZh: string;
}

export const DESCRIBE_QUESTIONS: DescribeQuestion[] = [
  {
    qid: 'real',
    authentic: true,
    topicEn: 'Health & Wellbeing · Real past paper',
    topicZh: '健康与幸福 · 真实历年试题',
    titleEn: 'Question 1 — Study Source 2 · Cambridge IGCSE 0457/13, June 2026',
    titleZh: '第 1 题 —— 阅读资料 2 · 剑桥 IGCSE 0457/13，2026 年 6 月',
    sourceLabelEn: "Source 2 — extract from the Global Sports Organisation's newsletter",
    sourceLabelZh: '资料 2 —— 摘自“全球体育组织”通讯简报',
    sourceEn:
      '"The power of sport should not be underestimated! The Global Sports Organisation (GSO) is an international group committed to the development and promotion of sports and activities. We believe that sports contribute to our social and cultural understanding. We founded the activity Play-Connect-Rise in 2022 as a response to the many continuing effects of the Covid-19 pandemic, such as, a lack of fitness, loneliness and insecurity. We depend on donations and work with local governments, NGOs, and local communities to create sustainable sports programmes for all. These programmes emphasise the importance of inclusion and have successfully integrated minority groups into sports. Our programmes have improved the health of local people."',
    sourceZh:
      '“体育的力量不容小觑！‘全球体育组织’(GSO) 是一个致力于发展和推广体育运动的国际组织。我们相信体育有助于增进我们的社会与文化理解。我们在2022年发起了‘运动·连结·崛起’(Play-Connect-Rise) 活动，以应对新冠疫情持续带来的种种影响，例如缺乏运动、孤独感和不安全感。我们依靠捐款运作，并与地方政府、非政府组织及地方社区合作，共同打造可持续的全民体育项目。这些项目强调包容的重要性，并已成功帮助少数群体融入体育活动。我们的项目改善了当地居民的健康状况。”',
    promptEn: "From Source 2, describe the organisation's perspective on sports.",
    promptZh: '根据资料 2，描述该组织对体育运动的观点。',
  },
  {
    qid: 'digital',
    authentic: false,
    topicEn: 'Digital World · Original practice',
    topicZh: '数码世界 · 原创练习',
    titleEn: 'Question 2 — Study Source A',
    titleZh: '第 2 题 —— 阅读资料 A',
    sourceLabelEn: "Source A — extract from the Digital Compass Foundation's newsletter",
    sourceLabelZh: '资料 A —— 摘自“数字罗盘基金会”通讯简报',
    sourceEn:
      '"Technology is reshaping how young people learn, connect, and grow up — and too many of them are navigating it without a map. The Digital Compass Foundation (DCF) is an international non-profit dedicated to helping teenagers use technology safely, critically, and confidently. We were founded in 2021, in the middle of a sharp rise in reported cases of cyberbullying, misinformation shared by teenagers, and screen-time related sleep problems across schools we work with. Our founders — a group of former teachers and child psychologists — believed that banning devices was not a realistic solution. Instead, young people needed to be equipped with the judgement to manage technology themselves. Our flagship programme, Click Before You Share, runs workshops in partner schools across 14 countries. The workshops are co-designed with students, not simply delivered to them, because we have found that teenagers engage far more seriously with online safety advice when they help write it. Each workshop covers three areas: recognising manipulated images and misinformation, understanding how algorithms shape what they see online, and building healthy boundaries around screen use without shame or punishment. We depend on partnerships with school networks, technology companies willing to share anonymised data on reported harms, and grants from education ministries who recognise that digital literacy is now as fundamental as reading literacy. In the past two years, over 40,000 students have completed a DCF workshop, and independent survey data from partner schools shows a measurable drop in students reporting that they had shared something online they later regretted. One finding surprised us: workshops led by trained older students, rather than adult facilitators, consistently produced the strongest results, because participants were far more willing to admit their own mistakes to a peer than to a teacher. We are proud that our approach treats young people as capable decision-makers rather than problems to be managed. Too many digital safety campaigns speak to teenagers instead of with them, and we believe this is why so many fail to change behaviour. Our next goal is to extend the programme into primary schools, adapting our workshops for children as young as nine, because the earlier good digital habits are formed, the more naturally they carry through into adolescence and adulthood."',
    sourceZh:
      '“科技正在改变年轻人学习、交流与成长的方式——而太多年轻人是在没有‘地图’的情况下摸索前行的。‘数字罗盘基金会’(Digital Compass Foundation, DCF) 是一个国际非营利组织，致力于帮助青少年安全、审慎、自信地使用科技。我们成立于2021年，当时我们合作的学校中，网络欺凌、青少年传播虚假信息，以及与屏幕使用时间相关的睡眠问题的报告数量都在急剧上升。我们的创始人——一群前教师和儿童心理学家——认为，禁止使用电子设备并不是一个现实的解决方案。相反，年轻人需要具备自己管理科技使用的判断力。我们的旗舰项目‘分享之前先思考’(Click Before You Share) 在14个国家的合作学校开展工作坊。这些工作坊是与学生共同设计的，而不是单方面灌输给他们的，因为我们发现，当青少年参与撰写网络安全建议时，他们会更认真地对待这些建议。每场工作坊涵盖三个方面：识别被篡改的图像与虚假信息；理解算法如何影响他们在网上看到的内容；以及在不带羞辱或惩罚的前提下，建立健康的屏幕使用界限。我们依靠与学校网络的合作、愿意分享匿名伤害数据的科技公司，以及认识到数字素养如今与阅读素养同样重要的教育部门所提供的资助来运作。过去两年间，已有超过4万名学生完成了DCF的工作坊，来自合作学校的独立调查数据显示，学生表示自己曾分享过后来感到后悔的内容的比例出现了明显下降。有一项发现让我们感到意外：由经过培训的高年级学生（而不是成年引导者）主持的工作坊，效果始终最为显著，因为参与者更愿意向同龄人而不是老师坦承自己的失误。我们为自己的方式感到自豪——它把年轻人当作有能力做决定的人，而不是需要被管理的‘问题’。太多的数字安全宣传是在对青少年‘说教’，而不是与他们‘对话’，我们相信这正是许多宣传未能改变行为的原因。我们下一步的目标是把该项目推广到小学，为九岁左右的儿童调整工作坊内容，因为良好的数字使用习惯养成得越早，就越能自然而然地延续到青春期乃至成年期。”',
    promptEn: "From Source A, describe the organisation's perspective on young people's use of technology.",
    promptZh: '根据资料 A，描述该组织对青少年使用科技的观点。',
  },
  {
    qid: 'river',
    authentic: false,
    topicEn: 'Environment & Conservation · Original practice',
    topicZh: '环境与保育 · 原创练习',
    titleEn: 'Question 3 — Study Source B',
    titleZh: '第 3 题 —— 阅读资料 B',
    sourceLabelEn: "Source B — extract from the Clearwater Rivers Trust's newsletter",
    sourceLabelZh: '资料 B —— 摘自“清水河流信托”通讯简报',
    sourceEn:
      '"Rivers connect everything they touch — farms, cities, forests, and the millions of people who depend on clean water each day. Yet across the world, rivers are being degraded faster than they can recover. The Clearwater Rivers Trust (CRT) is an international environmental organisation working to protect river systems and the communities that rely on them. We were established in 2016 after a coalition of scientists published research showing that over 60 percent of the world\'s major rivers were experiencing declining water quality, largely due to unregulated logging, agricultural runoff, and untreated industrial waste. Our founders believed that river protection had been treated as a purely technical or governmental issue for too long, when in reality it depends on the cooperation of the local communities who live along riverbanks every day. Our core programme, Living Rivers, currently operates in 22 river basins, including a partner project along Sungai Chantek, where downstream fishing communities have reported falling catches linked to sediment from nearby logging roads. Rather than opposing logging outright, we work with logging companies, local governments, and village councils together to agree on buffer zones, replanting schedules, and water-testing routines that all parties monitor jointly. We believe lasting change comes from shared responsibility, not from one side simply overruling another. Funding comes from a mixture of international grants, corporate sustainability partnerships, and — increasingly — direct contributions from downstream communities themselves, who tell us that having a financial stake in the programme makes them trust its results more. Over the past four years, water-quality testing in our partner basins shows measurable improvement in eleven of the twenty-two sites, though progress in the remaining eleven has been slower than we hoped, particularly where logging permits are issued by authorities outside our partnership agreements. We recognise that we cannot police rivers into health. What we can do is give local communities the scientific tools, and the seat at the table, that they have too often been denied. Our long-term goal is not simply cleaner rivers, but a lasting model of cooperation between industry, government and the people who live with the consequences of decisions made far upstream."',
    sourceZh:
      '“河流将它们所触及的一切连接在一起——农田、城市、森林，以及每天依赖洁净水源生活的数百万人。然而，世界各地的河流正以超过其自我恢复速度的速度不断退化。‘清水河流信托’(Clearwater Rivers Trust, CRT) 是一个国际环保组织，致力于保护河流系统以及依赖这些河流生存的社区。我们成立于2016年，当时一个科学家联盟发布的研究显示，全球超过60%的主要河流水质正在下降，主要原因是不受管制的伐木、农业径流污染，以及未经处理的工业废水排放。我们的创始人认为，河流保护长期以来被当作单纯的技术或政府问题来处理，但实际上，它离不开每天生活在河岸边的当地社区的合作。我们的核心项目‘活河计划’(Living Rivers) 目前在22个流域开展工作，其中包括清溪河 (Sungai Chantek) 沿岸的一个合作项目——那里下游的渔业社区反映，由于附近伐木道路带来的泥沙淤积，渔获量正在下降。我们并不是一味反对伐木，而是与伐木公司、地方政府和村议会共同合作，商定缓冲区范围、重新造林时间表，以及各方共同监督的水质检测流程。我们相信，持久的改变来自于共同承担责任，而不是某一方单方面压过另一方。我们的资金来自国际拨款、企业可持续发展合作伙伴关系，以及——比例正逐渐增加的——下游社区自身的直接出资；这些社区告诉我们，当他们在项目中拥有经济上的‘股份’时，会更加信任项目的成果。过去四年间，在我们合作的流域中，有22个监测点里的11个显示水质有明显改善，但其余11个点的进展比我们预期的要慢，尤其是在伐木许可由我们合作协议之外的部门发放的地方。我们清楚地认识到，我们无法靠‘监管’让河流恢复健康。我们能做的，是把科学工具，以及长期以来被剥夺的‘话语权’，交还给当地社区。我们的长远目标不仅仅是让河流更清洁，而是要建立一种持久的合作模式，让产业界、政府，以及承受上游决策后果的人们能够共同参与。”',
    promptEn: "From Source B, describe the organisation's perspective on river conservation.",
    promptZh: '根据资料 B，描述该组织对河流保护的观点。',
  },
  {
    qid: 'inclusion',
    authentic: false,
    topicEn: 'Social Identity & Inclusion · Original practice',
    topicZh: '社会身份与包容 · 原创练习',
    titleEn: 'Question 4 — Study Source C',
    titleZh: '第 4 题 —— 阅读资料 C',
    sourceLabelEn: "Source C — extract from the Open Doors Initiative's newsletter",
    sourceLabelZh: '资料 C —— 摘自“敞开的门”倡议通讯简报',
    sourceEn:
      '"One in ten children worldwide lives with some form of disability, yet in many countries fewer than half of these children ever attend a mainstream school. The Open Doors Initiative (ODI) is a global organisation working to make ordinary classrooms genuinely accessible to every child, regardless of physical, sensory, or learning differences. We were founded in 2018 by a group of parents and teachers who had grown frustrated watching capable children be quietly redirected away from mainstream schools simply because staff felt unprepared, not because the children could not learn there. Our founders believed the barrier was rarely the child — it was almost always the environment built around them. Our flagship programme, Every Desk, works directly with school administrators to redesign classrooms, retrain teachers, and adapt lesson materials, rather than creating separate facilities. We have found that separate special-education classrooms, while well-intentioned, often reinforce the idea that inclusion is a favour rather than a right. Every Desk currently operates in 260 schools across 19 countries, supported by a mixed team of occupational therapists, curriculum designers, and — crucially — young adults who themselves grew up with disabilities and now train incoming teachers directly. We rely on a combination of government education grants, corporate diversity funding, and small individual donations, which we deliberately prioritise because they come with the fewest conditions attached, allowing us to design programmes around what schools actually need rather than what funders assume they need. Independent evaluation of our first five years shows that students in Every Desk schools are not only more likely to remain in mainstream education through to graduation, but that their classmates without disabilities also report improved attitudes toward difference more broadly. We are conscious that inclusion is sometimes treated as a checklist — a ramp installed, a policy signed — rather than a genuine shift in how a school thinks about who belongs. Our long-term aim is for schools to reach a point where retrofitting a classroom for a new student feels unremarkable, not exceptional. Until every child can walk, wheel, or be guided through the same front door as their classmates, we consider the work unfinished."',
    sourceZh:
      '“全世界每十个孩子中就有一个患有某种形式的残疾，然而在许多国家，这些孩子中只有不到一半能够就读于普通学校。‘敞开的门’倡议 (Open Doors Initiative, ODI) 是一个全球性组织，致力于让普通教室真正对每一个孩子——无论其身体、感官或学习方面存在何种差异——都保持开放与可及。我们由一群家长与教师于2018年创立，他们目睹了许多本有能力的孩子，仅仅因为学校教职人员感到‘准备不足’，而不是因为孩子本身无法学习，就被悄悄地劝退出普通学校，为此感到十分沮丧。我们的创始人相信，障碍很少在于孩子本身——几乎总是在于围绕着孩子所搭建的环境。我们的旗舰项目‘人人有位’(Every Desk) 直接与学校管理者合作，重新设计教室、为教师提供再培训，并调整教学材料，而不是另建独立的设施。我们发现，独立的特殊教育教室虽然出发点良好，却常常强化了这样一种观念：融合教育是一种‘恩惠’，而非一项‘权利’。‘人人有位’项目目前已在19个国家的260所学校开展，由职能治疗师、课程设计者，以及——尤为关键的——本身在残疾中成长、如今直接为新教师提供培训的年轻人组成的团队共同支持。我们的资金来自政府教育拨款、企业多元化基金，以及数额较小的个人捐款；我们特意优先考虑个人捐款，因为它们附带的条件最少，使我们能够根据学校的真实需求来设计项目，而不是根据资助方所设想的需求。对我们头五年工作的独立评估显示，‘人人有位’项目所在学校的学生不仅更有可能一直留在普通教育体系中直至毕业，他们没有残疾的同学也反映，自己对‘差异’的态度普遍有所改善。我们意识到，‘融合’有时被当作一份清单来对待——装一个坡道、签一份政策——而不是学校在‘谁属于这里’这一观念上的真正转变。我们的长远目标，是让学校达到这样一种状态：为一位新生调整教室，会被视为稀松平常，而非特殊之举。在每一个孩子都能与同学从同一扇正门走进、被推进或被引导进入学校之前，我们认为这项工作尚未完成。”',
    promptEn: "From Source C, describe the organisation's perspective on inclusive education.",
    promptZh: '根据资料 C，描述该组织对全纳教育的观点。',
  },
];

/* ─────────── Your-turn passage (Bridges for Miren) ─────────── */
export const YOUR_TURN = {
  sourceLabelEn: 'Extract from the "Bridges for Miren" newsletter',
  sourceLabelZh: '摘自“米伦之桥”通讯简报',
  sourceEn:
    '"For six years, the only secondary school in the Miren Valley sat half-collapsed behind the ceasefire line, its windows boarded and its library roof caved in from an early strike in the conflict. Bridges for Miren is a small charity founded in 2024 by three teachers who had taught in the valley before the fighting forced them out, and who returned as soon as the ceasefire allowed. We do not ask which government the valley belongs to, and we do not take a position on the border dispute. Our founders believe that whatever else is unresolved, a generation of children should not lose their education while adults negotiate. Every month a class stays unbuilt is a month of missed exams, missed friendships, and missed chances that cannot be recovered later. Our first project, reopening the damaged secondary school, began with clearing rubble by hand because heavy machinery could not be brought through the checkpoints. Local families on both sides of the ceasefire line volunteered labour once a week, which our founders see as evidence that ordinary people are often more willing to cooperate across the line than their governments are. We have deliberately kept our teaching staff mixed, employing teachers who lived on both sides of the valley before the conflict, because we believe children recover a sense of normal life faster when their classroom itself reflects the community they actually live in, rather than one side of a political map. We are funded almost entirely by small individual donations from former residents of the valley now living abroad, supplemented by a modest grant from an international children\'s education fund. We have avoided larger government grants so far, because several were offered on condition that the school display only one government\'s flag or curriculum — a condition our founders refused, believing it would undo the very trust the school depends on. Eighteen months after reopening, attendance has grown from the original forty pupils to just over two hundred, and three students who fled the valley as young children have returned specifically to finish their final exams here. We consider the school\'s survival, not any political resolution, to be the true measure of whether the valley is recovering."',
  sourceZh:
    '“六年来，米伦谷唯一的中学一直半坍塌地矗立在停火线后方，窗户被木板封住，图书馆的屋顶也在冲突初期的一次袭击中塌陷。‘米伦之桥’是一家于2024年由三位教师创立的小型慈善机构，他们曾在冲突爆发前在山谷任教，并在停火一经允许便立刻返回。我们不去问这片山谷究竟属于哪个政府，也不对边界争端持任何立场。我们的创始人相信，无论其他问题多久悬而未决，一代孩子都不应该在大人们进行谈判的同时失去受教育的机会。每耽搁一个月不重建教室，就意味着又多了一个月被错过的考试、被错过的友谊，以及日后再也无法弥补的机会。我们的第一个项目——重新开放这所受损的中学——是从徒手清理瓦砾开始的，因为重型机械无法通过各个检查站运进来。停火线两侧的当地家庭每周都有人自愿前来出工，我们的创始人认为，这正说明普通民众往往比他们的政府更愿意跨越这条线彼此合作。我们特意让教师团队保持“混合”——聘用了冲突爆发前分别居住在山谷两侧的教师，因为我们相信，当教室本身真实反映出孩子们实际生活的社区，而不是政治地图上的某一侧时，孩子们能更快地找回正常生活的感觉。我们的资金几乎全部来自目前旅居海外的山谷前居民的小额个人捐款，并辅以一项来自国际儿童教育基金会的适度资助。目前为止，我们一直避免接受较大规模的政府拨款，因为其中有几笔拨款附带的条件是学校只能悬挂某一方政府的旗帜或采用某一方的课程——我们的创始人拒绝了这个条件，因为他们相信这样做会摧毁学校赖以生存的信任本身。重新开放十八个月后，在校学生人数已从最初的四十人增长到两百多人，还有三名当年逃离山谷的孩子，如今特意返回这里完成自己的毕业考试。我们认为，这所学校能否存续下去，而不是任何政治上的解决方案，才是衡量这片山谷是否真正走向恢复的真正标准。”',
  frameLinesEn: [
    '"One issue this organisation identifies is _______."',
    '"They value _______, because _______."',
    '"They see this as caused by _______."',
    '"One consequence they mention is _______."',
    '"To address this, they have taken action by _______."',
  ],
  frameLinesZh: [
    '“该组织指出的一个议题是 _______。”',
    '“他们看重 _______，因为 _______。”',
    '“他们认为这是由 _______ 造成的。”',
    '“他们提到的一个后果是 _______。”',
    '“为此，他们采取的行动是 _______。”',
  ],
  modelEn:
    "Bridges for Miren identifies a clear <strong>issue</strong>: children losing years of schooling while political negotiations continue, shown in the line \"a generation of children should not lose their education.\" They <strong>value</strong> neutrality and cross-community trust over political alignment, refusing government grants that came with conditions to favour one side. They frame the <strong>cause</strong> of the school's collapse as the earlier conflict itself, while presenting ordinary people's cooperation as evidence that the real barrier now is political, not personal. A key <strong>consequence</strong> they highlight is rising attendance, from forty to over two hundred pupils. Their main <strong>action</strong> has been rebuilding with local volunteer labour and deliberately mixing staff from both sides of the valley.",
  modelZh:
    '“米伦之桥”明确指出了一个<strong>议题</strong>：在政治谈判仍在继续的同时，孩子们正在失去宝贵的求学年月，正如文中所说“一代孩子都不应该……失去受教育的机会”。他们<strong>看重</strong>中立与跨社区信任，胜过政治立场的选边站队，因此拒绝了附带条件（偏袒某一方）的政府资助。他们将学校的损毁归因于此前的<strong>冲突</strong>本身，同时将普通民众之间的合作，描绘为如今真正的障碍在于政治而非人心的证据。他们提到的一个关键<strong>后果</strong>，是在校人数从四十人增长到两百多人。他们采取的主要<strong>行动</strong>，是依靠当地志愿劳动力重建学校，并特意让教师团队由山谷两侧的人员共同组成。',
};

/* ─────────── Self-check checklist ─────────── */
export const CHECKLIST_ITEMS: { en: string; zh: string }[] = [
  {
    en: 'I can name the four levels of perspective: global, national, local, and personal.',
    zh: '我能说出观点的四个层次：全球、国家、地方、个人。',
  },
  {
    en: 'I can state clearly whose perspective a statement represents.',
    zh: '我能清楚说明某段话代表的是谁的观点。',
  },
  {
    en: 'I can describe a perspective using multiple elements (issues, values, causes, consequences, actions), not just one.',
    zh: '我能运用多个要素（议题、价值观、原因、后果、行动）来描述一个观点，而不仅仅是一个要素。',
  },
  {
    en: 'I can back up each element with a specific word or detail from the source, not just my own general summary.',
    zh: '我能用资料中的具体词语或细节来支持每一个要素，而不仅仅是自己的概括。',
  },
  {
    en: 'I can identify a place where cultural background is shaping someone\'s perspective.',
    zh: '我能指出文化背景在何处影响了某人的观点。',
  },
  {
    en: 'I know the difference between "identify", "describe", and "explain" when analysing a perspective.',
    zh: '我知道分析一个观点时，“识别”(identify)、“描述”(describe) 和 “解释”(explain) 之间的区别。',
  },
  {
    en: 'I can apply this skill to an exam-style question using the real command word "describe".',
    zh: '我能在使用真实指令词“描述”(describe) 的应试式题目中运用这项技能。',
  },
];
