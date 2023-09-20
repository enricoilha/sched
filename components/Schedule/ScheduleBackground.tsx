import { useAtom } from "jotai";
import { DayColumn } from "./DayColumn";
import { TimeSection } from "./TimeSection";
import { DateAtom } from "../../atoms/date";
import { BoardHeader } from "./BoardHeader";

export const ScheduleBackground = () => {
  const [date] = useAtom(DateAtom);

  return (
    <>
      <section className="w-[80vw] h-full bg-white shadow-sm rounded-xl">
        <BoardHeader />
        <div className="w-[80vw] flex mt-10 h-full overflow-x-auto p-3 pb-0" >
          <TimeSection />
          <DayColumn />
          <DayColumn />
          <DayColumn />
          <DayColumn />
          <DayColumn />

        </div>
      </section>
    </>
  );
};
