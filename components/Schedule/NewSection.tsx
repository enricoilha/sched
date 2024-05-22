"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAtom } from "jotai";
import { CiCalendar } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";

import { SidesectionAtom } from "../../atoms/sidesection";
import { CreateAppointment } from "../CreateAppointment";
import { CreateClient } from "../CreateClient";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="green" className="flex items-center gap-x-1 px-5">
          <ChevronDown size={18} />
          Novo
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Selecione</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {buttonsArray.map((item, idx) => (
          <DropdownMenuItem
            key={`ButtonDDITEM-${idx}`}
            className="flex cursor-pointer items-center gap-x-1"
            onClick={item.openFunction}
          >
            {item.icon}
            {item.text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
