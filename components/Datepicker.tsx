import { useEffect, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import { DateAtom } from "../atoms/date";
import { useAtom } from "jotai";
dayjs.extend(weekday);

interface MonthDaysProps {
  dayOfTheWeek: number;
  day: number;
  month: number;
  year: number;
}

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const monthsArray = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const DatepickerComponent = () => {
  const [monthDays, setMonthDays] = useState<MonthDaysProps[] | []>([]);
  const [blanks, setBlanks] = useState<any[]>();
  const [date, setDate] = useAtom(DateAtom);
  const [calendarMonth, setCalendarMonth] = useState<number>(date.month);
  const [calendarYear, setCalendarYear] = useState<number>(date.year);

  const createDatesArray = () => {
    const days = dayjs().year(calendarYear).month(calendarMonth).daysInMonth();
    const firstDay = dayjs()
      .year(calendarYear)
      .month(calendarMonth)
      .startOf("month")
      .weekday();

    let blnks = [];

    for (let i = 0; i < firstDay; i++) {
      blnks.push(null);
    }

    setBlanks(blnks);
    const monthDaysArray: MonthDaysProps[] = [];

    [...Array(days)].map((_, index: number) => {
      let weekday = dayjs(date.day)
        .date(index + 1)
        .weekday();

      monthDaysArray.push({
        day: index + 1,
        dayOfTheWeek: weekday,
        month: calendarMonth,
        year: calendarYear,
      });
    });

    return setMonthDays(monthDaysArray);
  };

  useEffect(() => {
    createDatesArray();
  }, [calendarMonth]);

  return (
    <div className="w-full min-h-[17vh] flex flex-col items-center justify-center rounded">
      <div className="w-full flex items-center justify-evenly">
        <MdKeyboardArrowLeft
          onClick={() => {
            if (calendarMonth !== 0) {
              return setCalendarMonth((state) => state - 1);
            }

            setCalendarYear((state) => state - 1);
            return setCalendarMonth(11);
          }}
          className="cursor-pointer  hover:bg-gray-200 rounded"
          size={24}
        />
        <p className="w-fit">{monthsArray[calendarMonth]} -</p>
        <p>{calendarYear}</p>

        <MdKeyboardArrowRight
          className="cursor-pointer  hover:bg-gray-200 rounded"
          onClick={() => {
            if (calendarMonth !== 11) {
              return setCalendarMonth((state) => state + 1);
            }

            setCalendarYear((state) => state + 1);
            return setCalendarMonth(0);
          }}
          size={24}
        />
      </div>

      <div className="grid grid-rows-5 grid-cols-7 gap-x-1 gap-2 mt-2">
        {weekDays.map((day) => (
          <div key={day} className="text-xs font-medium text-gray-800">
            {day}
          </div>
        ))}

        {blanks?.map((item, index) => (
          <div key={index} />
        ))}

        {monthDays.map((item) => (
          <div
            key={`dayKey-${item.day}`}
            className={` p-1 ${
              date.day === item.day &&
              calendarMonth === date.month &&
              calendarYear === date.year
                ? "bg-black hover:bg-black text-white"
                : "hover:bg-gray-200"
            } text-sm  rounded-full flex justify-center cursor-pointer duration-100 font-light`}
            onClick={() =>
              setDate((content) => ({
                ...content,
                day: item.day,
                month: calendarMonth,
                year: calendarYear,
              }))
            }
          >
            {item.day}
          </div>
        ))}
      </div>
    </div>
  );
};
