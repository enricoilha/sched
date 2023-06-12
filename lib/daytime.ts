import dayjs from "dayjs";


const getStartDaySeconds = (year: number, month: number, day: number) => {
    const startDay = dayjs()
    .year(year)
    .month(month)
    .date(day)
    .hour(0)
    .minute(0)
    .second(0);


    return startDay.unix()
}

const getEndDaySeconds = (year:number, month:number, day:number) => {
    const endDay = dayjs()
    .year(year)
    .month(month)
    .date(day)
    .hour(23)
    .minute(59)
    .second(59);

    return endDay.unix()
}

const getHoleDaySeconds = (year: number, month: number, day: number) => {
    const seconds = getEndDaySeconds(year, month, day) - getStartDaySeconds(year, month, day)

    return seconds
}

export { getStartDaySeconds, getEndDaySeconds, getHoleDaySeconds}