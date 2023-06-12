import { HiOutlineTag } from "react-icons/hi2";
import { ServiceCard } from "./ServiceCard";
import { SideSection } from "../SideSection";
import { useEffect, useRef, useState } from "react";
import { ServiceComponent } from "./ServiceComponent";
import { CreateService } from "../CreateService";
import { useAtom } from "jotai";
import { SidesectionAtom } from "../../atoms/sidesection";

export const ServicesBackground = () => {
  const [sidesection, setSidesection] = useAtom(SidesectionAtom);

  const createServiceRef = useRef<any>(null);

  return (
    <>
      <main className="w-full h-full bg-gray-50 p-10 flex flex-col gap-3">
        <header className="w-full h-32 flex items-center gap-x-5">
          <HiOutlineTag size={48} />
          <p className="text-2xl font-semibold text-gray-800">Meus serviços</p>

          <button
            ref={createServiceRef}
            onClick={() =>
              setSidesection((content) => ({
                children: <CreateService />,
                isOpen: true,
                buttonRef: createServiceRef,
              }))
            }
            className="ml-auto mr-20 px-10 py-2 bg-blue-500 rounded-lg text-white flex items-center gap-x-3"
          >
            Criar serviço
          </button>
        </header>

        <section className="flex flex-wrap gap-8 overflow-y-auto">
          <ServiceCard />
          <ServiceCard />
        </section>
      </main>
    </>
  );
};
