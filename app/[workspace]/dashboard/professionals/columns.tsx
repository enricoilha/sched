"use client";

import { ColumnDef } from "@tanstack/react-table"

import { Professionals } from "@/types/professionals";





export const columns: ColumnDef<Professionals>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-left">Nome</div>,
  },
  {
    accessorKey: "role",
    header: () => <div className="text-left">Ocupação</div>,
  },
]