"use client"

import { WorkspaceAtom } from "@/atoms/workspace";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";



export const WorkspaceComponent: React.FC = () => {
    const [ workspace] = useAtom(WorkspaceAtom)
    const router = useRouter()

    return (
        <div onClick={() => router.push("/workspaces")}  className="w-full h-16 rounded-xl border p-3 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 duration-100" >
            <p className="font-semibold text-xl" >{workspace?.wodkspace_name}</p>
            <p className="font-light text-sm" >Trocar</p>
        </div>
    )
}