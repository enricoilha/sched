"use client"

import { UserAtom } from "@/atoms/user";
import { WorkspaceAtom } from "@/atoms/workspace";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useAtom } from "jotai";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface WorkspaceProps { 
    name: string;
    id: string;
    user: PostgrestSingleResponse<any>
}


export const WorkspaceItem: React.FC<WorkspaceProps> = ({id, name, user}) => {
    const [, setWorkspace] = useAtom(WorkspaceAtom)
    const [, setUser] = useAtom(UserAtom)
    const supabase = createClientComponentClient()
    const router = useRouter()
    console.log(user)

    async function handleClick() {
        setUser((content) => ({
            ...content,
            user: {
                id: user.data[0].id,
                admin: user.data[0].admin,
                name: user.data[0].name,
                email: user.data[0].email
            }
        }))
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