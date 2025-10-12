import React from "react";
import { AnswerTitleSet } from "./AnswerTitleSet";
import { Button } from "./Button";
import { Image } from "./Image";

export const Answer = () => {
  return (
    <div className="bg-white w-full min-w-[1280px] min-h-[832px] relative">
      <div className="flex w-[995px] items-center gap-[62px] absolute top-[314px] left-[143px]">
        <Image
          className="!left-[unset] ![display:unset] !top-[unset]"
          image="image.png"
          imageClassName="!h-full !flex-[unset] !absolute !left-0 !w-full !top-0"
          property1="portrait"
        />
        <div className="flex flex-col items-start justify-center gap-10 relative flex-1 grow">
          <div className="relative self-stretch mt-[-1.00px] font-h2 font-[number:var(--h2-font-weight)] text-black text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)]">
            石ノ森萬画館は、漫画家の石ノ森章太郎さんを記念して作られました。
          </div>

          <div className="flex flex-col h-32 items-start gap-3.5">
            <p className="relative self-stretch font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
              <span className="font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
                石ノ森先生は「漫画」を「萬画」と表現しました。
              </span>
            </p>

            <p className="relative self-stretch font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
              <span className="font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
                石ノ森萬画館は、このような萬画家（マンガ家）石ノ森章太郎先生の作品と理念を通して、来館した方々に石ノ森先生の数々の作品をあらゆる角度からご覧いただく事で、マンガの可能性を体験し学んでもらう事を目的としたマンガミュージアムとなっています。
              </span>
            </p>

            <p className="relative self-stretch font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
              <span className="font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
                石ノ森萬画館外観は石ノ森章太郎原案の宇宙船をイメージして建設された。
              </span>
            </p>
          </div>
        </div>
      </div>

      <AnswerTitleSet
        className="!absolute !left-0 !top-0"
        frameVector="vector-4.svg"
        shortAnswer="石ノ森章太郎"
      />
      <div className="flex-col w-[1280px] items-end gap-2.5 px-10 py-6 absolute left-0 bottom-0 bg-variable-collection-white shadow-tapbar-shadow flex justify-center">
        <Button
          className="!flex-[0_0_auto] !left-[unset] !top-[unset]"
          text="次の質問へ"
          vector="vector-2.svg"
        />
      </div>
    </div>
  );
};
