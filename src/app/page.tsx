'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MotionCaptureEmbed from "./components/MotionCaptureEmbed";
import {
  getTeamName,
  initializeQuizSession,
} from "./contents/shared/quiz-storage";

export default function Page() {
  const router = useRouter();

  const [teamName, setTeamName] = useState("");
  const [startAttempted, setStartAttempted] = useState(false);

  useEffect(() => {
    const existing = getTeamName();
    if (existing) {
      setTeamName(existing);
    }
  }, []);

  const handleStartClick = () => {
    setStartAttempted(true);
    const normalized = teamName.trim();

    if (!normalized) {
      return;
    }

    initializeQuizSession(normalized);
    router.push("/contents/Question1");
  };

  const handleRankingClick = () => {
    router.push("/contents/Ranking1");
  };

  const isTeamNameEmpty = teamName.trim().length === 0;

  return (
    <div className="bg-white w-full min-w-[1280px] min-h-[832px] flex flex-col">
      <header className="flex h-24 w-[618px] self-center relative mt-[157px] flex-col items-center">
        <h1 className="relative w-fit mt-[-1.00px] text-black text-[40px] [font-family:'Inter-Regular',Helvetica] font-normal tracking-[0] leading-[normal] whitespace-nowrap">
          石巻 ! 世界のスター
        </h1>

        <h2 className="relative w-fit text-black text-[40px] [font-family:'Inter-Regular',Helvetica] font-normal tracking-[0] leading-[normal] whitespace-nowrap">
          石巻のことどこまで知っているの?
        </h2>
      </header>
      <main className="flex flex-col items-center">
        <MotionCaptureEmbed className="mt-12 max-w-2xl" />

        <div className="flex ml-[442px] w-[375px] h-[70px] relative mt-32 flex-col items-start gap-3">
          <label
            htmlFor="team-name-input"
            className="relative w-fit mt-[-1.00px] text-black text-base text-center [font-family:'Inter-Regular',Helvetica] font-normal tracking-[0] leading-[normal] whitespace-nowrap"
          >
            チームの名前
          </label>

          <input
            id="team-name-input"
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="エントリー..."
            className="flex p-2.5 self-stretch w-full flex-[0_0_auto] border-[#c2c2c2] items-center gap-2.5 relative border border-solid text-[#808080] text-base [font-family:'Inter-Regular',Helvetica] font-normal tracking-[0] leading-[normal] placeholder:text-[#808080]"
            aria-label="チームの名前"
          />
          {startAttempted && isTeamNameEmpty && (
            <p className="text-sm text-rose-600">
              チーム名を入力してください。
            </p>
          )}
        </div>

        <button
          onClick={handleStartClick}
          disabled={isTeamNameEmpty}
          className="inline-flex ml-[548px] w-[123px] h-[72px] mt-[124px] justify-center p-6 rounded-[100px] border-black items-center gap-2.5 relative border border-solid cursor-pointer hover:bg-black hover:text-white transition-colors disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400"
          aria-label="スタート"
        >
          <span className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-xl tracking-[0] leading-[normal] whitespace-nowrap">
            START !
          </span>
        </button>

        <button
          onClick={handleRankingClick}
          className="ml-[562px] w-24 h-[19px] mt-[57px] text-black text-base [font-family:'Inter-Regular',Helvetica] font-normal tracking-[0] leading-[normal] whitespace-nowrap cursor-pointer hover:underline"
          aria-label="ランキングへ移動"
        >
          ランキングへ
        </button>
      </main>
    </div>
  );
}
