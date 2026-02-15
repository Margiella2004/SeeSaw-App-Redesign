import svgPaths from "./svg-znqk1pmvk5";

function Frame() {
  return (
    <div className="bg-[#efeeee] h-[34px] overflow-clip relative rounded-[7px] w-[291px]">
      <p className="absolute font-['KMR_Waldenburg:Normal',sans-serif] font-medium leading-[normal] left-[38px] not-italic text-[#828181] text-[12px] top-[9px] tracking-[-0.84px]">Delete the crawl</p>
      <div className="absolute inset-[20.59%_90.72%_20.59%_2.41%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <path d={svgPaths.p1dd942a0} fill="var(--fill-0, #B8B8B8)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="h-[34px] overflow-clip relative rounded-[7px] w-[291px]">
      <p className="absolute font-['KMR_Waldenburg:Normal',sans-serif] font-medium inset-[26.47%_63.57%_29.41%_13.06%] leading-[normal] not-italic text-[#828181] text-[12px] tracking-[-0.84px]">Edit the crawl</p>
      <div className="absolute inset-[17.65%_91.06%_29.4%_2.75%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0025 18.0025">
          <path d={svgPaths.p29426200} fill="var(--fill-0, #B8B8B8)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <button className="block cursor-pointer h-[14px] relative w-[48px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 14">
        <g id="Frame 587">
          <path d="M7 3H44" id="Line 15" stroke="var(--stroke-0, #DCDCDC)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </button>
  );
}

export default function Frame1() {
  return (
    <div className="bg-white overflow-clip relative rounded-bl-[15px] rounded-br-[15px] shadow-[0px_-2px_4.5px_0px_rgba(0,0,0,0.25)] size-full">
      <div className="absolute flex inset-[79.88%_6.87%_9.15%_71.56%] items-center justify-center">
        <div className="flex-none h-[18px] rotate-180 w-[69px]">
          <p className="font-['KMR_Waldenburg:Halbfett',sans-serif] leading-[normal] not-italic relative text-[#3f3f3f] text-[15px] tracking-[-0.45px]">Edit Crawl</p>
        </div>
      </div>
      <div className="absolute flex h-[34px] items-center justify-center left-[13px] top-[82px] w-[291px]">
        <div className="flex-none rotate-180">
          <Frame />
        </div>
      </div>
      <div className="absolute flex h-[34px] items-center justify-center left-[13px] top-[45px] w-[291px]">
        <div className="flex-none rotate-180">
          <Frame3 />
        </div>
      </div>
      <div className="absolute flex h-[14px] items-center justify-center left-[138px] top-[150px] w-[48px]">
        <div className="flex-none rotate-180">
          <Frame2 />
        </div>
      </div>
    </div>
  );
}