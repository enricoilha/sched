"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { UserAtom } from "@/atoms/user";
import { WorkspaceAtom } from "@/atoms/workspace";
import albusPhoto from "@/public/albus.webp";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai";
import { AtSign, Calendar, Hammer, Users } from "lucide-react";
import { CiLogout } from "react-icons/ci";



import { WorkspaceComponent } from "./Workspace";


export const Sidebar = ({ children }: { children: ReactNode }) => {
  const [workspace] = useAtom(WorkspaceAtom)
  const [user] = useAtom(UserAtom)
  const supabase = createClientComponentClient()
  const path = usePathname()
  const router = useRouter()



  const ButtonsArray = [
    {
      text: "Calendário",
      route: `/${workspace?.workspace_id}/dashboard/calendar`,
      icon: <Calendar size={24} />,
      admin: false,
    },
    {
      text: "Clientes",
      route: `/${workspace?.workspace_id}/dashboard/clients`,
      icon: <Users size={24} />,
      admin: false,
    },
    {
      text: "Profissionais",
      route: `/${workspace?.workspace_id}/dashboard/professionals`,
      icon: <AtSign size={24} />,
      admin: false,
    },
    {
      text: "Serviços",
      route: `/${workspace?.workspace_id}/dashboard/services`,
      icon: <Hammer size={24} />,
      admin: true,
    },
  ]

  async function handleSignOut() {
    await supabase.auth.signOut()

    router.refresh()
  }

  return (
    <div className="w-[100vw] h-screen flex bg-white">
      <section
        id="left"
        className="w-[20vw] h-screen flex flex-col p-3 bg-neutral-100"
      >
        <div className="w-full h-36 rounded-lg flex items-center justify-center p-3">
          <Image className="max-w-[160px]" src={albusPhoto} alt="" />
        </div>

        <WorkspaceComponent />

        <div className="w-full flex flex-col mt-4 gap-3 p-3">
          {ButtonsArray.map((item, index) => {
            if(!user?.user.admin && item.admin) {
              return
            }
            
            return  (
              <div
                key={index}
                onClick={() => router.push(item.route)}
                className={`w-full h-14 pl-4 rounded-lg ${
                  path === item.route ? "bg-neutral-100 text-gray-900" : ""
                } hover:bg-neutral-200 hover:text-neutral-900 flex items-center gap-x-3 text-gray-600 cursor-pointer duration-150`}
              >
                <div className="w-10 flex justify-center">{item.icon}</div>{" "}
                <p className="w-full">{item.text}</p>
              </div>
            ) 
          })}
        </div>
        <div
          onClick={handleSignOut}
          className={`w-full h-14 pl-4 mt-auto rounded-lg font-medium text-gray-600 hover:text-neutral-800 flex items-center gap-x-1 cursor-pointer duration-150`}
        >
          <div className="w-10">
            <CiLogout size={28} />
          </div>
          Sair
        </div>
      </section>

      <section className="h-screen w-full">{children}</section>
    </div>
  )
}