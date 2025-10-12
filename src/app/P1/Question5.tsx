import React from "react";
import { QuestionSet } from "./QuestionSet";
import image3 from "./image-3.png";
import vector from "./vector.svg";

export const Question = () => {
  return (
    <div className="bg-white w-full min-w-[1280px] min-h-[832px] relative">
      <div className="absolute top-0 left-[calc(50.00%_-_640px)] w-[1280px] h-[400px] bg-[#7153d6] rounded-[0px_0px_100px_100px]" />

      <QuestionSet
        answerAText="A. 　東京都の豊洲市場"
        answerBText="B. 　宮城県の石巻魚市場"
        answerCText="C. 　北海道の函館朝市"
        answerImg="rectangle-7.png"
        answerRectangle="rectangle-8.png"
        answerRectangle1="rectangle-6.png"
        className="!absolute !left-[143px] !top-[67px]"
        question="ギネス世界記録に「最も長い魚市場」として認定されている、全長875.47メートルを誇る日本の魚市場はどこでしょう？"
        text="質問　5/5"
      />
      <div className="inline-flex items-center justify-center gap-6 p-10 absolute right-0 bottom-0 rounded-[50px_0px_0px_0px] border-variable-collection-color">
        <div className="inline-flex flex-col items-end justify-end gap-10 px-0 py-1 relative self-stretch flex-[0_0_auto]">
          <div className="inline-flex gap-[5px] flex-[0_0_auto] flex-col items-center relative">
            <div className="text-variable-collection-grey text-[length:var(--text-font-size)] leading-[var(--text-line-height)] whitespace-nowrap relative w-fit mt-[-1.00px] font-text font-[number:var(--text-font-weight)] text-center tracking-[var(--text-letter-spacing)] [font-style:var(--text-font-style)]">
              答え時間
            </div>

            <div className="inline-flex items-center justify-center gap-2.5 p-3 relative flex-[0_0_auto] bg-variable-collection-color-20 rounded-xl">
              <div className="relative w-10 h-10 aspect-[1]">
                <img
                  className="absolute w-[75.00%] h-[87.50%] top-[4.17%] left-[12.50%]"
                  alt="Vector"
                  src={vector}
                />
              </div>

              <div className="text-[#7152d5] text-[length:var(--h2-font-size)] leading-[var(--h2-line-height)] relative w-fit mt-[-1.00px] font-h2 font-[number:var(--h2-font-weight)] text-center tracking-[var(--h2-letter-spacing)] [font-style:var(--h2-font-style)]">
                5秒
              </div>
            </div>
          </div>
        </div>

        <img
          className="relative w-[336px] h-[189px] aspect-[1.78] object-cover"
          alt="Image"
          src={image3}
        />
      </div>
    </div>
  );
};
