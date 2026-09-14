/**
 * Static content for the Q1(a) "First Read" tool — Paper 1 source-recall.
 * Anchored on real 2026 series past papers so students see the actual variety
 * of one-mark stems Cambridge writes.
 */

export interface WorkedItem {
  meta: string;
  topicEn: string;
  topicZh: string;
  stemEn: string;
  stemZh: string;
  /** Source snippet as the student sees it (short, quotable). */
  sourceEn: string;
  sourceZh: string;
  /** Accepted answers per the mark scheme, verbatim wording where possible. */
  acceptEn: string[];
  acceptZh: string[];
  /** What loses the mark, and why. */
  rejectEn: { answer: string; whyEn: string; whyZh: string }[];
  /** One-sentence take-away from this worked item. */
  lessonEn: string;
  lessonZh: string;
}

export const WORKED_ITEMS: WorkedItem[] = [
  {
    meta: 'June 2026 · Paper 12 · [1]',
    topicEn: 'Vehicle crime',
    topicZh: '车辆犯罪',
    stemEn: 'From Source 1, identify the average loss per vehicle theft in 2020.',
    stemZh: '根据资料 1，找出 2020 年每起车辆盗窃的平均损失金额。',
    sourceEn:
      "Between 2015 and 2020, vehicle theft in the country rose from 148,000 to 194,000 reported cases per year. The average financial loss per stolen vehicle, including recovery costs and replacement of contents, was $9166 in 2020 — up from $7420 five years earlier.",
    sourceZh:
      "2015 至 2020 年，该国报案的车辆盗窃案由每年 14.8 万起增至 19.4 万起。2020 年每辆被盗车辆的平均经济损失——含追回费用与车内物品重置——为 9166 美元，比五年前的 7420 美元上升。",
    acceptEn: ['$9166', '$9 166', '9166 dollars', 'nine thousand one hundred and sixty-six dollars'],
    acceptZh: ['$9166', '9166 美元', '九千一百六十六美元'],
    rejectEn: [
      {
        answer: '9166',
        whyEn: 'No units. The mark scheme says explicitly: "$ or dollars must be included to be awarded the mark."',
        whyZh: '没有单位。评分说明明确写道：「必须包含 $ 或 dollars 才能得分」。',
      },
      {
        answer: '$7420',
        whyEn: 'That was the loss five years earlier — the question specifies 2020.',
        whyZh: '这是五年前的数据——题目问的是 2020 年。',
      },
      {
        answer: 'about $9000',
        whyEn: 'Rounded off. The source gives the exact figure; copy it.',
        whyZh: '被四舍五入了。资料给了确切数字，照抄即可。',
      },
    ],
    lessonEn: 'When the question asks for a figure, give the exact figure with its units.',
    lessonZh: '题目问数字，就照抄确切数字并带上单位。',
  },
  {
    meta: 'June 2026 · Paper 11 · [1]',
    topicEn: 'Cooperatives worldwide',
    topicZh: '全球合作社',
    stemEn: 'According to Source 1, how many cooperatives are there in the world?',
    stemZh: '根据资料 1，全世界共有多少家合作社？',
    sourceEn:
      "Cooperatives are democratic, member-owned businesses that put people before profit. There are over three million cooperatives worldwide today, serving more than a billion members across every continent. The International Cooperative Alliance estimates the sector employs around 280 million people, roughly one in ten of the world's working population.",
    sourceZh:
      "合作社是以人为本、社员共有的民主型企业。目前全世界的合作社数量超过 300 万家，服务遍及各大洲、社员总数超过 10 亿。国际合作社联盟估计，该行业雇用约 2.8 亿人，约占全球劳动人口的十分之一。",
    acceptEn: ['Three million', '3,000,000', '3 000 000', '3 × 10⁶', 'Over three million', 'More than 3 million'],
    acceptZh: ['三百万', '300 万', '3,000,000', '3 × 10⁶', '超过三百万', '超过 300 万'],
    rejectEn: [
      {
        answer: '280 million',
        whyEn: 'That is the number of people employed, not the number of cooperatives.',
        whyZh: '这是「受雇人数」，不是「合作社数量」。',
      },
      {
        answer: '1 billion',
        whyEn: 'That is the number of members. Read the noun after the number.',
        whyZh: '这是「社员数」。请留意数字后面接的是哪个名词。',
      },
    ],
    lessonEn: 'The source often contains several nearby numbers. Match the number to the exact noun in the question.',
    lessonZh: '资料里常常有好几个相近的数字。找出题目所问的名词，再匹配对应的数字。',
  },
  {
    meta: 'June 2026 · Paper 13 · [1]',
    topicEn: 'Global sports spending',
    topicZh: '全球体育支出',
    stemEn: 'According to Source 1, how much was spent worldwide on sports activities in 2022?',
    stemZh: '根据资料 1，2022 年全球在体育活动方面的支出是多少？',
    sourceEn:
      "The economic footprint of sport is growing fast. Worldwide spending on sports activities reached $1.5 trillion in 2022, up from $1.1 trillion in 2017. The largest single share comes from Asia-Pacific markets, which accounted for roughly 34% of global spending last year.",
    sourceZh:
      "体育行业的经济规模正快速扩张。2022 年全球体育活动支出达 1.5 万亿美元，高于 2017 年的 1.1 万亿美元。其中亚太市场为最大单一板块，去年约占全球支出的 34%。",
    acceptEn: ['$1.5 trillion', '1.5 trillion dollars', '$1,500,000,000,000'],
    acceptZh: ['$1.5 万亿', '1.5 万亿美元', '一点五万亿美元'],
    rejectEn: [
      {
        answer: '1.5 trillion',
        whyEn: 'No units. Mark scheme: "Units must be included – $ or dollars – to be awarded the mark."',
        whyZh: '没有单位。评分说明：「必须包含 $ 或 dollars 才能得分」。',
      },
      {
        answer: '$1.1 trillion',
        whyEn: 'That is the 2017 figure. The question specifies 2022.',
        whyZh: '这是 2017 年的数据——题目问的是 2022 年。',
      },
      {
        answer: '34%',
        whyEn: 'That is a share, not the total spend the question asked for.',
        whyZh: '这是占比，不是题目所问的总支出。',
      },
    ],
    lessonEn: 'Year, unit, noun — check all three before you write your answer.',
    lessonZh: '年份、单位、名词——写答案之前三样都要核对。',
  },
  {
    meta: 'March 2026 · Paper 12 · [1]',
    topicEn: 'Global urban population',
    topicZh: '全球城市人口',
    stemEn: 'Using Source 1, identify the trend in the global urban population.',
    stemZh: '根据资料 1，找出全球城市人口的变化趋势。',
    sourceEn:
      "In 1960, roughly one in three people lived in a city. Today it is more than half, and by 2050 the United Nations projects that around two-thirds of humanity will live in urban areas.",
    sourceZh:
      "1960 年，约每三人中就有一人住在城市。今天这一比例已超过一半；联合国预计到 2050 年，全球约三分之二的人口将住在城市地区。",
    acceptEn: ['Going up', 'Increasing', 'Rising', 'Growing'],
    acceptZh: ['上升', '增加', '上升中', '不断上升'],
    rejectEn: [
      {
        answer: 'It is more than half',
        whyEn: 'That is a snapshot of today, not a trend. A trend describes the direction over time.',
        whyZh: '这是当今的一个截图，不是趋势。「趋势」描述的是随时间变化的方向。',
      },
      {
        answer: 'Two-thirds by 2050',
        whyEn: 'That is a projection for one year, not the shape of the change across time.',
        whyZh: '这是某一年的预测数值，不是整段时间内的变化形态。',
      },
      {
        answer: 'People are moving to cities because of jobs',
        whyEn: 'That is a cause of the trend, not the trend itself. The question just wants the direction.',
        whyZh: '这是造成趋势的「原因」，不是趋势本身。题目只要方向。',
      },
    ],
    lessonEn: 'A "trend" is a direction word: rising, falling, stable. Not a snapshot, not a cause.',
    lessonZh: '「趋势」是一个方向词：上升、下降、稳定。不是某一时点的数值，也不是原因。',
  },
];

/* ─────────── The Anatomy tab: parts of a Q1(a) stem ─────────── */

export interface AnatomyPart {
  label: string;
  labelZh: string;
  swatch: string; // one-word example
  explainEn: string;
  explainZh: string;
}

/** Colour-coded parts of a typical Q1(a) stem. */
export const ANATOMY_EXAMPLE_EN =
  'From Source 1, identify the average loss per vehicle theft in 2020.';
export const ANATOMY_EXAMPLE_ZH = '根据资料 1，找出 2020 年每辆车被盗的平均损失金额。';

export const ANATOMY_PARTS: AnatomyPart[] = [
  {
    label: 'The source',
    labelZh: '出处',
    swatch: '"From Source 1"',
    explainEn:
      "Tells you which source to read. Not the whole insert — one named source. If you quote from Source 2 for a Source 1 question, the mark cannot be given, even if the number is right.",
    explainZh:
      "告诉你要读哪一份资料。不是整份 insert，而是一份指定的资料。若题目问的是资料 1，而你从资料 2 引用数字，即便数字正确也无法得分。",
  },
  {
    label: 'The command',
    labelZh: '指令词',
    swatch: '"identify" / "state" / "give"',
    explainEn:
      'The lowest tier of Cambridge command word. You are being asked to name a fact, not to explain, describe, or evaluate it. Extra explanation earns no extra mark and can slow you down for later, higher-mark questions.',
    explainZh:
      '这是剑桥指令词中最低级的一档。只要你说出一个事实，不需要解释、描述或评价。多写解释不会加分，反而会拖累你后面高分题的时间。',
  },
  {
    label: 'The noun',
    labelZh: '关键名词',
    swatch: '"the average loss"',
    explainEn:
      "This is the exact thing you must match in the source. Not 'the loss', not 'the total loss' — 'the average loss'. One word off and you can lock onto the wrong figure.",
    explainZh:
      '这是你必须在资料中精确匹配的对象。不是「损失」，也不是「总损失」，而是「平均损失」。差一个字，就可能锁定错误的数字。',
  },
  {
    label: 'The qualifier',
    labelZh: '限定条件',
    swatch: '"per vehicle theft in 2020"',
    explainEn:
      "The narrowing clause. Time, place, unit, sub-group — whatever the qualifier says, it must match. In 2020, not 2015. Per theft, not total. Ignore it and you'll pick a related but wrong number.",
    explainZh:
      '限定的从句。时间、地点、单位、子群体——限定说什么，就必须符合什么。2020 年，不是 2015 年；每起，不是总数。忽略限定，就会选到相关但错误的数字。',
  },
];

/* ─────────── The Traps tab: five common ways to lose the mark ─────────── */

export interface Trap {
  key: string;
  labelEn: string;
  labelZh: string;
  explainEn: string;
  explainZh: string;
  wrongEn: string;
  rightEn: string;
}

export const TRAPS: Trap[] = [
  {
    key: 'units',
    labelEn: 'Dropping the units',
    labelZh: '丢单位',
    explainEn:
      'The mark scheme repeats this rule on almost every money or measurement question: units are non-negotiable. "$" is a unit. "%" is a unit. "million" is a unit. Missing a unit = missing the mark.',
    explainZh:
      '几乎每一道涉及金额或度量的题目，评分说明都反复写：单位是不能省的。"$" 是单位。"%" 是单位。"million" 是单位。少一个单位——少一个分。',
    wrongEn: '9166',
    rightEn: '$9166',
  },
  {
    key: 'nearby',
    labelEn: 'The nearby number',
    labelZh: '附近的数字',
    explainEn:
      'The source usually gives you several numbers within a paragraph. If you skim, you may write down the number in the sentence before the one you were asked about. Read the noun in the question first, then hunt for that noun in the source.',
    explainZh:
      '资料通常在同一段落里给出好几个数字。如果你只是「扫」过去，就很可能把题目所问句子前一句的数字写下来。请先看题目问的是哪个名词，再回到资料里找这个名词。',
    wrongEn: '$7420 (that was the 2015 figure)',
    rightEn: '$9166 (the 2020 figure the question asked for)',
  },
  {
    key: 'overwrite',
    labelEn: 'Over-writing',
    labelZh: '答太多',
    explainEn:
      'Q1(a) is 1 mark and one blank line. Extra explanation earns nothing and eats time you need for the 8-mark and 16-mark questions later on the paper. Answer, full stop, move on.',
    explainZh:
      '第 1(a) 题只有 1 分，答题空间只有一行。多写不会加分，还会挤占后面 8 分题和 16 分题的时间。写答案，加句号，翻页。',
    wrongEn:
      '$9166. This was up from $7420 five years earlier, which shows that vehicle crime is becoming more expensive per case, likely because…',
    rightEn: '$9166.',
  },
  {
    key: 'paraphrase',
    labelEn: 'Paraphrasing when you should copy',
    labelZh: '该抄不抄',
    explainEn:
      'When the source gives you the exact word or number, use the exact word or number. Rewriting "$1.5 trillion" as "roughly $1.5 tn" or "about 1500 billion dollars" only opens room for the examiner to doubt whether you copied it correctly.',
    explainZh:
      '资料给了确切的词或数字，就照抄。把 "$1.5 trillion" 改写成 "大约 1.5 tn" 或 "约 1500 亿美元"，只会给考官留下你抄错的空间。',
    wrongEn: 'about 1.5 tn USD',
    rightEn: '$1.5 trillion',
  },
  {
    key: 'trend',
    labelEn: 'Answering the wrong question type',
    labelZh: '答非所问',
    explainEn:
      'A "trend" question wants a direction word (rising, falling, stable). A "figure" question wants a number with units. A "when" question wants a year. Match the answer type to the question type before you write anything.',
    explainZh:
      '「趋势 (trend)」题想要方向词（rising / falling / stable）；「数字」题想要带单位的数字；「时间 (when)」题想要一个年份。动笔前先把「答案类型」与「问题类型」对上号。',
    wrongEn: 'People are moving to cities because they want jobs.',
    rightEn: 'Rising.',
  },
];

/* ─────────── Practice tab: original 1-mark items in the Cambridge style ─────────── */

export interface PracticeItem {
  n: number;
  topicEn: string;
  topicZh: string;
  sourceLabelEn: string;
  sourceLabelZh: string;
  sourceEn: string;
  sourceZh: string;
  stemEn: string;
  stemZh: string;
  acceptEn: string[];
  acceptZh: string[];
  /** What to look for when marking yourself. */
  markingEn: string;
  markingZh: string;
}

export const PRACTICE_ITEMS: PracticeItem[] = [
  {
    n: 1,
    topicEn: 'Renewable electricity',
    topicZh: '可再生能源发电',
    sourceLabelEn: 'SOURCE 1 — International Energy Agency briefing (extract)',
    sourceLabelZh: '资料 1 —— 国际能源署简报（节选）',
    sourceEn:
      "Global renewable electricity capacity grew by 507 gigawatts in 2023, roughly 50% higher than the growth recorded in 2022. Solar photovoltaic installations alone accounted for three-quarters of the increase. China added more solar capacity in 2023 than the entire world added in 2022.",
    sourceZh:
      "2023 年全球可再生电力装机新增 507 吉瓦，比 2022 年的新增量高出约 50%。仅太阳能光伏一项就占新增量的四分之三。2023 年，中国新增的太阳能装机比 2022 年全球的新增量还要多。",
    stemEn: 'From Source 1, identify how much global renewable electricity capacity grew in 2023.',
    stemZh: '根据资料 1，找出 2023 年全球可再生电力装机的新增量。',
    acceptEn: ['507 gigawatts', '507 GW', '507 gigawatt'],
    acceptZh: ['507 吉瓦', '507 GW'],
    markingEn: 'Units are required. "507" alone would not earn the mark.',
    markingZh: '必须写单位。只写 "507" 得不到分。',
  },
  {
    n: 2,
    topicEn: 'Youth unemployment',
    topicZh: '青年失业',
    sourceLabelEn: 'SOURCE 1 — International Labour Organisation report',
    sourceLabelZh: '资料 1 —— 国际劳工组织报告',
    sourceEn:
      "The global youth unemployment rate stood at 13.3% in 2023, the lowest level recorded in fifteen years. This compares with a peak of 15.9% in 2020, when the pandemic disrupted labour markets around the world. Regional variation, however, remains stark: youth unemployment in North Africa was above 25% throughout the same period.",
    sourceZh:
      "2023 年全球青年失业率为 13.3%，为十五年来最低水平。这一数字低于 2020 年的高点 15.9%——当年疫情扰乱了全球劳动力市场。然而地区差异仍然明显：同一时期北非的青年失业率始终高于 25%。",
    stemEn: 'According to Source 1, what was the global youth unemployment rate in 2023?',
    stemZh: '根据资料 1，2023 年全球青年失业率是多少？',
    acceptEn: ['13.3%', '13.3 per cent', '13.3 percent'],
    acceptZh: ['13.3%', '百分之十三点三'],
    markingEn: 'The "%" is a unit. 13.3 without it will not earn the mark. 15.9% is the wrong year.',
    markingZh: '「%」是单位，只写 13.3 不得分。15.9% 是另一个年份的数据。',
  },
  {
    n: 3,
    topicEn: 'Rainforest loss',
    topicZh: '雨林损失',
    sourceLabelEn: 'SOURCE 1 — World Resources Institute forest tracker',
    sourceLabelZh: '资料 1 —— 世界资源研究所森林监测',
    sourceEn:
      "Between 2001 and 2022, the world lost an area of primary tropical rainforest larger than the country of France. Loss peaked in 2016 and has fluctuated since; in 2022 alone, 4.1 million hectares of primary rainforest were destroyed, an area roughly the size of Switzerland.",
    sourceZh:
      "2001 至 2022 年间，全球损失的原始热带雨林面积超过法国国土面积。损失峰值出现在 2016 年，之后有升有降；仅 2022 年就有 410 万公顷原始雨林遭到破坏，面积约相当于瑞士。",
    stemEn: 'From Source 1, identify the area of primary rainforest destroyed in 2022.',
    stemZh: '根据资料 1，找出 2022 年遭破坏的原始雨林面积。',
    acceptEn: ['4.1 million hectares', '4,100,000 hectares', '4.1 million ha'],
    acceptZh: ['410 万公顷', '4.1 million hectares'],
    markingEn: '"An area the size of Switzerland" is a comparison, not the figure. "4.1 million" without units is not enough.',
    markingZh: '「相当于瑞士的面积」是打比方，不是数字。「410 万」若不带单位则不得分。',
  },
  {
    n: 4,
    topicEn: 'Water access',
    topicZh: '饮水普及',
    sourceLabelEn: 'SOURCE 1 — UN-Water 2023 update',
    sourceLabelZh: '资料 1 —— 联合国水资源计划 2023 年度更新',
    sourceEn:
      "Between 2000 and 2022, the number of people worldwide without access to safely managed drinking water fell from 3.9 billion to 2.2 billion. Nevertheless, the trend has slowed since 2015, and at current rates the target of universal access by 2030 will not be met.",
    sourceZh:
      "2000 至 2022 年间，全球没有安全饮用水的人口从 39 亿降至 22 亿。然而自 2015 年起进展有所放缓，按目前速度，到 2030 年全民普及的目标将无法实现。",
    stemEn: 'Using Source 1, identify the trend in the number of people worldwide without safely managed drinking water between 2000 and 2022.',
    stemZh: '根据资料 1，找出 2000 至 2022 年间全球没有安全饮用水人口数的变化趋势。',
    acceptEn: ['Falling', 'Decreasing', 'Going down', 'Declining'],
    acceptZh: ['下降', '减少', '下滑'],
    markingEn: 'A trend word — direction, not numbers. "3.9 billion to 2.2 billion" alone is the evidence for the trend, not the trend itself.',
    markingZh: '要一个方向词，不是数字。「39 亿降至 22 亿」是「趋势」的证据，而不是「趋势」本身。',
  },
  {
    n: 5,
    topicEn: 'Vaccination coverage',
    topicZh: '疫苗接种覆盖率',
    sourceLabelEn: 'SOURCE 1 — World Health Organization progress report',
    sourceLabelZh: '资料 1 —— 世界卫生组织进展报告',
    sourceEn:
      "Global coverage with three doses of the diphtheria-tetanus-pertussis (DTP) vaccine reached 84% of infants in 2022, up from 81% the previous year but still below the pre-pandemic peak of 86% recorded in 2019. Around 20.5 million infants missed out on at least one dose in 2022.",
    sourceZh:
      "2022 年全球接种三剂白喉—破伤风—百日咳 (DTP) 疫苗的婴儿覆盖率达 84%，高于前一年的 81%，但仍低于疫情前 2019 年的 86% 高峰。2022 年约有 2050 万名婴儿至少漏打一剂。",
    stemEn: 'According to Source 1, what percentage of infants received three doses of the DTP vaccine in 2022?',
    stemZh: '根据资料 1，2022 年接种三剂 DTP 疫苗的婴儿占多少百分比？',
    acceptEn: ['84%', '84 per cent', '84 percent'],
    acceptZh: ['84%', '百分之八十四'],
    markingEn: '"81%" is the previous year, "86%" is 2019. The year in the question narrows it to 84%.',
    markingZh: '81% 是前一年，86% 是 2019 年。题目问的是 2022 年——只有 84% 符合。',
  },
  {
    n: 6,
    topicEn: 'Reading for pleasure',
    topicZh: '休闲阅读',
    sourceLabelEn: 'SOURCE 1 — National literacy survey (extract)',
    sourceLabelZh: '资料 1 —— 全国识字调查（节选）',
    sourceEn:
      "In a national survey of 3,200 children aged 8 to 14, 28% said they read for pleasure daily in 2023, compared with 43% in a similar survey conducted in 2013. Girls were more likely to read daily than boys (33% vs 23%), and the sharpest drop over the decade was among 12- to 14-year-olds, whose daily reading rate more than halved.",
    sourceZh:
      "在一份覆盖 3200 名 8 至 14 岁儿童的全国调查中，2023 年有 28% 的孩子每天为兴趣阅读；相比之下，2013 年一份类似调查显示这一比例为 43%。女生每天阅读的比例高于男生（33% 对 23%），十年内下降最快的群体是 12 至 14 岁儿童，其每日阅读比例减少一半以上。",
    stemEn: 'From Source 1, identify the percentage of children aged 8 to 14 who read for pleasure daily in 2023.',
    stemZh: '根据资料 1，找出 2023 年 8 至 14 岁儿童中每天为兴趣阅读的比例。',
    acceptEn: ['28%', '28 per cent', '28 percent'],
    acceptZh: ['28%', '百分之二十八'],
    markingEn: '43% is a decade earlier. 33% / 23% are the gendered sub-groups. 28% is the headline 2023 figure.',
    markingZh: '43% 是十年前的数据；33% / 23% 是按性别划分的子群体。28% 才是 2023 年的主数据。',
  },
];

/* ─────────── Checklist tab ─────────── */

export interface CheckItem {
  en: string;
  zh: string;
}

export const CHECKLIST: CheckItem[] = [
  {
    en: 'I read the source named in the question before I looked at the source next to it.',
    zh: '我先读题目指定的那份资料，然后再看旁边的资料。',
  },
  {
    en: 'I underlined the exact noun and qualifier in the question (e.g. average loss, in 2020).',
    zh: '我在题目里划出了确切的名词和限定条件（例如：平均损失、2020 年）。',
  },
  {
    en: 'I checked whether the answer type should be a figure, a direction word, a year, or a name.',
    zh: '我确认了要写的是数字、方向词、年份，还是一个名称。',
  },
  {
    en: 'If the answer was a figure, I copied its units exactly ($, %, million, hectares).',
    zh: '如果答案是数字，我原样抄下了单位（$、%、million、hectares）。',
  },
  {
    en: 'I resisted the urge to explain. Q1(a) is one line, one mark, one fact.',
    zh: '我克制住了「多解释」的冲动。第 1(a) 题就是一行、一分、一个事实。',
  },
  {
    en: 'I finished Q1(a) in under a minute, leaving me time for the 6-, 8-, and 16-mark questions.',
    zh: '我在一分钟内做完了第 1(a) 题，留出时间给 6 分、8 分、16 分题。',
  },
];
