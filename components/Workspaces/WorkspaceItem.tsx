"use client"

import { WorkspaceAtom } from "@/atoms/workspace";
import { useAtom } from "jotai";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface WorkspaceProps { 
    name: string;
    id: string;
}


export const WorkspaceItem: React.FC<WorkspaceProps> = ({id, name}) => {
    const [, setWorkspace] = useAtom(WorkspaceAtom)
    const router = useRouter()

    async function handleClick() {
        setWorkspace((content) => ({
            ...content,
            workspace_id: id,
            wodkspace_name: name,

        }))
        router.push(`/${id}/dashboard/calendar`)
    }
    return(
        <div onClick={handleClick} className="w-full max-w-[360px] h-20 rounded-xl border flex p-4 items-center cursor-pointer hover:shadow duration-150" >
            <div className="w-full" >
                <p className="font-medium text-lg" >{name}</p>
            </div>
            <ChevronRight size={30} color="#252525" />
        </div>  
    )
}