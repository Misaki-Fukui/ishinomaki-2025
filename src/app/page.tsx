// src/app/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { questions } from "./lib/questions";
import QuestionCard from "./components/QuestionCard";

type AnswersMap = Record<string, string>;

export default function Page() {
  const router = useRouter();

  const [teamName, setTeamName] = useState("");

  const handleStartClick = () => {
    
    //スタートボタンを押した時の処理を記述します
    console.log("Starting with team name:", teamName);
  };

  const handleRankingClick = () => {
    //ランキングボタンを押した時の処理を記述します
    console.log("Navigating to rankings");
    //router.push("/mediapipe-samble/index.html")
    router.push("/result");
  };

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
      
      {/* モーションキャプチャ部分　はじめ */}
      <script
        type="importmap"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            imports: {
              "@mediapipe/tasks-vision":
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/vision_bundle.mjs",
            },
          }),
        }}
      />
      <Script src="/mediapipe-sample/script.js" type="module" strategy="afterInteractive" />
      <main className="flex flex-col items-center">
        <div className="container">
          <div id="pose_label">ポーズ: -</div>
          <video id="webcam" autoPlay playsInline muted></video>
          <canvas id="output_canvas"></canvas>
          <div
            id="hand_status"
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            上半身をカメラに映してください
          </div>
        </div>
        {/* モーションキャプチャ部分　おわり */}

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
        </div>

        <button
          onClick={handleStartClick}
          className="inline-flex ml-[548px] w-[123px] h-[72px] mt-[124px] justify-center p-6 rounded-[100px] border-black items-center gap-2.5 relative border border-solid cursor-pointer hover:bg-black hover:text-white transition-colors"
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
