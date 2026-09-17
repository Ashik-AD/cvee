function Toolbar() {
  return (
    <div className="self-stretch flex flex-col justify-start items-start gap-2">
      <div className="self-stretch pb-1.5 border-b border-Color-Neutral-2A2A2A inline-flex justify-between items-center">
        <div className="size- flex justify-start items-center gap-1.5">
          <div className="size- flex justify-start items-end gap-1">
            <div className="justify-center text-Color-Neutral-FFFFFF text-base font-medium font-['Geist'] leading-6">
              All CVs{" "}
            </div>
            <div className="justify-center text-Color-Neutral-8E9192 text-xs font-normal font-['Nimbus_Mono_PS'] leading-4">
              (4)
            </div>
          </div>
          <div className="w-px h-4 bg-Color-Neutral-2A2A2A" />
          <div className="size- flex justify-start items-center gap-1">
            <div className="h-7 px-1 bg-Color-Neutral-2A2A2A rounded-xs flex justify-start items-center gap-1">
              <div className="size- inline-flex flex-col justify-start items-center">
                <div className="size-2.5 bg-Color-Neutral-FFFFFF" />
              </div>
              <div className="size- inline-flex flex-col justify-start items-center">
                <div className="text-center justify-center text-Color-Neutral-FFFFFF text-xs font-normal font-['Nimbus_Mono_PS'] leading-4">
                  Grid
                </div>
              </div>
            </div>
            <div className="h-7 px-1 rounded-xs flex justify-start items-center gap-1">
              <div className="size- inline-flex flex-col justify-start items-center">
                <div className="size-2.5 bg-Color-Neutral-8E9192" />
              </div>
              <div className="size- inline-flex flex-col justify-start items-center">
                <div className="text-center justify-center text-Color-Neutral-8E9192 text-xs font-normal font-['Nimbus_Mono_PS'] leading-4">
                  Table
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="size- flex justify-start items-center gap-1">
          <div className="size- inline-flex flex-col justify-start items-start">
            <div className="justify-center text-Color-Neutral-8E9192 text-xs font-normal font-['Nimbus_Mono_PS'] leading-4">
              Sort:
            </div>
          </div>
          <div className="size- p-1 bg-Color-Neutral-1C1B1B rounded-xs outline outline-1 outline-offset-[-1px] outline-Color-Neutral-2A2A2A flex justify-start items-center gap-1">
            <div className="size- inline-flex flex-col justify-start items-center">
              <div className="text-center justify-center text-Color-Neutral-E5E2E1 text-xs font-normal font-['Nimbus_Mono_PS'] leading-4">
                Last modified
              </div>
            </div>
            <div className="size- inline-flex flex-col justify-start items-center">
              <div className="w-1.5 h-1 bg-Color-Neutral-E5E2E1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
