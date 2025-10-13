'use client';

import { questionContents } from "./content-data";

export const QUESTIONS_PER_SESSION = 11;

const SCOREBOARD_KEY = "ishinomaki-quiz-scoreboard-v1";
const SCOREBOARD_LIMIT = 20;

export type ScoreboardEntry = {
  runId: number;
  teamName: string;
  correctCount: number;
  totalQuestions: number;
  elapsedSeconds?: number;
  finishedAt: number;
};

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

function readScoreboardFromStorage(): ScoreboardEntry[] {
  if (typeof window === "undefined" || !("sessionStorage" in window)) {
    return [];
  }

  try {
    const raw = window.sessionStorage.getItem(SCOREBOARD_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    const entries: ScoreboardEntry[] = [];

    for (const item of parsed) {
      if (!item || typeof item !== "object") {
        continue;
      }

      const teamName =
        typeof (item as { teamName?: unknown }).teamName === "string"
          ? (item as { teamName: string }).teamName.trim()
          : "";

      const runId = isFiniteNumber((item as { runId?: unknown }).runId)
        ? Math.trunc((item as { runId: number }).runId)
        : null;

      const correctCount = isFiniteNumber(
        (item as { correctCount?: unknown }).correctCount,
      )
        ? Math.max(0, Math.trunc((item as { correctCount: number }).correctCount))
        : null;

      const totalQuestions = isFiniteNumber(
        (item as { totalQuestions?: unknown }).totalQuestions,
      )
        ? Math.max(
            0,
            Math.trunc((item as { totalQuestions: number }).totalQuestions),
          )
        : null;

      const elapsedSeconds = isFiniteNumber(
        (item as { elapsedSeconds?: unknown }).elapsedSeconds,
      )
        ? Math.max(
            0,
            Math.trunc((item as { elapsedSeconds: number }).elapsedSeconds),
          )
        : undefined;

      const finishedAt = isFiniteNumber(
        (item as { finishedAt?: unknown }).finishedAt,
      )
        ? Math.max(0, Math.trunc((item as { finishedAt: number }).finishedAt))
        : null;

      if (
        teamName.length === 0 ||
        runId === null ||
        correctCount === null ||
        totalQuestions === null ||
        finishedAt === null
      ) {
        continue;
      }

      entries.push({
        runId,
        teamName,
        correctCount,
        totalQuestions,
        elapsedSeconds,
        finishedAt,
      });
    }

    return entries;
  } catch {
    return [];
  }
}

function writeScoreboardToStorage(entries: ScoreboardEntry[]): ScoreboardEntry[] {
  if (typeof window === "undefined" || !("sessionStorage" in window)) {
    return entries;
  }

  try {
    window.sessionStorage.setItem(SCOREBOARD_KEY, JSON.stringify(entries));
  } catch {
    // Ignore storage failures (e.g. quota exceeded, private mode)
  }

  return entries;
}

export type StoredAnswer = {
  choiceId: string;
  correct: boolean;
  updatedAt: number;
};

export type QuizProgress = {
  answers: Record<string, StoredAnswer>;
  score: number;
  teamName?: string;
  startedAt?: number;
  elapsedSeconds?: number;
  questionOrder: string[];
  totalQuestions: number;
};

const STORAGE_KEY = "ishinomaki-quiz-progress";
const EMPTY_PROGRESS: QuizProgress = {
  answers: {},
  score: 0,
  teamName: undefined,
  startedAt: undefined,
  elapsedSeconds: undefined,
  questionOrder: [],
  totalQuestions: QUESTIONS_PER_SESSION,
};

function readFromStorage(): QuizProgress {
  if (typeof window === "undefined") {
    return EMPTY_PROGRESS;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return EMPTY_PROGRESS;
    }

    const parsed = JSON.parse(raw) as Partial<QuizProgress>;
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof parsed.answers !== "object" ||
      parsed.answers === null
    ) {
      return EMPTY_PROGRESS;
    }

    const sanitizedTeamName =
      typeof parsed.teamName === "string" ? parsed.teamName.trim() : "";

    const sanitizedStartedAt =
      typeof parsed.startedAt === "number" && Number.isFinite(parsed.startedAt)
        ? parsed.startedAt
        : undefined;

    const sanitizedElapsedSeconds =
      typeof parsed.elapsedSeconds === "number" &&
      Number.isFinite(parsed.elapsedSeconds)
        ? Math.max(0, Math.round(parsed.elapsedSeconds))
        : undefined;

    const sanitizedQuestionOrder = Array.isArray(parsed.questionOrder)
      ? parsed.questionOrder.filter(
          (value): value is string => typeof value === "string" && value.length > 0,
        )
      : [];

    const sanitizedTotalQuestions =
      typeof parsed.totalQuestions === "number" &&
      Number.isFinite(parsed.totalQuestions)
        ? Math.max(0, Math.round(parsed.totalQuestions))
        : sanitizedQuestionOrder.length > 0
          ? sanitizedQuestionOrder.length
          : QUESTIONS_PER_SESSION;

    return {
      score: Number.isFinite(parsed.score ?? NaN) ? (parsed.score as number) : 0,
      answers: parsed.answers,
      teamName: sanitizedTeamName.length > 0 ? sanitizedTeamName : undefined,
      startedAt: sanitizedStartedAt,
      elapsedSeconds: sanitizedElapsedSeconds,
      questionOrder: sanitizedQuestionOrder,
      totalQuestions: sanitizedTotalQuestions,
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

function writeToStorage(progress: QuizProgress) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage failures (e.g. quota exceeded, private mode)
  }
}

export function readQuizProgress(): QuizProgress {
  const progress = readFromStorage();

  const answers =
    progress.answers && typeof progress.answers === "object" ? progress.answers : {};

  const score = Number.isFinite(progress.score)
    ? progress.score
    : Object.values(answers).filter((answer) => answer?.correct).length;

  const questionOrder = Array.isArray(progress.questionOrder)
    ? progress.questionOrder.filter(
        (value): value is string => typeof value === "string" && value.length > 0,
      )
    : [];

  const totalQuestions =
    typeof progress.totalQuestions === "number" && Number.isFinite(progress.totalQuestions)
      ? Math.max(0, Math.round(progress.totalQuestions))
      : questionOrder.length > 0
        ? questionOrder.length
        : QUESTIONS_PER_SESSION;

  return {
    answers,
    score,
    teamName: progress.teamName,
    startedAt: progress.startedAt,
    elapsedSeconds: progress.elapsedSeconds,
    questionOrder,
    totalQuestions,
  };
}

export function getScoreboardEntries(): ScoreboardEntry[] {
  return readScoreboardFromStorage();
}

export function recordScoreboardEntry(progress: QuizProgress): ScoreboardEntry[] {
  const entries = readScoreboardFromStorage();

  const teamName =
    typeof progress.teamName === "string" ? progress.teamName.trim() : "";
  const runId = isFiniteNumber(progress.startedAt)
    ? Math.trunc(progress.startedAt)
    : null;

  if (!teamName || runId === null) {
    return entries;
  }

  const availableQuestions = Object.keys(questionContents).length;
  const normalizedTotal =
    Number.isFinite(progress.totalQuestions) && progress.totalQuestions > 0
      ? Math.max(0, Math.trunc(progress.totalQuestions))
      : availableQuestions;

  const normalizedScore = Number.isFinite(progress.score)
    ? Math.max(0, Math.trunc(progress.score))
    : 0;

  const normalizedElapsed =
    typeof progress.elapsedSeconds === "number" && Number.isFinite(progress.elapsedSeconds)
      ? Math.max(0, Math.trunc(progress.elapsedSeconds))
    : undefined;

  const updatedEntry: ScoreboardEntry = {
    runId,
    teamName,
    correctCount: normalizedScore,
    totalQuestions: normalizedTotal > 0 ? normalizedTotal : availableQuestions,
    elapsedSeconds: normalizedElapsed,
    finishedAt: Date.now(),
  };

  const existingIndex = entries.findIndex((entry) => entry.runId === runId);
  if (existingIndex >= 0) {
    entries[existingIndex] = updatedEntry;
  } else {
    entries.push(updatedEntry);
  }

  entries.sort((a, b) => {
    if (b.correctCount !== a.correctCount) {
      return b.correctCount - a.correctCount;
    }

    const aTime =
      typeof a.elapsedSeconds === "number" ? a.elapsedSeconds : Number.POSITIVE_INFINITY;
    const bTime =
      typeof b.elapsedSeconds === "number" ? b.elapsedSeconds : Number.POSITIVE_INFINITY;

    if (aTime !== bTime) {
      return aTime - bTime;
    }

    return a.finishedAt - b.finishedAt;
  });

  const limited = entries.slice(0, SCOREBOARD_LIMIT);
  return writeScoreboardToStorage(limited);
}

export function recordAnswer(
  questionId: string,
  choiceId: string,
  correct: boolean,
): QuizProgress {
  const current = readQuizProgress();
  const nextAnswers = {
    ...current.answers,
    [questionId]: { choiceId, correct, updatedAt: Date.now() },
  };

  const score = Object.values(nextAnswers).reduce((total, answer) => {
    return answer?.correct ? total + 1 : total;
  }, 0);

  const nextProgress: QuizProgress = {
    answers: nextAnswers,
    score,
    teamName: current.teamName,
    startedAt: current.startedAt,
    elapsedSeconds: current.elapsedSeconds,
    questionOrder: current.questionOrder,
    totalQuestions: current.totalQuestions,
  };
  writeToStorage(nextProgress);
  return nextProgress;
}

export function clearQuizProgress() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures
  }
}

export function getStoredAnswer(questionId: string): StoredAnswer | null {
  const progress = readQuizProgress();
  const stored = progress.answers?.[questionId];
  return stored ? stored : null;
}

export function setTeamName(teamName: string): QuizProgress {
  const current = readQuizProgress();
  const normalized = teamName.trim();
  const nextProgress: QuizProgress = {
    answers: current.answers,
    score: current.score,
    teamName: normalized.length > 0 ? normalized : undefined,
    startedAt: current.startedAt,
    elapsedSeconds: current.elapsedSeconds,
    questionOrder: current.questionOrder,
    totalQuestions: current.totalQuestions,
  };
  writeToStorage(nextProgress);
  return nextProgress;
}

function selectRandomQuestionOrder(count: number): string[] {
  const available = Object.keys(questionContents);
  if (available.length <= count) {
    return available.slice();
  }

  const shuffled = available.slice();
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function initializeQuizSession(teamName: string): QuizProgress {
  const normalized = teamName.trim();
  const questionOrder = selectRandomQuestionOrder(QUESTIONS_PER_SESSION);
  const nextProgress: QuizProgress = {
    answers: {},
    score: 0,
    teamName: normalized.length > 0 ? normalized : undefined,
    startedAt: Date.now(),
    elapsedSeconds: undefined,
    questionOrder,
    totalQuestions: questionOrder.length,
  };
  writeToStorage(nextProgress);
  return nextProgress;
}

export function getTeamName(): string | null {
  const progress = readQuizProgress();
  return typeof progress.teamName === "string" && progress.teamName.length > 0
    ? progress.teamName
    : null;
}

export function finalizeQuizRun(now: number = Date.now()): QuizProgress {
  const current = readQuizProgress();

  if (
    typeof current.elapsedSeconds === "number" &&
    Number.isFinite(current.elapsedSeconds)
  ) {
    return current;
  }

  if (
    typeof current.startedAt !== "number" ||
    !Number.isFinite(current.startedAt)
  ) {
    return current;
  }

  const elapsedMs = Math.max(0, now - current.startedAt);
  const elapsedSeconds = Math.max(0, Math.round(elapsedMs / 1000));

  const nextProgress: QuizProgress = {
    ...current,
    elapsedSeconds,
  };

  writeToStorage(nextProgress);
  return nextProgress;
}
