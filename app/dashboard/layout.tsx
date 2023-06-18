"use client"

import { ReactNode, useEffect } from "react"
import { WorkspaceAtom } from "@/atoms/workspace"
import { useAtom } from "jotai"

import { supabase } from "@/lib/supabase"
import { Sidebar } from "@/components/Sidebar"

export default function Layout({ children }: { children: ReactNode }) {
  const [workspace] = useAtom(WorkspaceAtom)
  async function fetchWorkspace() {
    const { data, error } = await supabase
      .from("workspaces")
      .select(
        `id,
        name,
        user_id(*), 
        professionals(*)`
      )
      .eq("id", "6805eee4-b152-41ca-a99a-257171fa80f7")
    //.eq("id", workspace?.workspace_id)

    console.log(data || error)
  }

  useEffect(() => {
    fetchWorkspace()
  }, [])

  return (
    <>
      <Sidebar>{children}</Sidebar>
    </>
  )
}
