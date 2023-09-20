import { Professionals } from "@/types/professionals";
import { atomWithStorage } from "jotai/utils";
import { ServiceType } from "@/types/service"

export type WorkspaceProps = {
  workspace_id?: string;
  wodkspace_name?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  }
  professionals?: Pick<Professionals, 'id' | 'name' | 'role' | 'sex'>[];

  services?: Pick<ServiceType, 'id' | 'service_name' | 'duration'>[]
}

export const WorkspaceAtom = atomWithStorage<WorkspaceProps | null>("workspace", null)
