import { supabase } from "@/lib/supabase"

import { Clients, columns } from "./columns"
import { DataTable } from "./date-table"

export const fetchCache = 'only-no-store'

async function getClients(): Promise<{ data: Clients[]; count: number }> {
  const { data, count }: any = await supabase
    .from("clients")
    .select("*", { count: "exact" })

  return { data, count }
}

export default async function ClientsPage() {
  const { count, data } = await getClients()
  return (
    <section className="p-8 w-full h-screen overflow-auto">
      <p className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
        Clientes
      </p>
      <p className="font-light mt-1 text-gray-700">
        Visão geral de todos os clientes
      </p>

      <main className="w-full h-[58vh] max-w-[1050px] mt-10">
        <DataTable columns={columns} data={data} count={count} />
      </main>
    </section>
  )
}
