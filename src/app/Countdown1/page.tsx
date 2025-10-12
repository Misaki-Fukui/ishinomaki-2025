import React from "react";

export const CountdownPage = () => {
  return (
    <div className="bg-white w-full min-w-[1280px] min-h-[832px] flex flex-col items-center gap-[117px]">
      <div className="h-[29px] w-[162px] mt-[125px] font-h1 font-[number:var(--h1-font-weight)] text-black text-[length:var(--h1-font-size)] tracking-[var(--h1-letter-spacing)] leading-[var(--h1-line-height)] whitespace-nowrap [font-style:var(--h1-font-style)]">
        Ready ?
      </div>

      <div className="h-[561px] w-[1280px] flex bg-[#7153d6] rounded-[0px_0px_100px_100px] overflow-hidden">
        <div className="inline-flex mt-[201px] w-[195px] h-[195px] ml-[542px] relative items-center gap-2.5 p-2.5 rounded-[100px] border border-solid border-variable-collection-white">
          <div className="flex flex-col w-[175px] h-[175px] items-center justify-center gap-2.5 p-2.5 relative rounded-[100px] border-[3px] border-solid border-variable-collection-white">
            <div className="relative w-fit [font-family:'Kiwi_Maru-Regular',Helvetica] font-normal text-variable-collection-white text-9xl tracking-[0] leading-[normal] whitespace-nowrap">
              3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
