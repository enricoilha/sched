import { DateAtomProps } from "@/atoms/date";
import dayjs from "dayjs";

async function findAvailableTime(duration: number, date: DateAtomProps) {
    let startOfTheDay = dayjs().year(date.year).month(date.month).date(date.day).hour(7)
    let endOfTheDay = dayjs().year(date.year).month(date.month).date(date.day).hour(17)

    for (let i = startOfTheDay; i <= endOfTheDay; i.add(duration, 'minute')) {
        console.log(i.toISOString())
    }

    return
}

export { findAvailableTime }