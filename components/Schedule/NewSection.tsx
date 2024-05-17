"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAtom } from "jotai";
import { CiCalendar } from "react-icons/ci";
import { HiOutlinePlusSm } from "react-icons/hi";
import { IoPersonOutline } from "react-icons/io5";

import { SidesectionAtom } from "../../atoms/sidesection";
import { CreateAppointment } from "../CreateAppointment";
import { CreateClient } from "../CreateClient";
import { ChevronDown } from "lucide-react";

export const NewSection = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [, setSidesection] = useAtom(SidesectionAtom);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

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
    ];
  }, []);

  const handleClick = (e: any) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      !buttonRef?.current?.contains(e.target)
    ) {
      return setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <div
        ref={buttonRef}
        onClick={() => setIsOpen(true)}
        className="bg-albusgreen relative flex cursor-pointer items-center gap-x-1 rounded-md border border-emerald-500 px-7 py-[.3rem] text-sm font-medium text-white duration-150 hover:bg-emerald-500 hover:text-white"
      >
        <ChevronDown size={18} />
        <p>Novo</p>

        {isOpen && (
          <div
            ref={dropdownRef}
            className="min-h-10 absolute left-0 top-10 z-50 flex w-60 flex-col gap-1 rounded-md border bg-white p-2 shadow"
          >
            {buttonsArray.map((item, index) => (
              <div
                key={index}
                onClick={item.openFunction}
                className="flex h-10 w-full items-center gap-x-2 rounded p-2 font-light text-gray-800 duration-100 hover:bg-gray-100"
              >
                <div className="w-8">{item.icon}</div> {item.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
