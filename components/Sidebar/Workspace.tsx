"use client";

import { WorkspaceAtom } from "@/atoms/workspace";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";

export const WorkspaceComponent: React.FC = () => {
  const [workspace] = useAtom(WorkspaceAtom);
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/workspaces")}
      className="flex h-16 w-full cursor-pointer flex-col items-center justify-center rounded-xl border bg-gray-50 p-3 duration-100 hover:bg-gray-100"
    >
      <p className=" font-medium">{workspace?.wodkspace_name}</p>
      <p className="text-xs font-light">Trocar</p>
    </div>
  );
};
