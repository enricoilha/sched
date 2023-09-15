import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { WorkspaceAtom } from "@/atoms/workspace"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useAtom } from "jotai"
import { ChevronsRight } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { FiLoader } from "react-icons/fi"
import { z } from "zod"

import { Appointment } from "@/types/appointment"
import { Clients } from "@/types/clients"
import { supabase } from "@/lib/supabase"

import { SidesectionAtom } from "../../atoms/sidesection"
import { useToast } from "../ui/use-toast"
import { AppointmentSelect } from "./AppointmentSelect"
import { ClientInfos } from "./ClientInfos"
import { CpfForm } from "./cpfForm"

interface ProfessionalsProps {
  id: string
  text: string
}

const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/

const FormSchema = z.object({
  room: z
    .number({ required_error: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" }),
  client_id: z
    .string({ required_error: "Campo obrigatório" })
    .uuid({ message: "Insira um cliente válido" }),
  professional_id: z
    .string({ required_error: "Campo obrigatório" })
    .uuid({ message: "Insira um profissional válido" }),
  service_id: z
    .string({ required_error: "Campo obrigatório" })
    .uuid({ message: "Insira um serviço válido" }),
  finishing_at: z
    .string({ required_error: "Campo obrigatório" })
    .regex(dateRegex, { message: "Data não válida" }),
  starting_at: z
    .string({ required_error: "Campo obrigatório" })
    .regex(dateRegex, { message: "Data não válida" }),
})

type FormType = z.infer<typeof FormSchema>

export const CreateAppointment: React.FC = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [loadingNewAppointment, setLoadingNewAppointment] =
    useState<boolean>(true)
  const [client, setClient] = useState<Clients | undefined>()
  const [professionals, setProfessionals] = useState<
    ProfessionalsProps[] | null
  >(null)
  const [, setSidesection] = useAtom(SidesectionAtom)
  const [workspace] = useAtom(WorkspaceAtom)
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = async (fields: FormType) => {
    setSubmitting(true)

    setSubmitting(false)
    toast({
      title: "Sucesso",
      description: "Cliente cadastrado com sucesso",
    })

    return setSidesection((content) => ({ ...content, isOpen: false }))
  }

  async function fetchNewAppointment() {
    const professionals: any = await supabase
      .from("professionals")
      .select("name, id")
      .eq("workspace_id", workspace?.workspace_id)

    if (professionals.data[0] === undefined) {
      toast({
        title: "Houve um problema",
        description:
          "Não foi possível encontrar profissionais cadastrados no sistema",
        variant: "destructive",
      })
      setSidesection((state) => ({ ...state, isOpen: false }))
      return router.replace(
        `/${workspace?.workspace_id}/dashboard/professionals`
      )
    }
  }

  useEffect(() => {
    if (client !== undefined) {
      ;(async () => await fetchNewAppointment())()
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
          <div className="w-full flex justify-center items-center mt-10">
            <FiLoader size={24} className="animate-spin" color="#121212" />
          </div>
        ) : (
          <motion.div
            initial={{ translateY: "50%", opacity: 0.5 }}
            animate={{ translateY: "0%", opacity: 1 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 flex flex-col gap-1  w-full justify-center"
            >
              <ClientInfos name={client.name} />

              <Controller
                control={control}
                name="professional_id"
                render={({ field }) => (
                  <AppointmentSelect
                    error={errors.professional_id}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    title="Ocupação"
                    options={[{ id: "ui0u0909i091", text: "Enrico " }]}
                  />
                )}
              />

              <button
                className="font-medium hover:bg-neutral-100 px-5 py-1 rounded duration-100 w-fit mx-auto text-base"
                type="submit"
                disabled={submitting && submitting}
              >
                {submitting ? (
                  <FiLoader
                    size={24}
                    className="animate-spin"
                    color="#fafafab1"
                  />
                ) : (
                  "Criar"
                )}
              </button>
            </form>
          </motion.div>
        )
      ) : (
        <CpfForm setClient={setClient} />
      )}
    </motion.div>
  )
}
