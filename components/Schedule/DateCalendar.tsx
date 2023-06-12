import { RefObject, useEffect, useRef } from "react";
import { DatepickerComponent } from "../Datepicker";

interface DateCalendarProps {
  setClosed: any;
  isOpen: boolean;
  buttonRef: RefObject<HTMLDivElement> | null;
}

export const DateCalendar = ({ setClosed, buttonRef }: DateCalendarProps) => {
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: any) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(e.target) &&
      !buttonRef?.current?.contains(e.target)
    ) {
      return setClosed(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      ref={calendarRef}
      className="absolute w-80 rounded-lg flex items-center justify-center h-80 p-3 shadow-md border bg-white z-50 top-12 "
    >
      <DatepickerComponent />
    </div>
  );
};
