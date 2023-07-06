"use client";

import { SidesectionAtom } from "@/atoms/sidesection";
import { AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";

import { ScheduleBackground } from "@/components/Schedule/ScheduleBackground";
import { ScheduleHeader } from "@/components/Schedule/ScheduleHeader";
import { SideSection } from "@/components/SideSection";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";



export default function CalendarPage() {
  const [sidesection] = useAtom(SidesectionAtom)
  const supabase = createClientComponentClient()
  const workspaceId = location.pathname.split("/")

  async function fetchWorkspace() { 
    const workspace = await supabase
    .from("workspaces")
    .select("clients(*),professionals(*), appointments(*), services(*)")
    .eq("id", workspaceId[1])

    return console.log(workspace)
  } 

  useEffect(() => {
    fetchWorkspace()
  }, [])


  return (
    <>
      <main className="flex h-screen flex-col bg-white">
        <ScheduleHeader />
        <div  className="p-3 h-[90vh] overflow-auto bg-neutral-50">
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