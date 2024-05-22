import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { FieldError } from "react-hook-form";
import { AppointmentListItemType } from "../Types/AppointmentListItemType";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SelectTimeItemProps {
  minute: string;
  isAvailable: boolean;
}

const SelectTimeItem = ({ isAvailable, minute }: SelectTimeItemProps) => {
  return isAvailable ? (
    <SelectItem value={minute}>{minute}</SelectItem>
  ) : (
    <SelectItem className="bg-gray-200" value={minute} disabled>
      {minute}
      <p className="text-[10px]">Indisponível</p>
    </SelectItem>
  );
};

interface SelectHoursProps {
  onChange: any;
  title: string;
  value: string;
  onBlur: any;
  error?: FieldError;
  options: any[];
  appointments: AppointmentListItemType[] | [] | null;
  selectedHour?: string;
  selectedDate: string;
}

export function SelectTime({
  error,
  onBlur,
  onChange,
  options,
  title,
  value,
  appointments,
  selectedHour,
  selectedDate,
}: SelectHoursProps) {
  dayjs.extend(isBetween);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);
  const [minutesOff, setMinutesOff] = useState<string[]>([]);

  const checkAvailability = async () => {
    if (!selectedHour) return;
    const notAvailableTimes: string[] = [];

    if (!appointments) return;

    for await (let appointment of appointments) {
      const appointmentTimeStart = dayjs(appointment.starts_at);
      const appointmentTimeEnd = dayjs(appointment.ends_at);
      if (!appointment.services?.duration) return;

      for await (let minute of options) {
        const date = dayjs(selectedDate).hour(+selectedHour).minute(+minute);

        if (
          dayjs(date).isSame(appointmentTimeStart, "minute") ||
          dayjs(date).isBetween(appointmentTimeStart, appointmentTimeEnd)
        ) {
          notAvailableTimes.push(minute);
        }
        const endsAt = dayjs(date).add(
          +appointment.services?.duration,
          "minute",
        );
        const startsAt = date;

        if (
          dayjs(startsAt).isSameOrAfter(appointmentTimeStart, "minute") &&
          dayjs(endsAt).isSameOrBefore(appointmentTimeEnd, "minute")
        ) {
          console.log("Is between another " + minute, " ", appointment.id);
          // console.log(
          //   dayjs(startsAt).isSameOrAfter(appointmentTimeStart, "minute") &&
          //     dayjs(endsAt).isSameOrBefore(appointmentTimeEnd, "minute"),
          // );
        }
      }
    }

    return setMinutesOff(notAvailableTimes);
  };

  useEffect(() => {
    (async () => await checkAvailability())();
  }, [selectedDate, selectedHour]);

  return (
    <div className="relative flex w-full flex-col pb-5">
      <p className="mb-1 text-sm font-medium text-gray-600">{title}</p>

      <Select
        onValueChange={(value) => {
          onChange(value);
        }}
        defaultValue={value}
      >
        <SelectTrigger
          onBlur={onBlur}
          className={`h-9 w-full rounded-md bg-white px-2 text-sm font-light text-gray-800 shadow-sm outline outline-[.5px] outline-gray-400 duration-100 focus-within:outline-[.5px] focus:ring-2 focus:ring-offset-2 focus-visible:ring-emerald-200 ${
            error ? "outline-red-500" : ""
          }`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="relative h-32">
            {options?.map((item, index) => {
              const isMinuteAvailable = minutesOff.find((i) => i === item);
              return (
                <SelectTimeItem
                  key={`ItemSelectHourKey-${index}`}
                  isAvailable={isMinuteAvailable ? false : true}
                  minute={item}
                />
              );
            })}
          </ScrollArea>
        </SelectContent>
      </Select>
      <p className="absolute -bottom-1 font-light text-red-500">
        {error?.message}
      </p>
    </div>
  );
}
