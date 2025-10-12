import Link from "next/link";
import type { QuestionContent } from "./types";
import MotionCaptureEmbed from "../../components/MotionCaptureEmbed";

type Props = {
  content: QuestionContent;
};

export default function QuestionContentView({ content }: Props) {
  const {
    title,
    question,
    choices,
    image,
    timerSeconds = 5,
    progressLabel,
    nextHref,
    nextLabel = "回答する",
  } = content;

  return (
    <main className="mx-auto flex min-h-[832px] w-full min-w-[320px] max-w-6xl flex-col gap-10 bg-white px-6 py-12 md:px-12 lg:px-16">
      <header className="rounded-3xl bg-gradient-to-r from-[#7153d6] to-[#3b2f91] px-8 py-6 text-white shadow-lg">
        <div className="flex items-center justify-between text-sm text-white/80">
          <span>{progressLabel ?? "クイズ"}</span>
          <span>制限時間: {timerSeconds}秒</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold lg:text-4xl">{title}</h1>
      </header>

      <section className="grid gap-10 rounded-3xl border border-violet-200/60 bg-white/80 p-6 shadow-sm backdrop-blur lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:p-10">
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-gray-900 lg:text-2xl">
            {question}
          </h2>

          <ul className="space-y-3">
            {choices.map((choice) => (
              <li key={choice.id}>
                <button
                  type="button"
                  className="w-full rounded-2xl border border-violet-200/80 bg-white px-5 py-4 text-left text-lg font-medium text-gray-800 transition hover:border-[#7153d6] hover:shadow"
                  aria-label={`${choice.id} ${choice.label}`}
                >
                  <span className="mr-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#7153d6]/15 text-base font-semibold text-[#7153d6]">
                    {choice.id.toUpperCase()}.
                  </span>
                  {choice.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {image ? (
          <div className="flex items-center justify-center">
            <MotionCaptureEmbed className="w-full max-w-md border-violet-200/80 bg-violet-950/40" />
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="rounded-2xl border border-dashed border-violet-200/80 bg-violet-50/50 px-6 py-8 text-center text-sm text-violet-500">
              写真を追加できます
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
