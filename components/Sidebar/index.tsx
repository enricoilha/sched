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
  const [workspace] = useAtom(WorkspaceAtom);
  const [user] = useAtom(UserAtom);
  const supabase = createClientComponentClient();
  const path = usePathname();
  const router = useRouter();

  const ButtonsArray = [
    {
      text: "Calendário",
      route: `/${workspace?.workspace_id}/dashboard/calendar`,
      icon: <Calendar size={19} />,
      admin: false,
    },
    {
      text: "Clientes",
      route: `/${workspace?.workspace_id}/dashboard/clients`,
      icon: <Users size={19} />,
      admin: false,
    },
    {
      text: "Profissionais",
      route: `/${workspace?.workspace_id}/dashboard/professionals`,
      icon: <AtSign size={19} />,
      admin: false,
    },
    {
      text: "Serviços",
      route: `/${workspace?.workspace_id}/dashboard/services`,
      icon: <Hammer size={19} />,
      admin: true,
    },
  ];

  async function handleSignOut() {
    await supabase.auth.signOut();

    router.refresh();
  }

  return (
    <div className="flex h-screen w-[100vw] bg-white">
      <section
        id="left"
        className="flex h-screen w-[12rem] flex-col border-r-0 bg-neutral-50 p-3"
      >
        <div className="flex h-36 w-full items-center justify-center rounded-lg p-3">
          <Image className="max-w-[160px]" src={albusPhoto} alt="" />
        </div>

        <WorkspaceComponent />

        <div className="mt-4 flex w-full flex-col gap-3 p-3">
          {ButtonsArray.map((item, index) => {
            if (!user?.user.admin && item.admin) {
              return;
            }

            return (
              <div
                key={index}
                onClick={() => router.push(item.route)}
                className={`h-10 w-full rounded-lg px-1  ${
                  path === item.route ? "bg-neutral-100 text-gray-900" : ""
                } flex cursor-pointer items-center gap-x-3 text-gray-600 duration-150 hover:bg-neutral-200 hover:text-neutral-900`}
              >
                <div className="flex w-10 justify-center">{item.icon}</div>{" "}
                <p className="w-full text-sm">{item.text}</p>
              </div>
            );
          })}
        </div>
        <div
          onClick={handleSignOut}
          className={`mt-auto flex h-14 w-full cursor-pointer items-center gap-x-1 rounded-lg pl-4 font-medium text-gray-600 duration-150 hover:text-neutral-800`}
        >
          <div className="w-10">
            <CiLogout size={28} />
          </div>
          Sair
        </div>
      </section>

      <section className="h-screen w-full">{children}</section>
    </div>
  );
};
