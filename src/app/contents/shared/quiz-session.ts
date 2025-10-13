'use client';

import { answerContents, questionContents } from "./content-data";
import type { AnswerContent, QuestionContent } from "./types";
import { QUESTIONS_PER_SESSION, readQuizProgress } from "./quiz-storage";

const ALL_QUESTION_IDS = Object.keys(questionContents);

const ANSWERS_BY_QUESTION_ID: Map<string, AnswerContent> = (() => {
  const map = new Map<string, AnswerContent>();
  Object.values(answerContents).forEach((answer) => {
    if (answer.questionId) {
      map.set(answer.questionId, answer);
    }
  });
  return map;
})();

export type QuestionStepMeta = {
  questionId: string | null;
  question: QuestionContent | null;
  totalQuestions: number;
  position: number;
  requestedIndex: number;
};

export function getQuestionStepMeta(stepIndex: number): QuestionStepMeta {
  const requestedIndex = Math.max(0, Math.trunc(stepIndex));
  const progress = readQuizProgress();
  const availableCount = ALL_QUESTION_IDS.length;

  const desiredTotal =
    typeof progress.totalQuestions === "number" && progress.totalQuestions > 0
      ? Math.min(progress.totalQuestions, availableCount)
      : Math.min(QUESTIONS_PER_SESSION, availableCount);

  const targetLength = desiredTotal > 0 ? desiredTotal : availableCount;
  const unique = new Set<string>();
  const order: string[] = [];

  if (Array.isArray(progress.questionOrder)) {
    for (const id of progress.questionOrder) {
      if (order.length >= targetLength) {
        break;
      }
      if (typeof id === "string" && !unique.has(id) && questionContents[id]) {
        unique.add(id);
        order.push(id);
      }
    }
  }

  if (order.length < targetLength) {
    for (const id of ALL_QUESTION_IDS) {
      if (order.length >= targetLength) {
        break;
      }
      if (!unique.has(id)) {
        unique.add(id);
        order.push(id);
      }
    }
  }

  if (order.length === 0 && ALL_QUESTION_IDS.length > 0) {
    order.push(ALL_QUESTION_IDS[0]);
  }

  const totalQuestions =
    targetLength > 0
      ? Math.min(targetLength, order.length)
      : order.length > 0
        ? order.length
        : 0;

  const boundedIndex =
    totalQuestions > 0
      ? Math.max(0, Math.min(requestedIndex, totalQuestions - 1))
      : 0;

  const resolvedQuestionId =
    totalQuestions > 0 ? order[boundedIndex] ?? order[0] ?? null : null;
  const question = resolvedQuestionId
    ? questionContents[resolvedQuestionId] ?? null
    : null;

  return {
    questionId: resolvedQuestionId,
    question,
    totalQuestions,
    position: boundedIndex,
    requestedIndex,
  };
}

export function getAnswerForQuestion(questionId: string | null): AnswerContent | null {
  if (!questionId) {
    return null;
  }
  return ANSWERS_BY_QUESTION_ID.get(questionId) ?? null;
}
