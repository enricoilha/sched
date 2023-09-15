import { AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"

import { Professionals } from "@/types/professionals"
import { supabase } from "@/lib/supabase"
import { NewButton } from "@/components/Professionals/NewButton"
import { SideSection } from "@/components/SideSection"

import { columns } from "./columns"
import { ProfessionalsDataTable } from "./date-table"

export const revalidate = 60 // revalidate at most every minute

async function getProfessionals(): Promise<{
  data: Professionals[]
  count: number
}> {
  const { data, count }: any = await supabase
    .from("professionals")
    .select("*", { count: "exact" })

  return { data, count }
}

export default async function ProfessionalsPage() {
  const { count, data } = await getProfessionals()
  return (
    <section className="p-8 w-full h-screen overflow-auto">
      <div className="flex items-center justify-between">
        <p className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
          Profissionais
        </p>

        <NewButton />
      </div>
      <p className="font-light mt-1 text-gray-700">
        Visão geral de todos os profissionais registrados
      </p>

      <main className="w-full h-[58vh] max-w-[1050px] mt-10">
        <ProfessionalsDataTable columns={columns} data={data} count={count} />
      </main>
    </section>
  )
}
