'use client';

import { useMemo } from "react";
import Link from "next/link";
import AnswerContentView from "./AnswerContentView";
import type { AnswerContent } from "./types";
import { getAnswerForQuestion, getQuestionStepMeta } from "./quiz-session";

type Props = {
  stepIndex: number;
};

export default function AnswerStepView({ stepIndex }: Props) {
  const meta = useMemo(() => getQuestionStepMeta(stepIndex), [stepIndex]);
  const answer = useMemo(
    () => getAnswerForQuestion(meta.questionId),
    [meta.questionId],
  );

  if (!meta.question || !answer) {
    return (
      <main className="mx-auto flex min-h-[832px] w-full min-w-[320px] max-w-3xl flex-col items-center justify-center gap-6 bg-white px-6 py-12 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          解説データが見つかりませんでした
        </h1>
        <p className="text-sm text-gray-600">
          クイズを再度開始するか、ホーム画面に戻ってください。
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
  const position = Math.min(meta.position, totalQuestions - 1);
  const stepNumber = position + 1;
  const hasNextQuestion = stepNumber < totalQuestions;
  const nextHref = hasNextQuestion
    ? `/contents/Question${stepNumber + 1}`
    : "/contents/Ranking1";

  const nextLabel = hasNextQuestion
    ? answer.nextLabel ?? "次の問題へ"
    : answer.nextLabel ?? "ランキングへ";

  const content: AnswerContent = {
    ...answer,
    nextHref,
    nextLabel,
  };

  return <AnswerContentView content={content} />;
}
