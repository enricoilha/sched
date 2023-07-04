import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { ChevronsRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import { z } from "zod";



import { Appointment } from "@/types/appointment";
import { Clients } from "@/types/clients";
import { supabase } from "@/lib/supabase";



import { SidesectionAtom } from "../../atoms/sidesection";
import { useToast } from "../ui/use-toast";
import { ClientInfos } from "./ClientInfos";
import { CpfForm } from "./cpfForm"

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
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [client, setClient] = useState<Clients | undefined>()
  const [, setSidesection] = useAtom(SidesectionAtom)
  console.log(client)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = async ({
    client_id,
    finishing_at,
    professional_id,
    room,
    service_id,
    starting_at,
  }: FormType) => {
    setSubmitting(true)
    //Check if appointment exists in this time

    // if (checkIfAlreadyExists.data[0] !== undefined) {
    //   setSubmitting(false)
    //   return toast({
    //     title: "Erro no cadastro",
    //     description: "Já existe um cliente cadastrado com esse CPF",
    //     variant: "destructive",
    //   })
    // }

    //Insert to db funcion

    // if (insertToDb.error) {
    //   return toast({
    //     title: "Erro",
    //     description: "Houve algum erro inesperado",
    //     variant: "destructive",
    //   })
    // }

    setSubmitting(false)
    toast({
      title: "Sucesso",
      description: "Cliente cadastrado com sucesso",
    })
    3

    return setSidesection((content) => ({ ...content, isOpen: false }))
  }

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
        <motion.div
          initial={{ translateY: "50%", opacity: 0.5 }}
          animate={{ translateY: "0%", opacity: 1 }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col gap-1  w-full justify-center"
          >
            <ClientInfos name={client.name} />

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
      ) : (
        <CpfForm setClient={setClient} />
      )}
    </motion.div>
  )
}