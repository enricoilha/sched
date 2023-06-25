"use client"

import React, { ReactNode } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import albusPhoto from "@/public/albus.webp"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { CiLogout } from "react-icons/ci"

export const WorkspacesSidebar: React.FC<any> = ({
  children,
}: {
  children: ReactNode
}) => {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div>
      <section
        id="left"
        className="w-[14vw] h-screen flex flex-col border-r p-3 bg-neutral-100"
      >
        <div className="w-full h-36 rounded-lg flex items-center justify-center p-3">
          <Image className="max-w-[160px]" src={albusPhoto} alt="" />
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
