import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { ChevronsRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import { z } from "zod";



import { Clients } from "@/types/clients";
import { supabase } from "@/lib/supabase"

import { SidesectionAtom } from "../../atoms/sidesection"
import { useToast } from "../ui/use-toast";
import { ClientInfos } from "./ClientInfos";
import { CpfForm } from "./cpfForm";


const FormSchema = z.object({
  cpf: z
    .string({ required_error: "Campo obrigatório" })
    .length(11, { message: "Insira um CPF válido" }),
  name: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, { message: "Insira um nome válido" }),
  email: z
    .string({ required_error: "Campo obrigatório" })
    .email({ message: "Insira um email válido" }),
  phone: z.object({
    ddd: z.string().length(2, { message: "DDD deve conter 2 caracteres" }),
    phoneNumber: z
      .string()
      .length(9, { message: "Telefone deve conter 9 caracteres" }),
  }),
  born_date: z.object({
    day: z.string().length(2, { message: "Insira um dia válido" }),
    month: z.string().length(2, { message: "Insira um mês válido" }),
    year: z.string().length(4, { message: "Insira um ano válido" }),
  }),
  sex: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" }),
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
    born_date,
    email,
    name,
    phone,
    sex,
    cpf,
  }: FormType) => {
    setSubmitting(true)
    const checkIfAlreadyExists: any = await supabase
      .from("clients")
      .select("cpf, email, name")
      .eq("cpf", cpf)

    if (checkIfAlreadyExists.data[0] !== undefined) {
      setSubmitting(false)
      return toast({
        title: "Erro no cadastro",
        description: "Já existe um cliente cadastrado com esse CPF",
        variant: "destructive",
      })
    }

    const insertToDb = await supabase.from("clients").insert({
      born_date,
      email,
      name,
      phone: `${phone.ddd}${phone.phoneNumber}`,
      sex,
      cpf,
    })

    if (insertToDb.error) {
      return toast({
        title: "Erro",
        description: "Houve algum erro inesperado",
        variant: "destructive",
      })
    }

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