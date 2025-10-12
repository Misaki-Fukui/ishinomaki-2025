import React from "react";

export const CountdownOver = () => {
  return (
    <div className="bg-white w-full min-w-[1280px] min-h-[832px] relative">
      <div className="absolute top-[692px] left-[calc(50.00%_-_640px)] w-[1280px] h-[140px] bg-[#7153d6] rounded-[0px_0px_100px_100px]" />

      <div className="absolute top-[calc(50.00%_-_47px)] left-[calc(50.00%_-_259px)] font-big font-[number:var(--big-font-weight)] text-variable-collection-color text-[length:var(--big-font-size)] tracking-[var(--big-letter-spacing)] leading-[var(--big-line-height)] whitespace-nowrap [font-style:var(--big-font-style)]">
        START !
      </div>
    </div>
  );
};
