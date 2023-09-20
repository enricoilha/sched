"use client";

import { SidesectionAtom } from "@/atoms/sidesection";
import { AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";

import { ScheduleBackground } from "@/components/Schedule/ScheduleBackground";
import { ScheduleHeader } from "@/components/Schedule/ScheduleHeader";
import { SideSection } from "@/components/SideSection";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { WorkspaceAtom } from "@/atoms/workspace";
import { useToast } from "@/components/ui/use-toast";



export default function CalendarPage() {
  const [sidesection] = useAtom(SidesectionAtom)
  const supabase = createClientComponentClient()
  const [workspace, setWorkspace] = useAtom(WorkspaceAtom)
  const { toast } = useToast()

  async function fetchWorkspace() {
    const workspaceId = location.pathname.split('/')

    const { data, error }: any = await supabase
      .from("workspaces")
      .select("clients(*),professionals(id, name, role, sex), appointments(*), services(id, service_name, duration), name")
      .eq("id", workspaceId[1])

    if (error) {
      return toast({
        description: "Não foi possível carregar as informações do sistema",
        title: "Hove um erro inesperado",
        variant: "destructive",
      })
    }

    setWorkspace((x) => ({
      ...x,
      professionals: data[0].professionals,
      services: data[0].services,
    }))

    return console.log(data)
  }

  useEffect(() => {
    (async () => (
      await fetchWorkspace()
    ))()
  }, [])


  return (
    <>
      <main className="flex h-screen flex-col bg-white">
        <ScheduleHeader />
        <div className="p-3 pb-0 h-[90vh] overflow-auto bg-neutral-50">
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
