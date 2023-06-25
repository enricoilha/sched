"use client";

import { SidesectionAtom } from "@/atoms/sidesection";
import { AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";

import { ScheduleBackground } from "@/components/Schedule/ScheduleBackground";
import { ScheduleHeader } from "@/components/Schedule/ScheduleHeader";
import { SideSection } from "@/components/SideSection";


export default function CalendarPage() {
  const [sidesection] = useAtom(SidesectionAtom)

  return (
    <>
      <main className="flex h-[90vh] flex-col bg-white">
        <ScheduleHeader />
        <div className="p-3 h-[80vh] bg-white">
          <ScheduleBackground />
        </div>
      </main>
      <AnimatePresence>
        {sidesection.isOpen && (
          <SideSection>{sidesection.children}</SideSection>
        )}
      </AnimatePresence>
    </>
  )
}