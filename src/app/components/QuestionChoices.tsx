"use client";

import { useEffect, useRef } from "react";
import type { QuestionChoice } from "../contents/shared/types";
import { useMotionCapturePose } from "./MotionCaptureContext";

const GESTURE_ORDER = ["y_pose", "t_pose", "cross_arms"] as const;

const GESTURE_LABELS: Record<(typeof GESTURE_ORDER)[number], string> = {
  y_pose: "Yポーズ",
  t_pose: "Tポーズ",
  cross_arms: "クロスポーズ",
};

type QuestionChoicesProps = {
  choices: QuestionChoice[];
  selectedChoiceId?: string;
  onSelect?: (choiceId: QuestionChoice["id"]) => void;
};

export default function QuestionChoices({
  choices,
  selectedChoiceId,
  onSelect,
}: QuestionChoicesProps) {
  const detectedPose = useMotionCapturePose();
  const lastPoseRef = useRef<string | null>(null);

  useEffect(() => {
    const pose = typeof detectedPose === "string" ? detectedPose : "unknown";

    if (lastPoseRef.current === pose) {
      return;
    }
    lastPoseRef.current = pose;

    if (!onSelect || pose === "unknown") {
      return;
    }

    const gestureIndex = GESTURE_ORDER.indexOf(
      pose as (typeof GESTURE_ORDER)[number],
    );
    if (gestureIndex < 0) {
      return;
    }

    const targetChoice = choices[gestureIndex];
    if (!targetChoice) {
      return;
    }

    onSelect(targetChoice.id);
  }, [choices, detectedPose, onSelect]);

  return (
    <ul className="space-y-3">
      {choices.map((choice, index) => {
        const gesture = GESTURE_ORDER[index];
        const gestureLabel =
          gesture !== undefined ? GESTURE_LABELS[gesture] ?? gesture : null;
        const isActive = gesture !== undefined && detectedPose === gesture;
        const isSelected = selectedChoiceId === choice.id;

        const buttonClasses = [
          "w-full rounded-2xl border border-violet-200/80 bg-white px-5 py-4 text-left text-lg font-medium text-gray-800 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7153d6]",
          "hover:border-[#7153d6] hover:shadow",
          isSelected
            ? "border-emerald-500 bg-emerald-50 shadow-lg"
            : isActive
              ? "border-emerald-400/80 bg-emerald-50/70 shadow-lg"
              : "",
        ]
          .filter(Boolean)
          .join(" ");

        const ariaLabel = [
          `${choice.id.toUpperCase()} ${choice.label}`,
          gestureLabel ? `ポーズ: ${gestureLabel}` : null,
        ]
          .filter(Boolean)
          .join(" / ");

        const badgeClasses = [
          "rounded-full px-3 py-1 text-xs font-semibold transition",
          isActive || isSelected
            ? "bg-emerald-500/20 text-emerald-700"
            : "bg-[#7153d6]/10 text-[#4d3ab9]",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <li key={choice.id}>
            <button
              type="button"
              aria-label={ariaLabel}
              data-pose-gesture={gesture ?? undefined}
              className={buttonClasses}
              onClick={() => onSelect?.(choice.id)}
              aria-pressed={isSelected}
              data-selected={isSelected ? "true" : undefined}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#7153d6]/15 text-base font-semibold text-[#7153d6]">
                    {choice.id.toUpperCase()}.
                  </span>
                  {choice.label}
                </span>

                {gestureLabel && (
                  <span className={badgeClasses}>ポーズ: {gestureLabel}</span>
                )}
              </div>

              {gesture && (
                <span
                  className={[
                    "mt-3 block text-sm font-medium",
                    isSelected
                      ? "text-emerald-700"
                      : isActive
                        ? "text-emerald-600"
                        : "text-gray-500",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {isSelected
                    ? "選択済みの回答です"
                    : isActive
                      ? "ポーズを認識しました！"
                      : "このポーズで選択できます"}
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
