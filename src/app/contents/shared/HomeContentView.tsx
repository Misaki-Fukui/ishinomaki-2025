import Link from "next/link";
import type { HomeContent } from "./types";

type Props = {
  content: HomeContent;
};

export default function HomeContentView({ content }: Props) {
  const { chipLabel, title, ctaLabel, secondaryCtaLabel, description } =
    content;

  return (
    <main className="mx-auto flex min-h-[832px] w-full min-w-[320px] max-w-3xl flex-col gap-10 bg-white px-6 py-12 text-center md:px-10">
      <header className="space-y-4">
        <div className="inline-flex items-center rounded-full bg-[#7153d6]/10 px-4 py-1 text-sm font-medium text-[#7153d6]">
          {chipLabel}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-gray-600">{description}</p>
        )}
      </header>

      <section className="rounded-3xl border border-violet-200/60 bg-white/70 p-8 shadow-sm backdrop-blur">
        <div className="flex flex-col items-center gap-4">
          <label
            htmlFor="team-name"
            className="text-sm font-medium text-gray-600"
          >
            チームの名前
          </label>
          <input
            id="team-name"
            type="text"
            placeholder="Enter team name..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base focus:border-[#7153d6] focus:outline-none focus:ring-2 focus:ring-[#7153d6]/40"
          />
        </div>
        <div className="mt-8 flex flex-col items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#7153d6] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-[#5f44c6]"
          >
            <span>{ctaLabel}</span>
            <span aria-hidden>›</span>
          </Link>
          {secondaryCtaLabel && (
            <Link
              href="/"
              className="text-sm font-medium text-[#7153d6] underline-offset-4 hover:underline"
            >
              {secondaryCtaLabel}
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
