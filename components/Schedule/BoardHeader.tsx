import React from "react";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { DateAtom } from "@/atoms/date";

type ItemProps = {
  dayNumber: any;
  weekDay?: any;
};

const BoardItem: React.FC<ItemProps> = ({ dayNumber, weekDay }) => {
  return (
    <div className="flex w-1/5 items-center justify-center gap-x-2 text-center font-bold text-gray-800">
      <p className="w-1/2 text-end text-sm font-light">{weekDay}</p>
      <span className="w-1/2 text-start text-2xl">{dayNumber}</span>
    </div>
  );
};

export const BoardHeader: React.FC<any> = () => {
  const [date] = useAtom(DateAtom);

  const getDayNumber = (
    operationQuantity?: number,
    operation?: "add" | "subtract",
  ) => {
    let dateParsed = dayjs(new Date(date.year, date.month, date.day));

    if (operationQuantity === 0) {
      return date.day;
    }

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
    }
  };

  return (
    <div className="flex h-10 w-full items-center justify-between gap-x-3 rounded-tr-lg">
      {[...Array(5)].map((_, index) => (
        <BoardItem
          key={index}
          dayNumber={getDayNumber(index, "add")}
          weekDay={getWeekDay(date.day + index)}
        />
      ))}
    </div>
  );
};
