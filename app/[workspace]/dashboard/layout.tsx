import { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { WorkspaceFetcher } from "@/components/Workspaces/WorkspaceFetcher";

export default async function Layout({ children }: { children: ReactNode }) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    redirect("/auth/login");
  }

  return (
    <>
      <WorkspaceFetcher session={data.session} />
      <Sidebar>{children}</Sidebar>
    </>
  );
}
