'use client';

import { useMemo } from "react";
import Link from "next/link";
import QuestionContentView from "./QuestionContentView";
import type { QuestionContent } from "./types";
import { getQuestionStepMeta } from "./quiz-session";

type Props = {
  stepIndex: number;
};

export default function QuestionStepView({ stepIndex }: Props) {
  const meta = useMemo(() => getQuestionStepMeta(stepIndex), [stepIndex]);

  if (!meta.question) {
    return (
      <main className="mx-auto flex min-h-[832px] w-full min-w-[320px] max-w-3xl flex-col items-center justify-center gap-6 bg-white px-6 py-12 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          問題データが見つかりませんでした
        </h1>
        <p className="text-sm text-gray-600">
          クイズの再読み込みをお試しいただくか、ホームへ戻って再度開始してください。
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-[#7153d6] px-5 py-2 text-sm font-semibold text-white shadow hover:bg-[#5f44c6]"
        >
          ホームへ戻る
        </Link>
      </main>
    );
  }

  const totalQuestions = Math.max(meta.totalQuestions, 1);
  const progressCurrent = Math.min(meta.position + 1, totalQuestions);
  const nextHref = `/contents/Answer${progressCurrent}`;

  const content: QuestionContent = {
    ...meta.question,
    title: meta.question.title ?? `第${progressCurrent}問`,
    progressLabel: `質問 ${progressCurrent}/${totalQuestions}`,
    nextHref,
    nextLabel: meta.question.nextLabel ?? "回答する",
  };

  return <QuestionContentView content={content} />;
}
