import { DateSection } from "./DateSection";
import { NewSection } from "./NewSection";

export const ScheduleHeader = () => {
  return (
    <header className="w-full h-[12vh] flex justify-evenly items-center bg-neutral-50">
      <DateSection />

      <NewSection />
    </header>
  );
};
