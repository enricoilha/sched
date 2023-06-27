import { useAtom } from "jotai";
import { DayColumn } from "./DayColumn";
import { TimeSection } from "./TimeSection";
import { DateAtom } from "../../atoms/date";
import { BoardHeader } from "./BoardHeader";

export const ScheduleBackground = () => {
  const [date] = useAtom(DateAtom);

  return (
    <>
      <section className="w-[80vw] h-[70vh] bg-white">
        <BoardHeader />
        <div className="w-full flex mt-10 h-full overflow-auto">
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
