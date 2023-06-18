import { atomWithStorage } from "jotai/utils";

type WorkspaceProps = {
    workspace_id: string;
    wodkspace_name: string;
    user?: {
        id: string;
        email: string;
        name: string;
    }
    professionals?: {
        name: string;
        role: string;
        sex: string;
        cpf: string;
        phone: string;
    }[]
}

export const WorkspaceAtom = atomWithStorage<WorkspaceProps | null>("workspace",null)