'use client';

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
};

const STORAGE_KEY = "ishinomaki-quiz-progress";
const EMPTY_PROGRESS: QuizProgress = { answers: {}, score: 0 };

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

    return {
      score: Number.isFinite(parsed.score ?? NaN) ? (parsed.score as number) : 0,
      answers: parsed.answers,
      teamName: sanitizedTeamName.length > 0 ? sanitizedTeamName : undefined,
      startedAt: sanitizedStartedAt,
      elapsedSeconds: sanitizedElapsedSeconds,
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

  if (!progress.answers || typeof progress.answers !== "object") {
    return {
      answers: {},
      score: 0,
      teamName: progress.teamName,
      startedAt: progress.startedAt,
      elapsedSeconds: progress.elapsedSeconds,
    };
  }

  if (!Number.isFinite(progress.score)) {
    return {
      answers: progress.answers,
      score: Object.values(progress.answers).filter((answer) => answer?.correct).length,
      teamName: progress.teamName,
      startedAt: progress.startedAt,
      elapsedSeconds: progress.elapsedSeconds,
    };
  }

  return progress;
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
  };
  writeToStorage(nextProgress);
  return nextProgress;
}

export function initializeQuizSession(teamName: string): QuizProgress {
  const normalized = teamName.trim();
  const nextProgress: QuizProgress = {
    answers: {},
    score: 0,
    teamName: normalized.length > 0 ? normalized : undefined,
    startedAt: Date.now(),
    elapsedSeconds: undefined,
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
