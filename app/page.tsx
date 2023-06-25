
import {createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


export default async function IndexPage() {
  const supabase = createServerComponentClient({ cookies})
  
  const user = await supabase.auth.getSession()

  if(!user.data) {
    redirect("/auth/login")
  }
  return redirect("/workspaces")
}
