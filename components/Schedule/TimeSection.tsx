import dayjs from "dayjs";

export const TimeSection = () => {
  const DateFormatter = (date: number) => {
    if (String(date).length === 1) {
      return `0${date}`;
    }

    return date;
  };
  return (
    <div className="w-10 h-full">
      {Array.from({ length: 48 }).map((_, index) => {
        const hours = dayjs()
          .startOf("D")
          .add(index * 30, "minutes");
        return (
          <div key={index} className="flex h-20 items-start relative">
            <div className="flex items-start gap-x-2  w-full ">
              <p className="w-fit text-xs font-light absolute">
                {index === 0
                  ? "00:00"
                  : `${DateFormatter(hours.hour())}:${DateFormatter(
                      hours.minute()
                    )}`}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
