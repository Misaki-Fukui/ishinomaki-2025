"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MotionCaptureEmbed from "../components/MotionCaptureEmbed";
import {
  getTeamName,
  initializeQuizSession,
} from "./shared/quiz-storage";

export default function ContentsLandingPage() {
  const router = useRouter();

  const [teamName, setTeamName] = useState("");
  const [startAttempted, setStartAttempted] = useState(false);

  useEffect(() => {
    const existing = getTeamName();
    if (existing) {
      setTeamName(existing);
    }
  }, []);

  const normalizedTeamName = teamName.trim();
  const isTeamNameEmpty = normalizedTeamName.length === 0;

  const handleStart = useCallback(() => {
    setStartAttempted(true);
    const normalized = teamName.trim();
    if (normalized.length === 0) {
      return;
    }

    initializeQuizSession(normalized);
    router.push("/contents/Question1");
  }, [router, teamName]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleStart();
    },
    [handleStart],
  );

  const handleRankingClick = useCallback(() => {
    router.push("/contents/Ranking1");
  }, [router]);

  return (
    <div className="flex min-h-[832px] w-full min-w-[1280px] flex-col bg-white">
      <header className="relative mt-[157px] flex h-24 w-[618px] flex-col items-center self-center">
        <h1 className="relative mt-[-1px] whitespace-nowrap font-sans text-[40px] font-normal tracking-[0] text-black">
          石巻 ! 世界のスター
        </h1>

        <h2 className="relative whitespace-nowrap font-sans text-[40px] font-normal tracking-[0] text-black">
          石巻のことどこまで知っているの?
        </h2>
      </header>

      <main className="flex flex-1 flex-col items-center">
        <MotionCaptureEmbed className="mt-12 max-w-2xl" />

        <form
          onSubmit={handleSubmit}
          className="relative mt-32 flex h-[70px] w-[375px] flex-col items-start gap-3 pl-0 md:pl-0"
        >
          <label
            htmlFor="team-name-input"
            className="relative whitespace-nowrap font-sans text-base font-normal tracking-[0] text-black"
          >
            チームの名前
          </label>

          <input
            id="team-name-input"
            type="text"
            value={teamName}
            onChange={(event) => setTeamName(event.target.value)}
            placeholder="エントリー..."
            className="flex w-full flex-[0_0_auto] items-center gap-2.5 self-stretch border border-solid border-[#c2c2c2] p-2.5 font-sans text-base font-normal leading-normal tracking-[0] text-[#808080] placeholder:text-[#808080] outline-none focus:border-black focus:ring-2 focus:ring-black/10"
            aria-label="チームの名前"
          />
          {startAttempted && isTeamNameEmpty && (
            <p className="text-sm text-rose-600">チーム名を入力してください。</p>
          )}
        </form>

        <div className="mt-[124px] flex flex-col items-center gap-8">
          <button
            type="button"
            onClick={handleStart}
            disabled={isTeamNameEmpty}
            className="inline-flex h-[72px] w-[123px] cursor-pointer items-center justify-center gap-2.5 rounded-[100px] border border-solid border-black p-6 font-sans text-xl font-normal tracking-[0] transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400"
            aria-label="スタート"
          >
            START !
          </button>

          <button
            type="button"
            onClick={handleRankingClick}
            className="h-[19px] w-24 cursor-pointer font-sans text-base font-normal tracking-[0] text-black underline-offset-4 hover:underline"
            aria-label="ランキングへ移動"
          >
            ランキングへ
          </button>
        </div>
      </main>
    </div>
  );
}
