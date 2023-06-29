import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { WorkspaceItem } from "@/components/Workspaces/WorkspaceItem"
import { WorkspacesSidebar } from "@/components/Workspaces/WorkspacesSidebar"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

export default async function WorkspacesPage() {
  const supabase = createServerComponentClient({ cookies })
  const session = await supabase.auth.getSession()
  console.log(session)

  if (!session.data.session) {
    redirect("/auth/login")
  }

  const user: PostgrestSingleResponse<any> = await supabase
    .from("users")
    .select("*")
    .eq("user_id", session.data.session?.user.id)

  async function getWorkspaces() {
    if (!user.data[0].admin) {
      // add here logic to not admin users
      // will be a query to the workspace_users table
      const workspaces = await supabase
        .from("workspace_users")
        .select("*")
        .eq("user_id", session.data.session?.user.id)

      console.log("not admin")

      return workspaces.data
    }

    const workspaces = await supabase.from("workspaces").select("*")

    return workspaces.data
  }

  const workspaces = await getWorkspaces()

  return (
    <WorkspacesSidebar>
      <p className="font-bold text-xl">Acessar clínicas</p>

      <p className="mt-2 font-light text-sm">
        Selecione qual clínica deseja acessar
      </p>

      <section className="w-full max-w-[800px] flex flex-wrap gap-10 mt-20">
        {workspaces?.map((item: any, index: number) => {
          return <WorkspaceItem  key={index} id={item.id} name={item.name} user={user} />
        })}
      </section>
    </WorkspacesSidebar>
  )
}
