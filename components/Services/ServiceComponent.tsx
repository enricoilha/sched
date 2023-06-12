import { RefObject } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineTrash } from "react-icons/hi";
import { RoundedButtons } from "../RoundedButtons";
import { BsHourglass, BsChatSquareText } from "react-icons/bs";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { useAtom } from "jotai";
import { SidesectionAtom } from "../../atoms/sidesection";

interface ServiceComponentProps {
  sectionRef: RefObject<HTMLDivElement>;
  closeFunction: any;
}

export const ServiceComponent = () => {
  const [sidesection, setSidesection] = useAtom(SidesectionAtom);
  return (
    <section className="w-full h-[90vh] overflow-y-auto items-center p-3">
      <header className="w-full flex items-center justify-between">
        <RoundedButtons
          onClick={() =>
            setSidesection((content) => ({ ...content, isOpen: false }))
          }
          icon={<IoCloseOutline size={30} />}
          hoverText="Fechar"
        />

        <RoundedButtons
          onClick={() => null}
          icon={<HiOutlineTrash size={30} />}
          color="#de0000"
          hoverText="Excluir"
        />
      </header>

      <main className="w-full flex flex-col gap-5 mt-20">
        <p className="text-4xl font-medium">Prótese</p>

        <div className="flex gap-x-3 mt-8 font-light">
          <div className="w-7">
            <BsHourglass size={24} />
          </div>
          1 hora
        </div>
        <div className=" flex gap-x-3  font-light">
          <div className="w-7">
            <AiOutlineDollarCircle size={24} />
          </div>
          <p>R$ 300.00</p>
        </div>

        <div className=" flex gap-x-3  font-light">
          <div className="w-9 ">
            <BsChatSquareText size={24} />
          </div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci,
            dolore!
          </p>
        </div>
      </main>
    </section>
  );
};
