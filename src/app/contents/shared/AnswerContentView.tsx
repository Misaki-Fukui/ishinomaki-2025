"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { AnswerContent } from "./types";
import { questionContents } from "./content-data";
import {
  QUESTIONS_PER_SESSION,
  readQuizProgress,
  recordAnswer,
} from "./quiz-storage";

type Props = {
  content: AnswerContent;
};

const IMAGE_CLASS_BY_ORIENTATION: Record<
  NonNullable<AnswerContent["orientation"]>,
  string
> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[16/9]",
};

type EvaluationState = {
  selectedChoiceId: string | null;
  selectedChoiceLabel: string | null;
  isCorrect: boolean | null;
  score: number;
  totalQuestions: number;
};

export default function AnswerContentView({ content }: Props) {
  const {
    questionId,
    shortAnswer,
    lead,
    paragraphs,
    image,
    imageAlt,
    orientation = "landscape",
    nextHref,
    nextLabel = "次の質問へ",
  } = content;

  const [evaluation, setEvaluation] = useState<EvaluationState>({
    selectedChoiceId: null,
    selectedChoiceLabel: null,
    isCorrect: null,
    score: 0,
    totalQuestions: QUESTIONS_PER_SESSION,
  });

  const question = questionContents[questionId];
  const correctChoiceLabel = useMemo(() => {
    if (!question) {
      return shortAnswer;
    }

    const matched = question.choices.find(
      (choice) => choice.id === question.correctChoiceId,
    );
    return matched?.label ?? shortAnswer;
  }, [question, shortAnswer]);

  useEffect(() => {
    const progress = readQuizProgress();
    const stored = progress.answers?.[questionId];
    const questionData = questionContents[questionId];
    const correctChoiceId = questionData?.correctChoiceId ?? null;
    const selectedChoiceId = stored?.choiceId ?? null;

    let isCorrect: boolean | null = null;
    let nextScore = progress.score;

    if (selectedChoiceId && correctChoiceId) {
      isCorrect = selectedChoiceId === correctChoiceId;

      if (stored?.correct !== isCorrect) {
        const updated = recordAnswer(questionId, selectedChoiceId, isCorrect);
        nextScore = updated.score;
      }
    }

    const selectedChoiceLabel = selectedChoiceId
      ? questionData?.choices.find((choice) => choice.id === selectedChoiceId)
          ?.label ?? null
      : null;

    setEvaluation({
      selectedChoiceId,
      selectedChoiceLabel,
      isCorrect,
      score: nextScore,
      totalQuestions:
        typeof progress.totalQuestions === "number" && progress.totalQuestions > 0
          ? progress.totalQuestions
          : QUESTIONS_PER_SESSION,
    });
  }, [questionId]);

  const resultStyling = useMemo(() => {
    if (evaluation.isCorrect === true) {
      return {
        className:
          "rounded-3xl border border-emerald-200 bg-emerald-50/80 px-6 py-5 text-emerald-800 shadow-sm",
        heading: "正解です！",
        description: "すばらしい！次の問題にも挑戦しましょう。",
      };
    }

    if (evaluation.isCorrect === false) {
      return {
        className:
          "rounded-3xl border border-rose-200 bg-rose-50/80 px-6 py-5 text-rose-800 shadow-sm",
        heading: "残念…",
        description: "解説を読んで、次の問題でリベンジしましょう。",
      };
    }

    return {
      className:
        "rounded-3xl border border-amber-200 bg-amber-50/80 px-6 py-5 text-amber-800 shadow-sm",
      heading: "回答が記録されていません",
      description:
        "前の画面で回答を選択すると、ここに結果が表示されます。",
    };
  }, [evaluation.isCorrect]);

  return (
    <main className="mx-auto flex min-h-[832px] w-full min-w-[320px] max-w-6xl flex-col gap-10 bg-white px-6 py-12 md:px-12 lg:px-16">
      <header className="rounded-3xl bg-gradient-to-r from-[#7153d6] to-[#3b2f91] px-8 py-6 text-white shadow-lg">
        <p className="text-sm font-semibold tracking-wide text-white/80">
          正解は…
        </p>
        <h1 className="mt-2 text-3xl font-bold lg:text-4xl">{shortAnswer}</h1>
      </header>

      <section className={resultStyling.className}>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">{resultStyling.heading}</h2>
          <p className="text-sm">{resultStyling.description}</p>
        </div>
        <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
          <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm">
            <p className="text-xs font-semibold text-gray-500">あなたの回答</p>
            <p className="mt-1 text-base font-medium text-gray-900">
              {evaluation.selectedChoiceLabel ?? "—"}
            </p>
          </div>
          <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm">
            <p className="text-xs font-semibold text-gray-500">正解</p>
            <p className="mt-1 text-base font-medium text-gray-900">
              {correctChoiceLabel}
            </p>
          </div>
          <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm md:col-span-2">
            <p className="text-xs font-semibold text-gray-500">現在のスコア</p>
            <p className="mt-1 text-lg font-semibold text-[#4d3ab9]">
              {evaluation.score} / {evaluation.totalQuestions}
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8 rounded-3xl border border-violet-200/60 bg-white/80 p-6 shadow-sm backdrop-blur md:flex-row md:gap-12 md:p-10">
        <div className="flex flex-1 flex-col gap-6">
          <h2 className="text-xl font-semibold text-gray-900 lg:text-2xl">
            {lead}
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-gray-700">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {image ? (
          <div className="mx-auto flex w-[30%] flex-shrink-0 items-center justify-center rounded-3xl border border-dashed border-violet-200/60 bg-violet-50/60 p-4">
            <div
              className={[
                "relative h-full w-full overflow-hidden rounded-2xl",
                IMAGE_CLASS_BY_ORIENTATION[orientation],
              ].join(" ")}
            >
              <Image
                fill
                sizes="(max-width: 768px) 320px, 420px"
                src={image}
                alt={imageAlt ?? shortAnswer}
                className="object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="rounded-2xl border border-dashed border-violet-200/80 bg-violet-50/50 px-6 py-8 text-center text-sm text-violet-500">
              写真を追加するとより伝わりやすくなります
            </div>
          </div>
        )}
      </section>

      {nextHref && (
        <footer className="mt-auto flex justify-end">
          <Link
            href={nextHref}
            className="inline-flex items-center gap-2 rounded-full bg-[#7153d6] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-[#5f44c6]"
          >
            <span>{nextLabel}</span>
            <span aria-hidden>›</span>
          </Link>
        </footer>
      )}
    </main>
  );
}
