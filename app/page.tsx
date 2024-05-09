import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function IndexPage() {
  const supabase = createServerComponentClient({ cookies });

  const user = await supabase.auth.getSession();

  if (!user.data.session) {
    redirect("/auth/login");
  }

  return redirect("/workspaces");
}
