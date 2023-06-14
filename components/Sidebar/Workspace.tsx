// import { RefreshCcw } from "lucide-react";
// import React, { RefObject, useRef } from "react";

import React from "react";
import { Select } from "../ui/select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


// interface CurrentWorkspaceProps {
//     name: string
// }

// interface WorkspaceSelectProps {
//     divRef: RefObject<HTMLDivElement>
// }
// const WorkspaceSelect: React.FC<WorkspaceSelectProps> = ({divRef}) => {
//     return (
//         <div style={{
//             width: divRef.current?.clientWidth
//         }}  className="w-full absolute -bottom-5 left-0 bg-white z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80"
//          >s</div>
//     )
// }

// const CurrentWorkspace: React.FC<CurrentWorkspaceProps> = ({name}) => {

//     return (
//         <div className="w-full h-full flex flex-col items-center rounded-lg justify-center gap-1  cursor-pointer duration-100 p-1 relative" >
//             <p className="text-2xl font-bold text-neutral-800" >{name}</p>
//             <p className="font-light text-gray-700 text-sm" >Clique aqui para alterar</p>
//             <RefreshCcw className="absolute bottom-0 right-1 text-neutral-600" size={16} />
//         </div>
//     )
// }


// export const WorkspaceComponent: React.FC = () => {
//     const divRef = useRef<HTMLDivElement>(null)

//     return (
//         <div ref={divRef} className="w-full rounded-xl border-2 h-20 p-2 my-3 duration-100 hover:bg-neutral-50 shadow relative" >
//             <CurrentWorkspace name="Artur Alvim" />
//             <WorkspaceSelect divRef={divRef} />
//         </div>
//     ) 
// }

interface WorkspacesProps {
    data: {
        id: string;
        name: string;
    }[]
}

export const WorkspaceComponent: React.FC<WorkspacesProps> = ({ data }) => {

    return (
        <Select >
            <SelectTrigger className={`h-12 w-full bg-white rounded-xl   focus-within:outline-gray-500 focus-within:outline-[.5px] focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-300 px-2 ring-emerald-300 duration-100 font-light text-gray-800 text-sm`}>
                <SelectValue  />
            </SelectTrigger>
            <SelectContent className="" >
                {data?.map((item, index) =>(
                    <SelectItem key={'WorkspaceKey-${index}'} value={item.id} >
                        {item.name}
                    </SelectItem>
                ) )}
            </SelectContent>
                
            </Select>
    )
}