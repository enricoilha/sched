"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAtom } from "jotai";
import { CiCalendar } from "react-icons/ci";
import { HiOutlinePlusSm } from "react-icons/hi";
import { IoPersonOutline } from "react-icons/io5";



import { SidesectionAtom } from "../../atoms/sidesection";
import { CreateAppointment } from "../CreateAppointment"
import { CreateClient } from "../CreateClient"

export const NewSection = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [, setSidesection] = useAtom(SidesectionAtom)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  const buttonsArray = useMemo(() => {
    return [
      {
        text: "Novo agendamento",
        icon: <CiCalendar size={25} />,
        openFunction: () =>
          setSidesection((content) => ({
            ...content,
            children: <CreateAppointment />,
            isOpen: true,
            buttonRef,
          })),
      },
      {
        text: "Novo cliente",
        icon: <IoPersonOutline size={24} />,
        openFunction: () =>
          setSidesection((content) => ({
            ...content,
            children: <CreateClient />,
            isOpen: true,
            buttonRef,
          })),
      },
    ]
  }, [])

  const handleClick = (e: any) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      !buttonRef?.current?.contains(e.target)
    ) {
      return setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick)

    return () => document.removeEventListener("click", handleClick)
  }, [])

  return (
    <>
      <div
        ref={buttonRef}
        onClick={() => setIsOpen(true)}
        className="h-10 rounded-md bg-emerald-500 shadow hover:bg-emerald-600 duration-150 cursor-pointer flex items-center gap-x-2 px-5 text-white relative"
      >
        <HiOutlinePlusSm size={30} />
        <p>Novo</p>

        {isOpen && (
          <div
            ref={dropdownRef}
            className="w-60 min-h-10 bg-white shadow z-50 border absolute top-12 left-0 rounded-md p-2 flex flex-col gap-1"
          >
            {buttonsArray.map((item, index) => (
              <div
                key={index}
                onClick={item.openFunction}
                className="w-full h-10 flex items-center gap-x-2 rounded hover:bg-gray-100 duration-100 p-2 font-light text-gray-800"
              >
                <div className="w-8">{item.icon}</div> {item.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}