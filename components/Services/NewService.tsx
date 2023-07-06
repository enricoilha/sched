"use client"

import { SidesectionAtom } from "@/atoms/sidesection";
import { AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";
import { ChevronRight } from "lucide-react";
import React, { useRef } from "react";
import { SideSection } from "../SideSection";
import { CreateService } from "../CreateService";




export const NewService: React.FC<any> = () => {
    const [sidesection, setSidebar] = useAtom(SidesectionAtom)
    const buttonRef = useRef<HTMLButtonElement>(null)
    return( 
        <>
        <button ref={buttonRef} onClick={() => setSidebar((content) => ({
            ...content,
            isOpen: true,
            children: <CreateService />,
            buttonRef
        }))} className="px-5 py-2 rounded bg-neutral-800 hover:bg-neutral-700 duration-100 text-white flex items-center gap-x-2 lg:mr-20 font-light" >
        Novo serviço <ChevronRight size={14} />
      </button>
          <AnimatePresence>
        {sidesection.isOpen && (
          <SideSection>{sidesection.children}</SideSection>
        )}
      </AnimatePresence>
        
      </>

    )
}