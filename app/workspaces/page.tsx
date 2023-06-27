import {  useRouter } from "next/navigation"
import {  createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { WorkspacesSidebar } from "@/components/Workspaces/WorkspacesSidebar"
import { WorkspaceItem } from "@/components/Workspaces/WorkspaceItem"
import { useEffect, useState } from "react"


export default async function WorkspacesPage() {

  const supabase = createClientComponentClient()
  const session = await supabase.auth.getSession()
  const user: any = await supabase.from("users").select("*").eq("user_id", session.data.session?.user.id)
  const router = useRouter()
  const [ workspacesData, setWorkspacesData ] = useState<any>()
  

  async function getWorkspaces() {
    if(!user.data[0].admin) {
      // add here logic to not admin users
      // will be a query to the workspace_users table
      const workspaces = await supabase
      .from("workspace_users")
      .select("*")
      .eq('user_id', session.data.session?.user.id)

      console.log("not admin")

      return setWorkspacesData(workspaces.data)
    }

    const workspaces = await supabase
    .from("workspaces")
    .select("*")

    return setWorkspacesData(workspaces.data)
    
  }


 useEffect(() => {
  if (!session.data.session) {
    router.push("/auth/login")
  }
  getWorkspaces()
 }, [])

  return (
    <WorkspacesSidebar>
    <p className="font-bold text-xl" >Acessar clínicas</p>

    <p className="mt-2 font-light text-sm" >Selecione qual clínica deseja acessar</p>

    <section className="w-full max-w-[800px] flex flex-wrap gap-10 mt-20" >
      {workspacesData?.map((item: any, index: number) => {
       return  <WorkspaceItem key={index} id={item.id} name={item.name} />
      })}

    </section>

  </WorkspacesSidebar>
  )
}
