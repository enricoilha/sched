"use client"

import { SidesectionAtom } from "@/atoms/sidesection";
import { useAtom } from "jotai";
import { ChevronRight } from "lucide-react";
import React, { useRef } from "react";
import { CreateWorker } from "../CreateWorker";
import { AnimatePresence } from "framer-motion";
import { SideSection } from "../SideSection";




export const NewButton: React.FC = () => {
    const [sidesection, setSidebar] = useAtom(SidesectionAtom)
    const buttonRef = useRef<HTMLButtonElement>(null)
    return( 
        <>
        <button ref={buttonRef} onClick={() => setSidebar((content) => ({
            ...content,
            isOpen: true,
            children: <CreateWorker />,
            buttonRef
        }))} className="px-5 py-2 rounded bg-neutral-800 hover:bg-neutral-700 duration-100 text-white flex items-center gap-x-2 lg:mr-20 font-light" >
        Novo profissional <ChevronRight size={14} />
      </button>
          <AnimatePresence>
        {sidesection.isOpen && (
          <SideSection>{sidesection.children}</SideSection>
        )}
      </AnimatePresence>
        
      </>

    )
}