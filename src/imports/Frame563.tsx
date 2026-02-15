import svgPaths from "./svg-qmf2tcs73q";

function Frame() {
  return (
    <button className="bg-[#d9d9d9] content-stretch cursor-pointer flex gap-[6.349px] items-center justify-center overflow-clip px-[12.698px] py-[8.889px] relative rounded-[67.302px]">
      <div className="h-[17.778px] relative shrink-0 w-[10.37px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.3704 17.7778">
          <path d={svgPaths.p1fb83480} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <p className="font-['KMR_Waldenburg:Buch',sans-serif] leading-[normal] not-italic relative shrink-0 text-[15px] text-black text-left tracking-[-0.45px]">Cancel</p>
    </button>
  );
}

function Frame2() {
  return (
    <div className="border border-black border-solid h-[387px] overflow-clip relative rounded-[12px] w-[282px]">
      <p className="-translate-x-full absolute font-['KMR_Waldenburg:Fett',sans-serif] leading-[normal] left-[95px] not-italic text-[#2d2d2d] text-[12px] text-right top-[12px] tracking-[-0.36px]">Leave a Review</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#171717] relative rounded-[67.302px]">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[12.698px] py-[8.889px] relative rounded-[inherit]">
        <p className="font-['KMR_Waldenburg:Buch',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#d6d6d6] text-[15px] tracking-[-0.45px]">Save</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[67.302px]" />
    </div>
  );
}

export default function Frame3() {
  return (
    <div className="bg-white overflow-clip relative rounded-bl-[15px] rounded-br-[15px] shadow-[0px_-2px_4.5px_0px_rgba(0,0,0,0.25)] size-full">
      <div className="-translate-x-1/2 absolute bottom-[2.87%] flex items-center justify-center left-[calc(50%-0.5px)] top-[97.13%] w-[37px]">
        <div className="flex-none h-px rotate-180 w-[37px]">
          <div className="relative size-full">
            <div className="absolute inset-[-1px_-2.7%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 2">
                <path d="M1 1H38" id="Line 15" stroke="var(--stroke-0, #DCDCDC)" strokeLinecap="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[216.88px] top-[540.22px]">
        <div className="flex-none rotate-180">
          <Frame />
        </div>
      </div>
      <div className="absolute flex h-[387px] items-center justify-center left-[19px] top-[120px] w-[282px]">
        <div className="flex-none rotate-180">
          <Frame2 />
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[18.6px] top-[540.22px]">
        <div className="flex-none rotate-180">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}