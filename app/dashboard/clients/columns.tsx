"use client";

import { ColumnDef } from "@tanstack/react-table"

import { Clients } from "@/types/clients"





export const columns: ColumnDef<Clients>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-left">Nome</div>,
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left">Email</div>,
  },
  {
    accessorKey: "cpf",
    header: () => <div className="text-left">CPF</div>,
  },
]