import React from "react";
import { Button } from "./Button";

export const Home = () => {
  return (
    <div className="bg-[#ffffff] w-full min-w-[1280px] min-h-[832px] relative">
      <div className="absolute top-[738px] left-[calc(50.00%_-_48px)] font-button font-[number:var(--button-font-weight)] text-variable-collection-color text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)] [font-style:var(--button-font-style)]">
        ランキングへ
      </div>

      <div className="absolute top-0 left-[calc(50.00%_-_640px)] w-[1280px] h-[512px] flex justify-center bg-[#7153d6] rounded-[0px_0px_100px_100px] overflow-hidden">
        <div className="flex mt-[157px] w-[618px] h-[90px] relative flex-col items-center gap-6">
          <div className="inline-flex items-center justify-center gap-2.5 px-3 py-1 relative flex-[0_0_auto] bg-variable-collection-white rounded-[100px]">
            <div className="relative w-fit mt-[-1.00px] font-chips font-[number:var(--chips-font-weight)] text-variable-collection-color text-[length:var(--chips-font-size)] tracking-[var(--chips-letter-spacing)] leading-[var(--chips-line-height)] [font-style:var(--chips-font-style)]">
              石巻 ! 世界のスター
            </div>
          </div>

          <div className="relative w-fit ml-[-3.00px] mr-[-3.00px] font-h1 font-[number:var(--h1-font-weight)] text-variable-collection-white text-[length:var(--h1-font-size)] tracking-[var(--h1-letter-spacing)] leading-[var(--h1-line-height)] whitespace-nowrap [font-style:var(--h1-font-style)]">
            石巻のことどこまで知っているの?
          </div>
        </div>
      </div>

      <div className="inline-flex flex-col items-start gap-2.5 p-[60px] absolute top-[416px] left-[331px] bg-variable-collection-white rounded-[50px] shadow-card">
        <div className="flex items-end gap-16 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col w-80 items-start gap-1.5 relative">
            <div className="relative w-fit mt-[-1.00px] font-text font-[number:var(--text-font-weight)] text-variable-collection-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] whitespace-nowrap [font-style:var(--text-font-style)]">
              チームの名前
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2.5 relative self-stretch w-full flex-[0_0_auto] bg-white rounded-lg overflow-hidden border border-solid border-gray-300 shadow-shadow-xs">
              <input
                className="relative grow border-[none] [background:none] flex-1 mt-[-1.00px] font-text font-[number:var(--text-font-weight)] text-variable-collection-grey text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)] p-0"
                placeholder="Enter team name..."
                type="text"
              />
            </div>
          </div>

          <Button
            className="!flex-[0_0_auto] !left-[unset] !top-[unset]"
            text="Start"
            vector="image.svg"
          />
        </div>
      </div>
    </div>
  );
};
