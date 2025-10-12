import React from "react";
import { AnswerTitleSet } from "./AnswerTitleSet";
import { Button } from "./Button";
import { Image } from "./Image";

export const Answer = () => {
  return (
    <div className="bg-white w-full min-w-[1280px] min-h-[832px] relative">
      <div className="flex w-[995px] items-center gap-[62px] absolute top-[294px] left-[143px]">
        <Image
          className="!left-[unset] ![display:unset] !top-[unset]"
          image="image.png"
          imageClassName="!h-full !flex-[unset] !absolute !left-0 !w-full !top-0"
          property1="landscape"
        />
        <div className="flex flex-col items-start justify-center gap-10 relative flex-1 self-stretch grow">
          <div className="relative self-stretch mt-[-1.00px] font-h2 font-[number:var(--h2-font-weight)] text-black text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)]">
            宮城県慶長使節船ミュージアム（サン・ファン館）
            は、伊達政宗の命を受けてヨーロッパへ渡った 慶長遣欧使節団
            の歴史を伝える博物館です。
          </div>

          <div className="flex flex-col h-[162px] items-start gap-3.5">
            <p className="relative self-stretch font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
              <span className="font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
                ここでは、支倉常長らが乗ってヨーロッパへ旅立った
              </span>
            </p>

            <p className="relative self-stretch font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
              <span className="font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
                ガレオン船「サン・ファン・バウティスタ号」
                の実物大復元船が展示されていました。
              </span>
            </p>

            <p className="relative self-stretch font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
              <span className="font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
                展示館内では、当時の造船技術、航海の記録、国際交流の歴史などがわかりやすく紹介され、
              </span>
            </p>

            <p className="relative self-stretch font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
              <span className="font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
                日本と世界を繋いだ壮大な冒険の物語を体感できる施設として人気があります。
              </span>
            </p>
          </div>
        </div>
      </div>

      <AnswerTitleSet
        className="!absolute !left-0 !top-0"
        frameVector="vector-2.svg"
        shortAnswer="宮城県慶長使節船ミュージアム"
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
