"use client";

import { ColumnDef, RowSelection } from "@tanstack/react-table";



import { Clients } from "@/types/clients";
import { RowSelectionComponent } from "@/components/tables/RowSelectionComponent"





export const columns: ColumnDef<Clients>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <RowSelectionComponent
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <RowSelectionComponent
        {...{
          checked: row.getIsSelected(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
  },

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