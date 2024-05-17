"use client";

import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useAtom } from "jotai";

import { getEndDaySeconds, getHoleDaySeconds } from "@/lib/daytime";

import { DateAtom } from "../../atoms/date";
import { AppointmentItem } from "./AppointmentItem";

interface DayColumnProps {}

export const DayColumn = () => {
  const [date] = useAtom(DateAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const [pixelSecs, setPixelSecs] = useState<number>(0);
  const ScheduleRef = useRef<HTMLDivElement | any>(null);

  //test
  const AppointmentsArray = [
    {
      patient: "Enrico Pozzi",
      year: dayjs().year(),
      month: dayjs().month(),
      day: dayjs().date(),
      hour: 7,
      minute: 15,
    },
    {
      patient: "Enrico Pozzi",
      year: dayjs().year(),
      month: dayjs().month(),
      day: dayjs().date(),
      hour: 7,
      minute: 30,
    },
    {
      patient: "Enrico Pozzi",
      year: dayjs().year(),
      month: dayjs().month(),
      day: dayjs().date(),
      hour: 9,
      minute: 30,
    },
  ];

  const getRelativeSeconds = (
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
  ) => {
    const rs =
      getEndDaySeconds(date.year, date.month, date.day) -
      dayjs()
        .year(year)
        .month(month)
        .date(day)
        .hour(hour)
        .minute(minute)
        .unix();

    const seconds = getHoleDaySeconds(date.year, date.month, date.day) - rs;

    return seconds;
  };

  const getRelativePixelsOfSecond = () => {
    const rp =
      ScheduleRef?.current?.scrollHeight /
      getHoleDaySeconds(date.year, date.month, date.day);

    return rp;
  };

  const DateFormatter = (date: number) => {
    if (String(date).length === 1) {
      return `0${date}`;
    }

    return date;
  };

  const WaitRefCalculate = () => {
    if (ScheduleRef?.current?.scrollHeight === undefined) {
      return;
    }
    const relativePxSecs = getRelativePixelsOfSecond();

    setPixelSecs(relativePxSecs);

    return setLoading(false);
  };

  useEffect(() => {
    WaitRefCalculate();
  }, [ScheduleRef?.current?.scrollHeight]);
  return (
    <div className="flex h-full w-[25rem]">
      <div ref={ScheduleRef} className="relative h-[75vh] w-full">
        {Array.from({ length: 48 }).map((_, index) => {
          return (
            <div key={index} className="relative flex h-20 w-full items-start">
              <div className="flex w-full items-start ">
                <div className="h-[.7px] w-full bg-gray-300" />
              </div>
            </div>
          );
        })}

        {loading ? (
          <div>loading</div>
        ) : (
          AppointmentsArray.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  top:
                    pixelSecs *
                    getRelativeSeconds(
                      item.year,
                      item.month,
                      item.day,
                      item.hour,
                      item.minute,
                    ),
                }}
                className={`absolute w-full`}
              >
                <AppointmentItem />
              </div>
            );
          })
        )}
      </div>

      <div
        style={{
          height: ScheduleRef?.current?.scrollHeight,
        }}
        className="w-[1px] bg-neutral-200"
      />
    </div>
  );
};
