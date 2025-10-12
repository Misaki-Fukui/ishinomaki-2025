import React from "react";
import { Button } from "./Button";
import image from "./image.svg";
import shape2 from "./shape-2.svg";
import shape3 from "./shape-3.svg";
import shape from "./shape.svg";
import vector52 from "./vector-5-2.svg";
import vector53 from "./vector-5-3.svg";
import vector54 from "./vector-5-4.svg";
import vector55 from "./vector-5-5.svg";
import vector5 from "./vector-5.svg";

export const RankingPlayer = () => {
  return (
    <div className="bg-white w-full min-w-[1280px] min-h-[832px] flex flex-col justify-between">
      <div className="h-[731px] w-[1280px] self-center flex items-center justify-center bg-variable-collection-color-20">
        <div className="flex h-[618px] w-[676px] relative flex-col items-center gap-[60px]">
          <div className="inline-flex flex-col items-center gap-3 relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] font-chips font-[number:var(--chips-font-weight)] text-variable-collection-black text-[length:var(--chips-font-size)] text-center tracking-[var(--chips-letter-spacing)] leading-[var(--chips-line-height)] [font-style:var(--chips-font-style)]">
              Thank you !
            </div>

            <div className="relative w-fit font-h1 font-[number:var(--h1-font-weight)] text-variable-collection-black text-[length:var(--h1-font-size)] tracking-[var(--h1-letter-spacing)] leading-[var(--h1-line-height)] whitespace-nowrap [font-style:var(--h1-font-style)]">
              石巻に移住しちゃう ?
            </div>
          </div>

          <div className="flex flex-col items-start gap-10 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
              <div className="mt-[-1.00px] ml-[-1.00px] mr-[-1.00px] rounded-[100px_12px_12px_100px] border border-solid border-variable-collection-color-20 flex items-center gap-6 relative self-stretch w-full flex-[0_0_auto] bg-variable-collection-white">
                <div className="flex w-[70px] items-center justify-center gap-2.5 px-[27px] py-2.5 relative rounded-xl">
                  <img
                    className="absolute top-[calc(50.00%_-_50px)] left-[calc(50.00%_-_48px)] w-[95px] h-[91px]"
                    alt="Shape"
                    src={shape}
                  />

                  <div className="relative w-fit mt-[-1.00px] font-h2 font-[number:var(--h2-font-weight)] text-variable-collection-black text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)]">
                    1
                  </div>
                </div>

                <div className="relative flex-1 font-h2 font-[number:var(--h2-font-weight)] text-black text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)]">
                  Team 1
                </div>

                <div className="inline-flex items-center gap-8 px-8 py-0 relative self-stretch flex-[0_0_auto]">
                  <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Kiwi_Maru-Regular',Helvetica] font-normal text-variable-collection-grey text-xs tracking-[0] leading-5 whitespace-nowrap">
                      正解
                    </div>

                    <div className="text-variable-collection-color text-center relative w-fit font-button font-[number:var(--button-font-weight)] text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)] [font-style:var(--button-font-style)]">
                      0/5
                    </div>
                  </div>

                  <img
                    className="relative w-px h-[48.5px]"
                    alt="Vector"
                    src={vector53}
                  />

                  <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Kiwi_Maru-Regular',Helvetica] font-normal text-variable-collection-grey text-xs tracking-[0] leading-5 whitespace-nowrap">
                      答え時間
                    </div>

                    <div className="text-variable-collection-color text-center relative w-fit font-button font-[number:var(--button-font-weight)] text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)] [font-style:var(--button-font-style)]">
                      15秒
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 relative self-stretch w-full flex-[0_0_auto] ml-[-1.00px] mr-[-1.00px] bg-variable-collection-white rounded-[100px_12px_12px_100px] border border-solid border-variable-collection-color-20">
                <div className="flex w-[70px] items-center justify-center gap-2.5 px-[27px] py-2.5 relative rounded-xl">
                  <img
                    className="absolute top-[calc(50.00%_-_50px)] left-[calc(50.00%_-_48px)] w-[95px] h-[91px] aspect-[1]"
                    alt="Shape"
                    src={shape2}
                  />

                  <div className="relative w-fit mt-[-1.00px] ml-[-2.50px] mr-[-2.50px] font-h2 font-[number:var(--h2-font-weight)] text-variable-collection-black text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)]">
                    2
                  </div>
                </div>

                <div className="relative flex-1 font-h2 font-[number:var(--h2-font-weight)] text-black text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)]">
                  Team 1
                </div>

                <div className="inline-flex items-center gap-8 px-8 py-0 relative self-stretch flex-[0_0_auto]">
                  <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Kiwi_Maru-Regular',Helvetica] font-normal text-variable-collection-grey text-xs tracking-[0] leading-5 whitespace-nowrap">
                      正解
                    </div>

                    <div className="text-variable-collection-color text-center relative w-fit font-button font-[number:var(--button-font-weight)] text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)] [font-style:var(--button-font-style)]">
                      0/5
                    </div>
                  </div>

                  <img
                    className="relative w-px h-[48.5px]"
                    alt="Vector"
                    src={vector54}
                  />

                  <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Kiwi_Maru-Regular',Helvetica] font-normal text-variable-collection-grey text-xs tracking-[0] leading-5 whitespace-nowrap">
                      答え時間
                    </div>

                    <div className="text-variable-collection-color text-center relative w-fit font-button font-[number:var(--button-font-weight)] text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)] [font-style:var(--button-font-style)]">
                      15秒
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 relative self-stretch w-full flex-[0_0_auto] ml-[-1.00px] mr-[-1.00px] bg-variable-collection-white rounded-[100px_12px_12px_100px] border border-solid border-variable-collection-color-20">
                <div className="flex w-[70px] items-center justify-center gap-2.5 px-[27px] py-2.5 relative rounded-xl">
                  <img
                    className="absolute top-[calc(50.00%_-_50px)] left-[calc(50.00%_-_48px)] w-[95px] h-[91px] aspect-[1]"
                    alt="Shape"
                    src={shape3}
                  />

                  <div className="relative w-fit mt-[-1.00px] ml-[-2.00px] mr-[-2.00px] font-h2 font-[number:var(--h2-font-weight)] text-variable-collection-black text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)]">
                    3
                  </div>
                </div>

                <div className="relative flex-1 font-h2 font-[number:var(--h2-font-weight)] text-black text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)]">
                  Team 1
                </div>

                <div className="inline-flex items-center gap-8 px-8 py-0 relative self-stretch flex-[0_0_auto]">
                  <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Kiwi_Maru-Regular',Helvetica] font-normal text-variable-collection-grey text-xs tracking-[0] leading-5 whitespace-nowrap">
                      正解
                    </div>

                    <div className="text-variable-collection-color text-center relative w-fit font-button font-[number:var(--button-font-weight)] text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)] [font-style:var(--button-font-style)]">
                      0/5
                    </div>
                  </div>

                  <img
                    className="relative w-px h-[48.5px]"
                    alt="Vector"
                    src={vector55}
                  />

                  <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Kiwi_Maru-Regular',Helvetica] font-normal text-variable-collection-grey text-xs tracking-[0] leading-5 whitespace-nowrap">
                      答え時間
                    </div>

                    <div className="text-variable-collection-color text-center relative w-fit font-button font-[number:var(--button-font-weight)] text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)] [font-style:var(--button-font-style)]">
                      15秒
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 relative self-stretch w-full flex-[0_0_auto] ml-[-1.00px] mr-[-1.00px] bg-variable-collection-white rounded-xl shadow-card border-variable-collection-color-20">
                <div className="bg-variable-collection-white border border-solid border-variable-collection-color-20 flex w-[70px] h-[70px] items-center justify-center gap-2.5 px-[27px] py-2.5 relative rounded-xl">
                  <div className="relative w-fit ml-[-1.50px] mr-[-1.50px] font-h2 font-[number:var(--h2-font-weight)] text-variable-collection-color text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)]">
                    4
                  </div>
                </div>

                <div className="relative flex-1 font-h2 font-[number:var(--h2-font-weight)] text-black text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)]">
                  Team 1
                </div>

                <div className="inline-flex items-center gap-8 px-8 py-0 relative self-stretch flex-[0_0_auto]">
                  <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Kiwi_Maru-Regular',Helvetica] font-normal text-variable-collection-grey text-xs tracking-[0] leading-5 whitespace-nowrap">
                      正解
                    </div>

                    <div className="text-variable-collection-color text-center relative w-fit font-button font-[number:var(--button-font-weight)] text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)] [font-style:var(--button-font-style)]">
                      0/5
                    </div>
                  </div>

                  <img
                    className="relative w-px h-[48.5px]"
                    alt="Vector"
                    src={vector5}
                  />

                  <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Kiwi_Maru-Regular',Helvetica] font-normal text-variable-collection-grey text-xs tracking-[0] leading-5 whitespace-nowrap">
                      答え時間
                    </div>

                    <div className="text-variable-collection-color text-center relative w-fit font-button font-[number:var(--button-font-weight)] text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)] [font-style:var(--button-font-style)]">
                      15秒
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 relative self-stretch w-full flex-[0_0_auto] ml-[-1.00px] mr-[-1.00px] bg-variable-collection-white rounded-xl shadow-card border-variable-collection-color-20">
                <div className="bg-variable-collection-white border border-solid border-variable-collection-color-20 flex w-[70px] h-[70px] items-center justify-center gap-2.5 px-[27px] py-2.5 relative rounded-xl">
                  <div className="ml-[-2.00px] mr-[-2.00px] text-variable-collection-color relative w-fit font-h2 font-[number:var(--h2-font-weight)] text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)]">
                    5
                  </div>
                </div>

                <div className="relative flex-1 font-h2 font-[number:var(--h2-font-weight)] text-black text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)]">
                  Team 1
                </div>

                <div className="inline-flex items-center gap-8 px-8 py-0 relative self-stretch flex-[0_0_auto]">
                  <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Kiwi_Maru-Regular',Helvetica] font-normal text-variable-collection-grey text-xs tracking-[0] leading-5 whitespace-nowrap">
                      正解
                    </div>

                    <div className="text-variable-collection-color text-center relative w-fit font-button font-[number:var(--button-font-weight)] text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)] [font-style:var(--button-font-style)]">
                      0/5
                    </div>
                  </div>

                  <img
                    className="relative w-px h-[48.5px]"
                    alt="Vector"
                    src={image}
                  />

                  <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Kiwi_Maru-Regular',Helvetica] font-normal text-variable-collection-grey text-xs tracking-[0] leading-5 whitespace-nowrap">
                      答え時間
                    </div>

                    <div className="text-variable-collection-color text-center relative w-fit font-button font-[number:var(--button-font-weight)] text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)] [font-style:var(--button-font-style)]">
                      15秒
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-[-3.00px] ml-[-3.00px] mr-[-3.00px] rounded-xl border-[3px] border-solid border-variable-collection-color flex items-center gap-6 relative self-stretch w-full flex-[0_0_auto] bg-variable-collection-white">
                <div className="bg-variable-collection-color flex w-[70px] h-[70px] items-center justify-center gap-2.5 px-[27px] py-2.5 relative rounded-xl">
                  <div className="ml-[-9.50px] mr-[-9.50px] text-variable-collection-white relative w-fit font-h2 font-[number:var(--h2-font-weight)] text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)]">
                    13
                  </div>
                </div>

                <div className="relative w-3 h-3 bg-variable-collection-color rounded-md aspect-[1]" />

                <div className="relative flex-1 font-h2 font-[number:var(--h2-font-weight)] text-variable-collection-black text-[length:var(--h2-font-size)] tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)]">
                  Team 1
                </div>

                <div className="inline-flex items-center gap-8 px-8 py-0 relative self-stretch flex-[0_0_auto]">
                  <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Kiwi_Maru-Regular',Helvetica] font-normal text-variable-collection-grey text-xs tracking-[0] leading-5 whitespace-nowrap">
                      正解
                    </div>

                    <div className="text-variable-collection-color text-center relative w-fit font-button font-[number:var(--button-font-weight)] text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)] [font-style:var(--button-font-style)]">
                      0/5
                    </div>
                  </div>

                  <img
                    className="relative w-px h-[48.5px]"
                    alt="Vector"
                    src={vector52}
                  />

                  <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Kiwi_Maru-Regular',Helvetica] font-normal text-variable-collection-grey text-xs tracking-[0] leading-5 whitespace-nowrap">
                      答え時間
                    </div>

                    <div className="text-variable-collection-color text-center relative w-fit font-button font-[number:var(--button-font-weight)] text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)] [font-style:var(--button-font-style)]">
                      15秒
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-[1280px] h-[101px] relative flex-col items-end justify-center gap-2.5 px-10 py-6 bg-variable-collection-white shadow-tapbar-shadow">
        <Button
          className="!flex-[0_0_auto] !left-[unset] !top-[unset]"
          text="ホームへ"
          vector="vector-2.svg"
        />
      </div>
    </div>
  );
};
