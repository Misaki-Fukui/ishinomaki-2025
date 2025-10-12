import Image from "next/image";
import Link from "next/link";
import type { AnswerContent } from "./types";

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

export default function AnswerContentView({ content }: Props) {
  const {
    shortAnswer,
    lead,
    paragraphs,
    image,
    imageAlt,
    orientation = "landscape",
    nextHref,
    nextLabel = "次の質問へ",
  } = content;

  return (
    <main className="mx-auto flex min-h-[832px] w-full min-w-[320px] max-w-6xl flex-col gap-10 bg-white px-6 py-12 md:px-12 lg:px-16">
      <header className="rounded-3xl bg-gradient-to-r from-[#7153d6] to-[#3b2f91] px-8 py-6 text-white shadow-lg">
        <p className="text-sm font-semibold tracking-wide text-white/80">
          正解は…
        </p>
        <h1 className="mt-2 text-3xl font-bold lg:text-4xl">{shortAnswer}</h1>
      </header>

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
          <div className="mx-auto flex flex-shrink-0 items-center justify-center rounded-3xl border border-dashed border-violet-200/60 bg-violet-50/60 p-4">
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
