import { atomWithStorage } from "jotai/utils";

 
interface AtomProps {
   user: {
    name: string;
    email: string;
    admin: boolean;
   }
}

export const UserAtom = atomWithStorage<AtomProps | null>("user" , null)

