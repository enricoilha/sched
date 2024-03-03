import { DateAtomProps } from "@/atoms/date";
import dayjs from "dayjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

async function findAvailableTime(duration: number, date: DateAtomProps) {
  const rangeStart = dayjs(new Date(date.year, date.month, date.day));
  const rangeEnd = dayjs(new Date(date.year, date.month, date.day))
    .add(23, "h")
    .add(59, "m")
    .add(59, "s");

  const xx = {
    start: rangeStart.format("YYYY-MM-YY mm:ss"),
    end: rangeEnd.toDate(),
  };

  console.log(xx);

  const { data, error } = await supabase
    .from("appointments")
    .select("")
    .lt("starts_at", rangeEnd.toISOString())
    .gte("starts_at", rangeStart.toISOString());

  console.log(data);
  return;
}

export { findAvailableTime };
