import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { WorkspacesSidebar } from "@/components/Workspaces/WorkspacesSidebar"

export default async function WorkspacesPage() {
  const supabase = createServerComponentClient({ cookies })

  const user = await supabase.auth.getSession()

  if (!user.data) {
    redirect("/auth/login")
  }

  return <WorkspacesSidebar>hello workspaces</WorkspacesSidebar>
}
