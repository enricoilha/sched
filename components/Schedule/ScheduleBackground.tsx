import { useAtom } from "jotai";
import { DayColumn } from "./DayColumn";
import { TimeSection } from "./TimeSection";
import { DateAtom } from "../../atoms/date";
import dayjs from "dayjs";

export const ScheduleBackground = () => {
  const [date] = useAtom(DateAtom);

  const getDayNumber = (
    operationQuantity?: number,
    operation?: "add" | "subtract"
  ) => {
    let dateParsed = dayjs(new Date(date.year, date.month, date.day));

    if (operation && operationQuantity) {
      switch (operation) {
        case "add":
          dateParsed = dateParsed.add(operationQuantity, "day");
          break;
        case "subtract":
          dateParsed = dateParsed.subtract(operationQuantity, "day");
        default:
          break;
      }
    }

    return dateParsed.date();
  };

  const getWeekDay = (dayNumber: number) => {
    const weekday = dayjs(new Date(date.year, date.month, dayNumber)).weekday();
    switch (weekday) {
      case 1:
        return "Segunda-feira";
      case 2:
        return "Terça-feira";
      case 3:
        return "Quarta-feira";
      case 4:
        return "Quinta-feira";
      case 5:
        return "Sexta-feira";
      case 6:
        return "Sábado";
      case 0:
        return "Domingo";
      default:
        break;
    }
  };

  return (
    <>
      <section className="w-[80vw] h-[70vh] bg-neutral-50">
        <div className="ml-12 flex gap-x-3 items-center justify-center border border-emerald-200 h-10 rounded-tr-lg rounded-tl-lg bg-emerald-50">
          <div className="w-1/3 flex items-center gap-x-2 justify-center font-bold text-3xl text-emerald-900">
            {getDayNumber(1, "subtract")}{" "}
            <p className="text-sm font-light">{getWeekDay(date.day - 1)}</p>
          </div>
          <div className="w-1/3 flex items-center gap-x-2 justify-center font-bold text-3xl text-emerald-900">
            {date.day}{" "}
            <p className="text-sm font-light">{getWeekDay(date.day)}</p>
          </div>
          <div className="w-1/3 flex items-center gap-x-2 justify-center text-3xl font-bold text-emerald-900">
            {getDayNumber(1, "add")}
            <p className="text-sm font-light">{getWeekDay(date.day + 1)}</p>
          </div>
        </div>
        <div className="w-full flex mt-10 h-full overflow-auto">
          <TimeSection />
          <DayColumn />
          <DayColumn />
          <DayColumn />
        </div>
      </section>
    </>
  );
};
