// app/components/QuestionCard.tsx
"use client";
import { useState } from "react";
import type { Question } from "../lib/questions";

type Props = {
  q: Question;
  onAnswer: (qId: string, choiceId: string) => void;
  selected?: string;
  locked?: boolean;
};
export default function QuestionCard({ q, onAnswer, selected, locked }: Props) {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="rounded-2xl border p-5 shadow-sm">
      <p className="mb-4 text-lg font-semibold">{q.text}</p>
      <ul className="space-y-2">
        {q.choices.map((c) => {
          const active = selected === c.id;
          const isHover = hover === c.id;
          return (
            <li key={c.id}>
              <button
                disabled={locked}
                onMouseEnter={() => setHover(c.id)}
                onMouseLeave={() => setHover(null)}
                onClick={() => onAnswer(q.id, c.id)}
                className={[
                  "w-full rounded-xl border px-4 py-3 text-left transition",
                  active ? "border-black" : "border-gray-300",
                  !active && isHover ? "scale-[1.01]" : "",
                  locked ? "opacity-60 cursor-not-allowed" : "hover:shadow",
                ].join(" ")}
              >
                {c.text}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
