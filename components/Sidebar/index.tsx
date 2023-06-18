"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import albusPhoto from "@/public/albus.webp"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { AtSign, Calendar, Users } from "lucide-react"
import { CiLogout } from "react-icons/ci"

import { WorkspaceComponent } from "./Workspace"

const ButtonsArray = [
  {
    text: "Calendário",
    route: "/dashboard/calendar",
    icon: <Calendar size={24} />,
  },
  {
    text: "Clientes",
    route: "/dashboard/clients",
    icon: <Users size={24} />,
  },
  {
    text: "Profissionais",
    route: "/dashboard/professionals",
    icon: <AtSign size={24} />,
  },
]

export const Sidebar = ({ children }: { children: ReactNode }) => {
  const supabase = createClientComponentClient()
  const path = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    await supabase.auth.signOut()

    router.refresh()
  }

  return (
    <div className="w-[100vw] h-screen flex bg-white">
      <section
        id="left"
        className="w-[20vw] h-screen flex flex-col border-r p-3 bg-neutral-100"
      >
        <div className="w-full h-36 rounded-lg flex items-center justify-center p-3">
          <Image className="max-w-[160px]" src={albusPhoto} alt="" />
        </div>

        <div className="relative">
          <WorkspaceComponent data={[]} />
        </div>

        <div className="w-full flex flex-col gap-3 p-3">
          {ButtonsArray.map((item, index) => (
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
          ))}
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