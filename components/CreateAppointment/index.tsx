import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { WorkspaceAtom } from "@/atoms/workspace"
import { motion } from "framer-motion"
import { useAtom } from "jotai"
import { ChevronsRight } from "lucide-react"
import { FiLoader } from "react-icons/fi"

import { Clients } from "@/types/clients"
import { supabase } from "@/lib/supabase"

import { SidesectionAtom } from "../../atoms/sidesection"
import { useToast } from "../ui/use-toast"
import { ClientInfos } from "./ClientInfos"
import { CpfForm } from "./cpfForm"
import { AppointmentForm } from "./AppointmentForm"


const revalidate = 30 //revalidate every 30 min


export const CreateAppointment: React.FC = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [loadingNewAppointment, setLoadingNewAppointment] =
    useState<boolean>(false)
  const [client, setClient] = useState<Clients | undefined>()

  const [, setSidesection] = useAtom(SidesectionAtom)
  const [workspace] = useAtom(WorkspaceAtom)



  async function fetchNewAppointment() {
    setLoadingNewAppointment(true)
    const professionalsResponse: any = await supabase
      .from("professionals")
      .select("name, id")
      .eq("workspace_id", workspace?.workspace_id)

    if (professionalsResponse.data[0] === undefined) {
      toast({
        title: "Houve um problema",
        description:
          "Não foi possível encontrar profissionais cadastrados no sistema",
        variant: "destructive",
      })
      setLoadingNewAppointment(false)

      setSidesection((state) => ({ ...state, isOpen: false }))
      setLoadingNewAppointment(false)

      return router.replace(
        `/${workspace?.workspace_id}/dashboard/professionals`
      )
    }
    setLoadingNewAppointment(false)
    return
  }

  useEffect(() => {
    if (client !== undefined) {
      ; (async () => await fetchNewAppointment())()
    }
  }, [client])

  return (
    <motion.div className="w-full h-[98vh] overflow-y-auto items-center p-3">
      <header className="w-full flex items-center justify-between">
        <button
          onClick={() =>
            setSidesection((content) => ({ ...content, isOpen: false }))
          }
          className="p-2 rounded-md hover:bg-neutral-100 duration-100 text-neutral-600"
        >
          <ChevronsRight />
        </button>
      </header>

      <p className="text-3xl mt-1 mb-4">Criar Agendamento</p>

      {client ? (
        loadingNewAppointment ? (
          <div className="flex justify-center w-full items-center mt-10">
            <FiLoader size={24} className="animate-spin" color="#121212" />
          </div>
        ) : (
          <>
            <ClientInfos name={client.name} />

            <AppointmentForm />
          </>
        )
      ) : (
        <CpfForm setClient={setClient} />
      )}
    </motion.div>
  )
}
