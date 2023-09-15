import { supabase } from "@/lib/supabase"
import { Professionals } from "@/types/professionals";
import { columns } from "./columns"
import { ServicesDataTable } from "./date-table"

import { NewService } from "@/components/Services/NewService";

export const revalidate = 60 // revalidate at most every minute


async function getProfessionals(): Promise<{ data: Professionals[]; count: number }> {
  const { data, count }: any = await supabase
    .from("services")
    .select("*", { count: "exact" })

  return { data, count }
}

export default async function ServicesPage() {
  const { count, data } = await getProfessionals()
  return (
    <section className="p-8 w-full h-screen overflow-auto">
      <div className="flex items-center justify-between" >
        <p className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
          Serviços
        </p>

        <NewService />
      </div>
      <p className="font-light mt-1 text-gray-700">
        Visão geral de todos os serviços registrados
      </p>

      <main className="w-full h-[58vh] max-w-[1050px] mt-10">
        <ServicesDataTable columns={columns} data={data} count={count} />
      </main>

    </section>
  )
}
