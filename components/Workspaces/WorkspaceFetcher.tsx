"use client";
import { WorkspaceAtom } from "@/atoms/workspace";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface ComponentProps {
  session: Session;
}

export const WorkspaceFetcher = ({ session }: ComponentProps) => {
  const supabase = createClientComponentClient<any>();
  const workspace_id = usePathname().split("/")[1];

  const [, setWorkspace] = useAtom(WorkspaceAtom);
  const { data: workspace_data, error: workspace_error } = useQuery({
    queryKey: ["workspace"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workspaces")
        .select(
          "id, name, professionals(id, name, role, sex), services(id, service_name, duration)",
        )
        .eq("id", workspace_id)
        .single();

      const { data: userData, error: userErr } = await supabase
        .from("users")
        .select("id, email, name")
        .eq("user_id", session.user.id)
        .single();

      return {
        ...data,
        user: {
          ...userData,
        },
      };
    },
  });

  useEffect(() => {
    if (workspace_data) {
      setWorkspace({
        professionals: workspace_data.professionals,
        services: workspace_data.id,
        wodkspace_name: workspace_data.name,
        workspace_id: workspace_data.id,
        user: {
          email: workspace_data.user.email,
          id: workspace_data.user.id,
          name: workspace_data.user.name,
        },
      });
    }
  }, [workspace_data]);

  return <div />;
};
