import { ReactNode } from "react"

import { Sidebar } from "@/components/Sidebar"
import { AnimatePresence } from "framer-motion"
import { useAtom } from "jotai"
import { SidesectionAtom } from "@/atoms/sidesection"
import { SideSection } from "@/components/SideSection"

export default function Layout({ children }: { children: ReactNode }) {
  return (
   <>
   
      <Sidebar>{children}</Sidebar>
    
      </>
 
  )
}
