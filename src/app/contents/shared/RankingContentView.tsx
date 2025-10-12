import Link from "next/link";
import type { RankingContent } from "./types";

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

      <section className="space-y-4">
        {entries.map((entry, index) => {
          const isTop3 = index < 3;
          const placement = index + 1;
          return (
            <div
              key={`${entry.teamName}-${index}`}
              className={[
                "flex flex-col gap-4 rounded-3xl border bg-white px-6 py-5 shadow-sm transition",
                isTop3
                  ? "border-[#7153d6]/40 shadow-lg"
                  : "border-gray-200/80",
              ].join(" ")}
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
                      答え時間: {entry.elapsedSeconds}秒
                    </p>
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
