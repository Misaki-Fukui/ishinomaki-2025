// src/app/result/page.tsx  ← "use client" は書かない
import Link from "next/link";
import { questions } from "../lib/questions";

export const metadata = { title: "結果" };

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function ResultPage({ searchParams }: Props) {
  const score = Number(searchParams.score ?? 0);
  const total = Number(searchParams.total ?? 0);
  const detailStr = String(searchParams.detail ?? "{}");

  let answers: Record<string, string> = {};
  try { answers = JSON.parse(detailStr); } catch {}

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">結果</h1>
      <p className="text-lg">スコア: <span className="font-semibold">{score}</span> / {total}</p>

      <div className="space-y-4">
        {questions.map((q) => {
          const user = answers[q.id];
          const correct = q.answerId === user;
          const userText = q.choices.find((c) => c.id === user)?.text ?? "—";
          const correctText = q.choices.find((c) => c.id === q.answerId)?.text ?? "—";
          return (
            <div key={q.id} className="rounded-2xl border p-4">
              <p className="mb-2 font-semibold">{q.text}</p>
              <p>あなたの回答: {userText}</p>
              <p>正解: <span className="font-medium">{correctText}</span> {correct ? "✅" : "❌"}</p>
              {q.explanation && <p className="mt-2 text-sm text-gray-600">{q.explanation}</p>}
            </div>
          );
        })}
      </div>

      <Link href="/" className="inline-block rounded-xl border px-5 py-3 hover:shadow">もう一度</Link>
    </main>
  );
}
