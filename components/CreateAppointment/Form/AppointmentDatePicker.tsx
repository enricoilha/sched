import { useEffect, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
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

interface ComponentProps {
  clickFunction?: any;
}

export const AppointmentDatePicker = ({ clickFunction }: ComponentProps) => {
  const [monthDays, setMonthDays] = useState<MonthDaysProps[] | []>([]);
  const [blanks, setBlanks] = useState<any[]>();
  const [calendarMonth, setCalendarMonth] = useState<number>(
    dayjs(new Date()).month(),
  );
  const [calendarYear, setCalendarYear] = useState<number>(
    dayjs(new Date()).year(),
  );
  const [date, setDate] = useState({
    day: dayjs(new Date()).date(),
    month: dayjs(new Date()).month(),
    year: dayjs(new Date()).year(),
  });

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
      let weekday = dayjs()
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

  const onCalendarClick = (day: number) => {
    setDate((content) => ({
      ...content,
      day: day,
      month: calendarMonth,
      year: calendarYear,
    }));

    return clickFunction(
      dayjs(`${date.year}-${date.month + 1}-${day}`).toISOString(),
    );
  };

  useEffect(() => {
    createDatesArray();
  }, [calendarMonth]);

  return (
    <div className="flex min-h-[17vh] w-64 flex-col items-center justify-center rounded">
      <div className="flex w-full items-center justify-between">
        <MdKeyboardArrowLeft
          onClick={() => {
            if (calendarMonth !== 0) {
              return setCalendarMonth((state) => state - 1);
            }

            setCalendarYear((state) => state - 1);
            return setCalendarMonth(11);
          }}
          className="cursor-pointer  rounded hover:bg-gray-200"
          size={24}
        />
        <p className="w-fit ">{monthsArray[calendarMonth]}</p>
        <p>{calendarYear}</p>

        <MdKeyboardArrowRight
          className="cursor-pointer  rounded hover:bg-gray-200"
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

      <div className="mt-2 grid grid-cols-7 grid-rows-5 gap-2 gap-x-1">
        {weekDays.map((day) => (
          <div key={day} className="text-xs font-medium text-gray-800">
            {day}
          </div>
        ))}

        {blanks?.map((item, index) => <div key={index} />)}

        {monthDays.map((item) => (
          <div
            key={`dayKey-${item.day}`}
            className={` p-1 ${
              date.day === item.day &&
              calendarMonth === date.month &&
              calendarYear === date.year
                ? "bg-black text-white hover:bg-black"
                : "hover:bg-gray-200"
            } flex  cursor-pointer justify-center rounded-full text-sm font-light duration-100`}
            onClick={() => onCalendarClick(item.day)}
          >
            {item.day}
          </div>
        ))}
      </div>
    </div>
  );
};
