import React from "react";
import { AnswerTitleSet } from "./AnswerTitleSet";
import { Button } from "./Button";
import { Image } from "./Image";

export const Answer = () => {
  return (
    <div className="bg-white w-full min-w-[1280px] min-h-[832px] relative">
      <div className="flex w-[995px] items-center gap-[62px] absolute top-[347px] left-[143px]">
        <Image
          className="!left-[unset] ![display:unset] !top-[unset]"
          image="image.png"
          imageClassName="!h-full !flex-[unset] !absolute !left-0 !w-full !top-0"
          property1="landscape"
        />
        <div className="flex flex-col items-start justify-center gap-10 relative flex-1 self-stretch grow">
          <div className="relative self-stretch mt-[-1.00px] font-h2 font-[number:var(--h2-font-weight)] text-black text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)]">
            慶長遣欧使節団が出航したのは、石巻港 です。
          </div>

          <div className="flex flex-col h-[114px] items-start gap-3.5">
            <p className="relative self-stretch font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
              <span className="font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
                1613年、伊達政宗が派遣した 慶長遣欧使節団
                は、支倉常長らを乗せた船「サン・ファン・バウティスタ号」で、石巻港からメキシコ・スペインへと出航しました。
              </span>
            </p>

            <p className="relative self-stretch font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
              <span className="font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
                この航海は、日本とヨーロッパを結ぶ歴史的な大航海として知られ、石巻はその出発地として重要な役割を果たしました。
              </span>
            </p>
          </div>
        </div>
      </div>

      <AnswerTitleSet
        className="!absolute !left-0 !top-0"
        frameVector="vector-2.svg"
        shortAnswer="石巻港"
      />
      <div className="flex-col w-[1280px] items-end gap-2.5 px-10 py-6 absolute left-0 bottom-0 bg-variable-collection-white shadow-tapbar-shadow flex justify-center">
        <Button
          className="!flex-[0_0_auto] !left-[unset] !top-[unset]"
          text="次の質問へ"
          vector="vector-3.svg"
        />
      </div>
    </div>
  );
};
