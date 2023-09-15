"use client"

import { useRef, useState } from "react"
import dayjs from "dayjs"
import { useAtom } from "jotai"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { DateAtom } from "../../atoms/date"
import { DateCalendar } from "./DateCalendar"

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
]

export const DateSection = () => {
  const [date, setDate] = useAtom(DateAtom)

  const [openCalendar, setOpenCalendar] = useState<boolean>(false)
  const buttonRef = useRef<HTMLDivElement>(null)
  const [monthWritten, setMonthWritten] = useState<string>(
    monthsArray[date.month]
  )

  const onClickRight = () => {
    const daysInMonth = dayjs().month(date.month).daysInMonth()

    if (date.day === daysInMonth) {
      if (date.month === 11) {
        setDate((content) => ({
          ...content,
          day: 1,
          month: 0,
          year: content.year + 1,
        }))

        return setMonthWritten(monthsArray[0])
      }
      setDate((content) => ({
        ...content,
        day: 1,
        month: content.month === 11 ? 0 : content.month + 1,
      }))

      return setMonthWritten(monthsArray[date.month + 1])
    }

    return setDate((content) => ({
      ...content,
      day: content.day + 1,
    }))
  }

  const onClickLeft = () => {
    const daysInPreviousMonth = (month: number) => {
      const days = dayjs()
        .month(month - 1)
        .daysInMonth()

      return days
    }

    if (date.day === 1) {
      if (date.month === 0) {
        setDate((content) => ({
          ...content,
          day: 31,
          month: 11,
          year: content.year - 1,
        }))

        return setMonthWritten(monthsArray[11])
      }
      setDate((content) => ({
        ...content,
        day: daysInPreviousMonth(content.month),
        month: content.month - 1,
      }))

      return setMonthWritten(monthsArray[date.month - 1])
    }

    return setDate((content) => ({
      ...content,
      day: content.day - 1,
    }))
  }

  return (
    <section className="flex items-center justify-center gap-x-4 font-light px-2">
      <div
        onClick={onClickLeft}
        className="h-10 w-10 flex items-center justify-center rounded- hover:bg-gray-100 duration-150 border   cursor-pointer text-gray-700"
      >
        <ChevronLeft size={22} />
      </div>

      <div
        ref={buttonRef}
        onClick={() => setOpenCalendar(true)}
        className="px-5 w-40  text-center h-10 border hover:bg-gray-100 rounded-md flex text-base items-center justify-center  duration-150 cursor-pointer relative"
      >
        <p className="" >{date.day} de {monthWritten}</p>
        {openCalendar && (
          <DateCalendar
            isOpen={openCalendar}
            setClosed={setOpenCalendar}
            buttonRef={buttonRef}
          />
        )}
      </div>

      <div
        onClick={onClickRight}
        className="h-10 w-10 flex items-center justify-center rounded-md hover:bg-gray-100 duration-150 cursor-pointer border text=gray-600"
      >
        <ChevronRight size={22} />
      </div>
    </section>
  )
}
