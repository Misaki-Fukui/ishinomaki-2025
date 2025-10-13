import type { StaticImageData } from "next/image";

export type AnswerContent = {
  id: string;
  questionId: string;
  shortAnswer: string;
  lead: string;
  paragraphs: string[];
  image?: string | StaticImageData;
  imageAlt?: string;
  orientation?: "portrait" | "landscape";
  nextHref?: string;
  nextLabel?: string;
};

export type QuestionChoice = {
  id: string;
  label: string;
};

export type QuestionContent = {
  id: string;
  title: string;
  question: string;
  choices: QuestionChoice[];
  image?: string | StaticImageData;
  imageAlt?: string;
  timerSeconds?: number;
  progressLabel?: string;
  nextHref?: string;
  nextLabel?: string;
  correctChoiceId: string;
};

export type CountdownContent = {
  id: string;
  title: string;
  body: string;
  countFrom: number;
  nextHref?: string;
  nextLabel?: string;
};

export type RankingEntry = {
  teamName: string;
  correctCount: number;
  totalQuestions: number;
  elapsedSeconds?: number;
};

export type RankingContent = {
  id: string;
  title: string;
  subtitle?: string;
  entries: RankingEntry[];
  nextHref?: string;
  nextLabel?: string;
  ctaLabel?: string;
};

export type HomeContent = {
  id: string;
  chipLabel: string;
  title: string;
  ctaLabel: string;
  secondaryCtaLabel?: string;
  description?: string;
};
