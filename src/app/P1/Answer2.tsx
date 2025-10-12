import React from "react";
import { AnswerTitleSet } from "./AnswerTitleSet";
import { Button } from "./Button";
import { Image } from "./Image";

export const Answer = () => {
  return (
    <div className="bg-white w-full min-w-[1280px] min-h-[832px] relative">
      <div className="flex w-[995px] items-center gap-[62px] absolute top-[340px] left-[136px]">
        <Image
          className="!left-[unset] ![display:unset] !top-[unset]"
          image="image.png"
          imageClassName="!h-full !flex-[unset] !absolute !left-0 !w-full !top-0"
          property1="landscape"
        />
        <div className="flex flex-col items-start justify-center gap-10 relative flex-1 self-stretch grow">
          <div className="relative self-stretch mt-[-1.00px] font-h2 font-[number:var(--h2-font-weight)] text-black text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)]">
            石巻ラーメン「サバだしラーメン」は、石巻市飯野川地区発祥のご当地ラーメンです。
          </div>

          <div className="flex flex-col h-[88px] items-start gap-3.5">
            <p className="relative self-stretch font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
              <span className="font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
                石巻は漁業がさかんで、特にサバがたくさんとれる地域です。
              </span>
            </p>

            <p className="relative self-stretch font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
              <span className="font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
                そのため、昔からサバのうま味を生かしたスープが作られてきました。
              </span>
            </p>

            <p className="relative self-stretch font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
              <span className="font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
                あっさりしていながらコクがある味わいが、石巻ラーメンの魅力です！
              </span>
            </p>
          </div>
        </div>
      </div>

      <AnswerTitleSet
        className="!absolute !left-0 !top-0"
        frameVector="vector-3.svg"
        shortAnswer="サバ"
      />
      <div className="flex-col w-[1280px] items-end gap-2.5 px-10 py-6 absolute left-0 bottom-0 bg-variable-collection-white shadow-tapbar-shadow flex justify-center">
        <Button
          className="!flex-[0_0_auto] !left-[unset] !top-[unset]"
          text="次の質問へ"
          vector="vector-4.svg"
        />
      </div>
    </div>
  );
};
