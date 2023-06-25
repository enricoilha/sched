import { ReactNode } from "react"

import { Sidebar } from "@/components/Sidebar"
import {  createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Layout({ children }: { children: ReactNode }) {
  const supabase = createServerComponentClient({cookies})


  const { data } = await supabase.auth.getSession()

  if (!data.session) {
    redirect('/auth/login')
  }


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



  return (
    <>
      <Sidebar>{children}</Sidebar>
    </>
  )
}