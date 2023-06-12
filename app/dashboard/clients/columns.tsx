"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Clients = {
  id: string
  created_at: string
  name: string
  email: string
  phone: string
  born_date: string
  sex: string
  cpf: string
}

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
