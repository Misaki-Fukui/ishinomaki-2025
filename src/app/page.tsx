// src/app/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { questions } from "./lib/questions";
import QuestionCard from "./components/QuestionCard";

type AnswersMap = Record<string, string>;

export default function Page() {
  const router = useRouter();

  const [answers, setAnswers] = useState<AnswersMap>({});
  const [locked, setLocked] = useState(false);

  const total = questions.length;
  const answeredCount = Object.keys(answers).length;

  const score = useMemo(() => {
    let s = 0;
    for (const q of questions) if (answers[q.id] === q.answerId) s++;
    return s;
  }, [answers]);

  const onAnswer = (qId: string, choiceId: string) =>
    setAnswers((prev) => ({ ...prev, [qId]: choiceId }));

  const onSubmit = () => {
    if (answeredCount < total) {
      alert(`未回答があります（${answeredCount}/${total}）`);
      return;
    }
    setLocked(true);
    const detail = encodeURIComponent(JSON.stringify(answers));
    router.push(`/result?score=${score}&total=${total}&detail=${detail}`);
  };

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Next.js × Vercel クイズ</h1>
        <Link
          href="/"
          className="text-sm text-gray-600 underline-offset-2 hover:underline"
        >
          ホーム
        </Link>
      </header>

      <p className="text-sm text-gray-600">
        全問回答後に「採点」を押してください。結果は別ページで表示されます。
      </p>

      <section className="space-y-4">
        {questions.map((q) => (
          <QuestionCard
            key={q.id}
            q={q}
            onAnswer={onAnswer}
            selected={answers[q.id]}
            locked={locked}
          />
        ))}
      </section>

      <footer className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          進捗: {answeredCount}/{total}
        </span>
        <button
          onClick={onSubmit}
          disabled={locked}
          className="rounded-xl bg-black px-5 py-3 text-white disabled:opacity-50"
        >
          採点
        </button>
      </footer>
    </main>
  );
}
