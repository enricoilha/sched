import dayjs from "dayjs";

export const TimeSection = () => {
  const DateFormatter = (date: number) => {
    if (String(date).length === 1) {
      return `0${date}`;
    }

    return date;
  };
  return (
    <div className="h-full w-10">
      {Array.from({ length: 48 }).map((_, index) => {
        const hours = dayjs()
          .startOf("D")
          .add(index * 30, "minutes");
        return (
          <div key={index} className="relative flex h-20 items-start">
            <div className="flex w-full items-start gap-x-2 ">
              <p className="absolute w-fit text-xs font-light">
                {index === 0
                  ? "00:00"
                  : `${DateFormatter(hours.hour())}:${DateFormatter(
                      hours.minute(),
                    )}`}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
