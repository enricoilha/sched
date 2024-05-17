import { DateSection } from "./DateSection";
import { NewSection } from "./NewSection";

export const ScheduleHeader = () => {
  return (
    <header className="flex h-[12vh] w-full items-center justify-evenly ">
      <DateSection />

      <NewSection />
    </header>
  );
};
