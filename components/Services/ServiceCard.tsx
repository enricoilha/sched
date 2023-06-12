import { useAtom } from "jotai";
import { SidesectionAtom } from "../../atoms/sidesection";
import { useRef } from "react";
import { ServiceComponent } from "./ServiceComponent";

interface ServiceProps {
  openFunction: any;
}

export const ServiceCard = () => {
  const [sidesection, setSidesection] = useAtom(SidesectionAtom);
  const cardRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={cardRef}
      onClick={() =>
        setSidesection((content) => ({
          buttonRef: cardRef,
          isOpen: true,
          children: <ServiceComponent />,
        }))
      }
      className="w-[23rem] h-44 border bg-white rounded-lg flex flex-col justify-evenly p-4 cursor-pointer duration-150 hover:bg-zinc-50"
    >
      <p className="font-medium text-lg">Atendimento avaliativo</p>
      <p className="text-xl font-semibold text-blue-600 tracking-wide">
        R$300.000
      </p>
      <p className="text-gray-600">Duração: 1 hora</p>
    </div>
  );
};
