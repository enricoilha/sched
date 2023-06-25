import Image from "next/image";
import React, { ReactNode } from "react";
import albusPhoto from "@/public/albus.webp"


export const WorkspacesSidebar: React.FC<any> = ({ children }: { children: ReactNode }) => {

  return (
    <div>
      <section
        id="left"
        className="w-[14vw] h-screen flex flex-col border-r p-3 bg-neutral-100"
      >
        <div className="w-full h-36 rounded-lg flex items-center justify-center p-3">
          <Image className="max-w-[160px]" src={albusPhoto} alt="" />
        </div>
      </section>

      <section className="h-screen w-full">
        {children}
      </section>
    </div>
  )
}