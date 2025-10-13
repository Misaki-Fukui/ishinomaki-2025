import type {
  AnswerContent,
  CountdownContent,
  HomeContent,
  QuestionContent,
  RankingContent,
} from "./types";

// Data maps keyed by directory name (e.g. "Answer1", "Question3").
export const answerContents: Record<string, AnswerContent> = {
  Answer1: {
    id: "Answer1",
    questionId: "Question1",
    shortAnswer: "石ノ森章太郎",
    lead: "石ノ森萬画館は、漫画家の石ノ森章太郎さんを記念して作られました。",
    paragraphs: [
      "石ノ森先生は「漫画」を「萬画」と表現しました。",
      "石ノ森萬画館は、このような萬画家（マンガ家）石ノ森章太郎先生の作品と理念を通して、来館した方々に石ノ森先生の数々の作品をあらゆる角度からご覧いただく事で、マンガの可能性を体験し学んでもらう事を目的としたマンガミュージアムとなっています。",
      "石ノ森萬画館外観は石ノ森章太郎原案の宇宙船をイメージして建設された。",
    ],
    image: "/contents/Answer1/image.png",
    imageAlt: "石ノ森萬画館の外観",
    orientation: "portrait",
    nextHref: "/contents/Question2",
  },
  Answer2: {
    id: "Answer2",
    questionId: "Question2",
    shortAnswer: "サバ",
    lead:
      "石巻ラーメン「サバだしラーメン」は、石巻市飯野川地区発祥のご当地ラーメンです。",
    paragraphs: [
      "石巻は漁業がさかんで、特にサバがたくさんとれる地域です。",
      "そのため、昔からサバのうま味を生かしたスープが作られてきました。",
      "あっさりしていながらコクがある味わいが、石巻ラーメンの魅力です。",
    ],
    image: "/contents/Answer2/image.png",
    orientation: "landscape",
    nextHref: "/contents/Question3",
  },
  Answer3: {
    id: "Answer3",
    questionId: "Question3",
    shortAnswer: "金華山道",
    lead:
      "石巻の金華山道は、2022年7月に「金華山詣」と共に日本遺産「みちのくGOLD浪漫」に追加認定されました。",
    paragraphs: [
      "① 信仰の道としての歴史的価値",
      "古くから多くの人々が金華山の黄金山神社にお参りするために歩いた道で、東北の人々の「金への信仰」や「自然への敬意」を今に伝えています。",
      "② 産金の歴史との深いつながり",
      "金華山は日本最古の金産出地のひとつとされ、奈良・平安時代から「黄金の国ジパング」と呼ばれるきっかけとなった地域。金華山道はその産金と信仰を結ぶ象徴的な道です。",
    ],
    image: "/contents/Answer3/image.png",
    orientation: "landscape",
    nextHref: "/contents/Question4",
  },
  Answer4: {
    id: "Answer4",
    questionId: "Question4",
    shortAnswer: "笹かまぼこ",
    lead: "石巻の笹かまぼこは、宮城県を代表する伝統的な水産加工品。",
    paragraphs: [
      "・白謙かまぼこ店など、創業100年以上の老舗が多く、地域に深く根付いている。",
      "・新鮮な魚のすり身を使用し、余計な添加物を加えず、職人の技で仕上げている。",
      "・ふわふわでプリプリとした食感が特徴。",
      "・魚本来の旨みと甘みを引き出した、絶妙な味わいが楽しめる。",
    ],
    image: "/contents/Answer4/image.png",
    orientation: "landscape",
    nextHref: "/contents/Question5",
  },
  Answer5: {
    id: "Answer5",
    questionId: "Question5",
    shortAnswer: "宮城県の石巻魚市場",
    lead:
      "東日本大震災の被害から再建された石巻売場が、「最も長い魚市場」として令和3年9月21日にギネス世界記録に認定されました。",
    paragraphs: [
      "石巻市は全国でも有数の水揚げ量を誇る港町で、この市場では毎日たくさんの魚が取引され、日本の水産業を支えています。",
      "特に有名なのが以下の魚たちです：",
      "・カツオ（初夏から秋）",
      "・サンマ（秋）",
      "・サバ（通年）",
      "・イワシ、サケ、ホヤ、カレイ、タコ、スルメイカなど",
    ],
    image: "/contents/Answer5/image.png",
    orientation: "portrait",
    nextHref: "/contents/Question6",
  },
  Answer6: {
    id: "Answer6",
    questionId: "Question6",
    shortAnswer: "金華サバ",
    lead:
      "「金華サバ」は、三陸沖の金華山周辺の、特に栄養豊富な漁場で獲れるサバのことで、極めて脂の乗りが良いのが特徴です。",
    paragraphs: [
      "・地域ブランド: 宮城県石巻市の漁港で水揚げされる、一定の基準を満たしたサバだけが、このブランド名で呼ばれます。",
      "・特徴: 通常のサバよりもはるかに高い脂質含有量を持ち、その品質の高さから、石巻の高級ブランド魚として全国的に有名です。",
    ],
    image: "/contents/Answer6/image.png",
    orientation: "portrait",
    nextHref: "/contents/Question7",
  },
  Answer7: {
    id: "Answer7",
    questionId: "Question7",
    shortAnswer: "石ノ森章太郎",
    lead:
      "石ノ森章太郎は、宮城県石巻市出身の、日本を代表する漫画家の一人です。",
    paragraphs: [
      "SF、ギャグ、時代劇、少女漫画など、あらゆるジャンルで革新的な作品を発表し、「漫画の王様」とも呼ばれました。",
      "『サイボーグ009』や『仮面ライダー』シリーズの生みの親として特に有名です。",
    ],
    image: "/contents/Answer7/image.png",
    orientation: "portrait",
    nextHref: "/contents/Question8",
  },
  Answer8: {
    id: "Answer8",
    questionId: "Question8",
    shortAnswer: "赤飯まんじゅう",
    lead:
      "石巻赤飯まんじゅうとは、ほんのり甘い皮の中に赤飯が包まれた、宮城県石巻市発祥の和菓子です。",
    paragraphs: [
      "・一般的な饅頭の「あんこ」の代わりに、ほんのり甘く蒸したお赤飯（もち米）が入っている。",
      "・ふんわりと優しい甘さの薄皮と、モチモチとしたお赤飯の食感が組み合わさっている。",
      "・甘さと、お赤飯の持つ程よい塩気が絶妙なバランスを生み出している。",
    ],
    image: "/contents/Answer8/image.png",
    orientation: "landscape",
    nextHref: "/contents/Question9",
  },
  Answer9: {
    id: "Answer9",
    questionId: "Question9",
    shortAnswer: "石巻港",
    lead: "慶長遣欧使節団が出航したのは、石巻港です。",
    paragraphs: [
      "1613年、伊達政宗が派遣した慶長遣欧使節団は、支倉常長らを乗せた船「サン・ファン・バウティスタ号」で、石巻港からメキシコ・スペインへと出航しました。",
      "この航海は、日本とヨーロッパを結ぶ歴史的な大航海として知られ、石巻はその出発地として重要な役割を果たしました。",
    ],
    image: "/contents/Answer9/image.png",
    orientation: "landscape",
    nextHref: "/contents/Question10",
  },
  Answer10: {
    id: "Answer10",
    questionId: "Question10",
    shortAnswer: "サン・ファン・バウティスタ号",
    lead:
      "サン・ファン・バウティスタ号は、慶長遣欧使節団を乗せて石巻からヨーロッパへ向かったガレオン船を復元したものです。",
    paragraphs: [
      "この船は、1613年に伊達政宗の命で建造され、支倉常長らを乗せて太平洋を渡りました。",
      "現在は石巻市の「サン・ファン館」で復元船が展示されており、日本と世界を結んだ歴史を伝えています。",
    ],
    image: "/contents/Answer10/image.png",
    orientation: "portrait",
    nextHref: "/contents/Question11",
  },
  Answer11: {
    id: "Answer11",
    questionId: "Question11",
    shortAnswer: "宮城県慶長使節船ミュージアム",
    lead:
      "宮城県慶長使節船ミュージアム（サン・ファン館）は、伊達政宗の命を受けてヨーロッパへ渡った慶長遣欧使節団の歴史を伝える博物館です。",
    paragraphs: [
      "ここでは、支倉常長らが乗ってヨーロッパへ旅立ったガレオン船「サン・ファン・バウティスタ号」の実物大復元船が展示されていました。",
      "展示館内では、当時の造船技術、航海の記録、国際交流の歴史などがわかりやすく紹介され、日本と世界を繋いだ壮大な冒険の物語を体感できる施設として人気があります。",
    ],
    image: "/contents/Answer11/image.png",
    orientation: "landscape",
    nextHref: "/contents/Ranking2",
    nextLabel: "ランキングへ",
  },
};

export const questionContents: Record<string, QuestionContent> = {
  Question1: {
    id: "Question1",
    title: "第1問",
    question:
      "石巻市にある「石ノ森萬画館」は、以下の誰を記念し建設しましたか？",
    choices: [
      { id: "a", label: "石ノ森健太郎" },
      { id: "b", label: "石ノ森章太郎" },
      { id: "c", label: "石ノ森萬太郎" },
    ],
    image: "/contents/Question1/image-3.png",
    progressLabel: "質問 1/11",
    timerSeconds: 5,
    nextHref: "/contents/Answer1",
    correctChoiceId: "b",
  },
  Question2: {
    id: "Question2",
    title: "第2問",
    question:
      "石巻ラーメンの出汁（だし）のベースとして、最も伝統的で多く使われているのは以下のどれですか？",
    choices: [
      { id: "a", label: "豚骨" },
      { id: "b", label: "かつお節" },
      { id: "c", label: "サバ" },
    ],
    image: "/contents/Question2/image-3.png",
    progressLabel: "質問 2/11",
    timerSeconds: 5,
    nextHref: "/contents/Answer2",
    correctChoiceId: "c",
  },
  Question3: {
    id: "Question3",
    title: "第3問",
    question:
      "以下の選択肢の中で、石巻の「日本遺産」にも認定されている歴史的な名所・道はどれですか？",
    choices: [
      { id: "a", label: "石ノ森萬画館" },
      { id: "b", label: "金華山道" },
      { id: "c", label: "永巌寺" },
    ],
    image: "/contents/Question3/image-3.png",
    progressLabel: "質問 3/11",
    timerSeconds: 5,
    nextHref: "/contents/Answer3",
    correctChoiceId: "b",
  },
  Question4: {
    id: "Question4",
    title: "第4問",
    question:
      "皆さんは「TheGrandHotel」で食べた朝食の中で、石巻の名物は以下のどれですか？",
    choices: [
      { id: "a", label: "なめこ味噌汁" },
      { id: "b", label: "笹かまぼこ" },
      { id: "c", label: "ひじき煮" },
    ],
    image: "/contents/Question4/image-3.png",
    progressLabel: "質問 4/11",
    timerSeconds: 5,
    nextHref: "/contents/Answer4",
    correctChoiceId: "b",
  },
  Question5: {
    id: "Question5",
    title: "第5問",
    question:
      "ギネス世界記録に「最も長い魚市場」として認定されている、全長875.47メートルを誇る日本の魚市場はどこでしょう？",
    choices: [
      { id: "a", label: "東京都の豊洲市場" },
      { id: "b", label: "宮城県の石巻魚市場" },
      { id: "c", label: "北海道の函館朝市" },
    ],
    image: "/contents/Question5/image-3.png",
    progressLabel: "質問 5/11",
    timerSeconds: 5,
    nextHref: "/contents/Answer5",
    correctChoiceId: "b",
  },
  Question6: {
    id: "Question6",
    title: "第6問",
    question:
      "三陸沖の金華山周辺で獲れる、特に脂の乗りが良いことで知られ、石巻の高級ブランドとして有名なサバは何と呼ばれていますか？",
    choices: [
      { id: "a", label: "金華サバ" },
      { id: "b", label: "石巻マグロ" },
      { id: "c", label: "三陸サバ" },
    ],
    image: "/contents/Question6/image-3.png",
    timerSeconds: 5,
    nextHref: "/contents/Answer6",
    correctChoiceId: "a",
  },
  Question7: {
    id: "Question7",
    title: "第7問",
    question:
      "石巻市出身で、『サイボーグ009』や『仮面ライダー』など数多くの人気作品を生み出した、日本の有名な漫画家は誰でしょう？",
    choices: [
      { id: "a", label: "石ノ森章太郎" },
      { id: "b", label: "鳥山明" },
      { id: "c", label: "藤子・F・不二雄" },
    ],
    image: "/contents/Question7/image-3.png",
    timerSeconds: 5,
    nextHref: "/contents/Answer7",
    correctChoiceId: "a",
  },
  Question8: {
    id: "Question8",
    title: "第8問",
    question: "石巻のお土産として有名なもちもちおまんじゅうは何でしょう？",
    choices: [
      { id: "a", label: "赤飯まんじゅう" },
      { id: "b", label: "こしあんまんじゅう" },
      { id: "c", label: "黒糖まんじゅう" },
    ],
    image: "/contents/Question8/image-3.png",
    timerSeconds: 5,
    nextHref: "/contents/Answer8",
    correctChoiceId: "a",
  },
  Question9: {
    id: "Question9",
    title: "第9問",
    question:
      "慶長遣欧使節団がヨーロッパへ向けて出航した、石巻の港の名前は何でしょう？",
    choices: [
      { id: "a", label: "気仙沼港" },
      { id: "b", label: "石巻港" },
      { id: "c", label: "松島港" },
    ],
    image: "/contents/Question9/image-3.png",
    timerSeconds: 5,
    nextHref: "/contents/Answer9",
    correctChoiceId: "b",
  },
  Question10: {
    id: "Question10",
    title: "第10問",
    question:
      "慶長遣欧使節団を乗せ、石巻からヨーロッパへ向けて出航したガレオン船を復元した船の名前は何でしょう？",
    choices: [
      { id: "a", label: "日本丸" },
      { id: "b", label: "黒船（サスケハナ号）" },
      { id: "c", label: "サン・ファン・バウティスタ号" },
    ],
    image: "/contents/Question10/image-3.png",
    timerSeconds: 5,
    nextHref: "/contents/Answer10",
    correctChoiceId: "c",
  },
  Question11: {
    id: "Question11",
    title: "第11問",
    question:
      "江戸時代初期、伊達政宗の命を受け、ヨーロッパへ渡った使節団が乗った復元船が展示されていた博物館は何でしょう？",
    choices: [
      { id: "a", label: "宮城県慶長使節船ミュージアム" },
      { id: "b", label: "東北歴史博物館" },
      { id: "c", label: "みちのく伊達政宗歴史館" },
    ],
    image: "/contents/Question11/image-3.png",
    timerSeconds: 5,
    nextHref: "/contents/Answer11",
    correctChoiceId: "a",
  },
};

export const countdownContents: Record<string, CountdownContent> = {
  Countdown1: {
    id: "Countdown1",
    title: "Ready?",
    body: "手をあたためて、カメラに向かって大きく動いてみましょう。",
    countFrom: 3,
    nextHref: "/contents/Countdown2",
    nextLabel: "つぎへ",
  },
  Countdown2: {
    id: "Countdown2",
    title: "Ready?",
    body: "もう少しでスタートです。深呼吸してそのまま待機してください。",
    countFrom: 2,
    nextHref: "/contents/Countdown3",
    nextLabel: "つぎへ",
  },
  Countdown3: {
    id: "Countdown3",
    title: "Ready?",
    body: "ラスト1秒。笑顔でスタートを迎えましょう！",
    countFrom: 1,
    nextHref: "/contents/Countdown_over",
    nextLabel: "スタート！",
  },
  Countdown_over: {
    id: "Countdown_over",
    title: "START!",
    body: "準備完了。さあ、クイズを始めましょう。",
    countFrom: 0,
    nextHref: "/contents/Question1",
    nextLabel: "第1問へ",
  },
};

export const rankingContents: Record<string, RankingContent> = {
  Ranking1: {
    id: "Ranking1",
    title: "石巻に移住しちゃう ?",
    subtitle: "チームのスコアを確認してみましょう",
    entries: [
      { teamName: "Team 1", correctCount: 5, totalQuestions: 11, elapsedSeconds: 42 },
      { teamName: "Team 2", correctCount: 4, totalQuestions: 11, elapsedSeconds: 55 },
      { teamName: "Team 3", correctCount: 4, totalQuestions: 11, elapsedSeconds: 63 },
      { teamName: "Team 4", correctCount: 3, totalQuestions: 11, elapsedSeconds: 58 },
      { teamName: "Team 5", correctCount: 2, totalQuestions: 11, elapsedSeconds: 71 },
    ],
    nextHref: "/",
    nextLabel: "ホームへ戻る",
    ctaLabel: "もう一度挑戦する",
  },
  Ranking2: {
    id: "Ranking2",
    title: "ランキング",
    subtitle: "参加チームの成績一覧",
    entries: [
      { teamName: "Blue Ocean", correctCount: 5, totalQuestions: 11, elapsedSeconds: 40 },
      { teamName: "Ishinomaki Stars", correctCount: 4, totalQuestions: 11, elapsedSeconds: 47 },
      { teamName: "Manga Lovers", correctCount: 4, totalQuestions: 11, elapsedSeconds: 52 },
      { teamName: "San Juan", correctCount: 3, totalQuestions: 11, elapsedSeconds: 60 },
      { teamName: "Team Dolphin", correctCount: 2, totalQuestions: 11, elapsedSeconds: 75 },
    ],
    nextHref: "/",
    nextLabel: "トップページへ",
    ctaLabel: "クイズに戻る",
  },
};

export const homeContents: Record<string, HomeContent> = {
  Home: {
    id: "Home",
    chipLabel: "石巻 ! 世界のスター",
    title: "石巻のことどこまで知っているの?",
    description: "チーム名を入力して、石巻の魅力を学ぶクイズに挑戦しましょう。",
    ctaLabel: "Start",
    secondaryCtaLabel: "ランキングへ",
  },
};
