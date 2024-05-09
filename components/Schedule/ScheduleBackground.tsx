import { useAtom } from "jotai";
import { DayColumn } from "./DayColumn";
import { TimeSection } from "./TimeSection";
import { DateAtom } from "../../atoms/date";
import { BoardHeader } from "./BoardHeader";

export const ScheduleBackground = () => {
  const [date] = useAtom(DateAtom);

  return (
    <>
      <section className="h-full w-[80vw] overflow-hidden rounded-xl bg-white shadow-sm">
        <BoardHeader />
        <div className="mt-10 flex h-full w-[80vw] overflow-x-auto p-3 pb-0">
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
