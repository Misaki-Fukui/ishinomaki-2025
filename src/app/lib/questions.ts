// app/lib/questions.ts
export type Choice = { id: string; text: string };
export type Question = {
  id: string;
  text: string;
  choices: Choice[];
  answerId: string; // 正解のchoice.id
  explanation?: string;
};

export const questions: Question[] = [
  {
    id: "q1",
    text: "石巻はどんなところ？",
    choices: [
      { id: "a", text: "いいところ" },
      { id: "b", text: "とても良いところ" },
      { id: "c", text: "すごく良いところ" },
    ],
    answerId: "c",
    explanation: "石巻ハッカソン最高！",
  },
  {
    id: "q2",
    text: "宮城県の美味しい食べ物は？",
    choices: [
      { id: "a", text: "ずんだもん" },
      { id: "b", text: "ずんだもち" },
      { id: "c", text: "りんご" },
    ],
    answerId: "b",
    explanation: "ずんだもち食べたい",
  },
];
