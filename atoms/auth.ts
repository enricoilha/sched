import { atomWithStorage } from "jotai/utils";
import { Session } from "@supabase/supabase-js"
 
interface AtomProps {
    session: Session | null
}

export const AuthAtom = atomWithStorage<AtomProps>("session" ,{ session: null })

