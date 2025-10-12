'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { RankingContent } from "./types";
import { questionContents } from "./content-data";
import { finalizeQuizRun } from "./quiz-storage";

type Props = { content: RankingContent };

export default function RankingContentView({ content }: Props) {
  const {
    title,
    subtitle,
    entries,
    nextHref,
    nextLabel = "トップに戻る",
    ctaLabel = "もう一度挑戦する",
  } = content;

  const [teamEntry, setTeamEntry] = useState<RankingContent["entries"][number] | null>(null);

  useEffect(() => {
    const progress = finalizeQuizRun();

    if (!progress.teamName) {
      setTeamEntry(null);
      return;
    }

    const totalQuestions = Object.keys(questionContents).length;

    setTeamEntry({
      teamName: progress.teamName,
      correctCount: progress.score,
      totalQuestions,
      elapsedSeconds: progress.elapsedSeconds,
    });
  }, []);

  const entriesWithTeam = useMemo(() => {
    if (!teamEntry) {
      return entries;
    }

    const filtered = entries.filter(
      (entry) => entry.teamName !== teamEntry.teamName,
    );

    return [teamEntry, ...filtered];
  }, [entries, teamEntry]);

  const formatElapsed = useCallback((seconds?: number) => {
    if (typeof seconds !== "number" || !Number.isFinite(seconds)) {
      return "—";
    }

    if (seconds < 60) {
      return `${seconds}秒`;
    }

    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${minutes}分${remainder.toString().padStart(2, "0")}秒`;
  }, []);

  return (
    <main className="mx-auto flex min-h-[832px] w-full min-w-[320px] max-w-5xl flex-col gap-12 bg-white px-6 py-12 lg:px-12">
      <header className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7153d6]">
          Thank you !
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 lg:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-gray-600">{subtitle}</p>
        )}
      </header>

      {teamEntry && (
        <section className="rounded-3xl border border-[#7153d6]/40 bg-[#7153d6]/5 px-6 py-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[#4d3ab9]">
            最新のスコア
          </h2>
          <p className="mt-2 text-base text-gray-700">
            チーム名: <span className="font-semibold">{teamEntry.teamName}</span>
          </p>
          <p className="text-base text-gray-700">
            スコア:{" "}
            <span className="font-semibold text-[#4d3ab9]">
              {teamEntry.correctCount} / {teamEntry.totalQuestions}
            </span>
          </p>
          <p className="text-base text-gray-700">
            プレイ時間:{" "}
            <span className="font-semibold text-[#4d3ab9]">
              {formatElapsed(teamEntry.elapsedSeconds)}
            </span>
          </p>
        </section>
      )}

      <section className="space-y-4">
        {entriesWithTeam.map((entry, index) => {
          const isTop3 = index < 3;
          const placement = index + 1;
          const isCurrentTeam =
            teamEntry && entry.teamName === teamEntry.teamName;
          const elapsedLabel = formatElapsed(entry.elapsedSeconds);
          return (
            <div
              key={`${entry.teamName}-${index}`}
              className={[
                "flex flex-col gap-4 rounded-3xl border bg-white px-6 py-5 shadow-sm transition",
                isCurrentTeam
                  ? "border-emerald-400/70 shadow-lg"
                  : isTop3
                    ? "border-[#7153d6]/40 shadow-lg"
                    : "border-gray-200/80",
              ].join(" ")}
              data-current-team={isCurrentTeam ? "true" : undefined}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={[
                      "flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold",
                      isTop3
                        ? "bg-[#7153d6] text-white"
                        : "bg-gray-100 text-gray-600",
                    ].join(" ")}
                    aria-label={`${placement}位`}
                  >
                    {placement}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {entry.teamName}
                    </p>
                    <p className="text-sm text-gray-500">
                      正解: {entry.correctCount}/{entry.totalQuestions}・
                      答え時間: {elapsedLabel}
                    </p>
                    {isCurrentTeam && (
                      <p className="mt-1 text-xs font-semibold text-emerald-600">
                        あなたのチーム
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <footer className="mt-auto flex flex-col items-center gap-4">
        {nextHref && (
          <Link
            href={nextHref}
            className="inline-flex items-center gap-2 rounded-full bg-[#7153d6] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-[#5f44c6]"
          >
            <span>{ctaLabel}</span>
            <span aria-hidden>›</span>
          </Link>
        )}

        <Link
          href="/"
          className="text-sm font-medium text-[#7153d6] underline-offset-4 hover:underline"
        >
          {nextLabel}
        </Link>
      </footer>
    </main>
  );
}
