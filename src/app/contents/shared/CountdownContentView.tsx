import Link from "next/link";
import type { CountdownContent } from "./types";

type Props = {
  content: CountdownContent;
};

export default function CountdownContentView({ content }: Props) {
  const { title, body, countFrom, nextHref, nextLabel = "スタート" } = content;

  return (
    <main className="mx-auto flex min-h-[832px] w-full min-w-[320px] max-w-4xl flex-col items-center justify-center gap-12 bg-white px-6 py-12 text-center md:px-10">
      <h1 className="text-4xl font-semibold text-gray-900 md:text-5xl">
        {title}
      </h1>
      <p className="max-w-2xl text-lg text-gray-700 md:text-xl">{body}</p>

      <div className="flex items-center justify-center rounded-full border-4 border-[#7153d6] p-6 md:p-10">
        <div className="flex h-48 w-48 items-center justify-center rounded-full bg-[#7153d6] text-white shadow-lg md:h-56 md:w-56">
          <span className="text-6xl font-bold md:text-7xl">{countFrom}</span>
        </div>
      </div>

      {nextHref && (
        <Link
          href={nextHref}
          className="inline-flex items-center gap-2 rounded-full bg-[#7153d6] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-[#5f44c6]"
        >
          <span>{nextLabel}</span>
          <span aria-hidden>›</span>
        </Link>
      )}
    </main>
  );
}
