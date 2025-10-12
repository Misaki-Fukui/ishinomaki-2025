import React from "react";
import { AnswerTitleSet } from "./AnswerTitleSet";
import { Button } from "./Button";
import { Image } from "./Image";

export const Answer = () => {
  return (
    <div className="bg-white w-full min-w-[1280px] min-h-[832px] relative">
      <div className="flex w-[995px] items-center gap-[62px] absolute top-[298px] left-[143px]">
        <Image
          className="!left-[unset] ![display:unset] !top-[unset]"
          image="image.png"
          imageClassName="!h-full !flex-[unset] !absolute !left-0 !w-full !top-0"
          property1="portrait"
        />
        <div className="flex flex-col items-start justify-center gap-10 relative flex-1 grow">
          <div className="relative self-stretch mt-[-1.00px] font-h2 font-[number:var(--h2-font-weight)] text-black text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)]">
            東日本大震災の被害から再建された石巻売場が、「最も長い魚市
            場」として令和3年9月21日にギネス世界記録に認定されました。
          </div>

          <div className="flex flex-col h-56 items-start gap-3.5">
            <p className="relative self-stretch font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
              <span className="font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
                石巻市は全国でも有数の水揚げ量を誇る港町で、
              </span>
            </p>

            <p className="relative self-stretch font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
              <span className="font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
                この市場では毎日たくさんの魚が取引され、日本の水産業を支えています。
              </span>
            </p>

            <p className="relative self-stretch font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
              <span className="font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
                {" "}
                特に有名なのが以下の魚たちです：
              </span>
            </p>

            <p className="relative self-stretch font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
              <span className="font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
                {"  "}・カツオ（初夏から秋）
              </span>
            </p>

            <p className="relative self-stretch font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
              <span className="font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
                {"  "}・サンマ（秋）
              </span>
            </p>

            <p className="relative self-stretch font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
              <span className="font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
                {"  "}・サバ（通年）
              </span>
            </p>

            <p className="relative self-stretch font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
              <span className="font-text font-[number:var(--text-font-weight)] text-black text-[length:var(--text-font-size)] tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
                {"  "}・イワシ、サケ、ホヤ、カレイ、タコ、スルメイカなど
              </span>
            </p>
          </div>
        </div>
      </div>

      <AnswerTitleSet
        className="!absolute !left-0 !top-0"
        frameVector="vector-3.svg"
        shortAnswer="宮城県の石巻魚市場"
      />
      <div className="flex-col w-[1280px] items-end gap-2.5 px-10 py-6 absolute left-0 bottom-0 bg-variable-collection-white shadow-tapbar-shadow flex justify-center">
        <Button
          className="!flex-[0_0_auto] !left-[unset] !top-[unset]"
          text="ランキングへ"
          vector="vector-4.svg"
        />
      </div>
    </div>
  );
};
