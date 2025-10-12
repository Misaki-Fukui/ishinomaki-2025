'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MotionCaptureProvider } from "../../components/MotionCaptureContext";
import MotionCaptureEmbed from "../../components/MotionCaptureEmbed";
import QuestionChoices from "../../components/QuestionChoices";
import type { QuestionContent } from "./types";
import { getStoredAnswer, recordAnswer } from "./quiz-storage";

type Props = {
  content: QuestionContent;
};

export default function QuestionContentView({ content }: Props) {
  const {
    id,
    title,
    question,
    choices,
    timerSeconds = 5,
    progressLabel,
    nextHref,
    nextLabel = "回答する",
    correctChoiceId,
  } = content;

  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  useEffect(() => {
    const stored = getStoredAnswer(id);
    if (stored) {
      setSelectedChoiceId(stored.choiceId);
    } else {
      setSelectedChoiceId(null);
    }
  }, [id]);

  const handleSelect = useCallback(
    (choiceId: string) => {
      setSelectedChoiceId((previous) => {
        if (previous === choiceId) {
          return previous;
        }

        recordAnswer(id, choiceId, choiceId === correctChoiceId);
        return choiceId;
      });
    },
    [correctChoiceId, id],
  );

  const selectedChoiceLabel = useMemo(() => {
    if (!selectedChoiceId) {
      return null;
    }
    const matched = choices.find((choice) => choice.id === selectedChoiceId);
    return matched?.label ?? null;
  }, [choices, selectedChoiceId]);

  return (
    <main className="mx-auto flex min-h-[832px] w-full min-w-[320px] max-w-6xl flex-col gap-10 bg-white px-6 py-12 md:px-12 lg:px-16">
      <header className="rounded-3xl bg-gradient-to-r from-[#7153d6] to-[#3b2f91] px-8 py-6 text-white shadow-lg">
        <div className="flex items-center justify-between text-sm text-white/80">
          <span>{progressLabel ?? "クイズ"}</span>
          <span>制限時間: {timerSeconds}秒</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold lg:text-4xl">{title}</h1>
      </header>

      <MotionCaptureProvider>
        <section className="grid gap-10 rounded-3xl border border-violet-200/60 bg-white/80 p-6 shadow-sm backdrop-blur lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-900 lg:text-2xl">
              {question}
            </h2>

            <QuestionChoices
              choices={choices}
              onSelect={handleSelect}
              selectedChoiceId={selectedChoiceId ?? undefined}
            />

            <div className="rounded-2xl border border-violet-200/60 bg-white/60 px-4 py-3 text-sm text-gray-600">
              {selectedChoiceLabel ? (
                <span>
                  現在の選択:{" "}
                  <span className="font-semibold text-[#4d3ab9]">
                    {selectedChoiceLabel}
                  </span>
                </span>
              ) : (
                <span>ポーズまたはボタンのクリックで回答を選択してください。</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <MotionCaptureEmbed className="w-full max-w-md border-violet-200/80 bg-violet-950/40" />
          </div>
        </section>
      </MotionCaptureProvider>

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
