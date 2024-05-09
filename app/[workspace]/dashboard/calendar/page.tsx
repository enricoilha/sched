"use client";

import { SidesectionAtom } from "@/atoms/sidesection";
import { AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";

import { ScheduleBackground } from "@/components/Schedule/ScheduleBackground";
import { ScheduleHeader } from "@/components/Schedule/ScheduleHeader";
import { SideSection } from "@/components/SideSection";

export default function CalendarPage() {
  const [sidesection] = useAtom(SidesectionAtom);

  return (
    <>
      <main className="flex h-screen flex-col bg-white">
        <ScheduleHeader />
        <div className="h-[90vh] overflow-auto bg-neutral-50 p-3 pb-0">
          <ScheduleBackground />
        </div>
      </main>
      <AnimatePresence>
        {sidesection.isOpen && (
          <SideSection>{sidesection.children}</SideSection>
        )}
      </AnimatePresence>
    </>
  );
}
