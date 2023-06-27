import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useAtom } from "jotai"
import {  ChevronsRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { FiLoader } from "react-icons/fi"
import { z } from "zod"

import { supabase } from "@/lib/supabase"

import { SidesectionAtom } from "../../atoms/sidesection"
import { DateInput } from "../DateInput"
import { PhoneInput } from "../PhoneInput"
import { SexInput } from "../SexInput"
import { TextInput } from "../TextInput"
import { useToast } from "../ui/use-toast"
import { WorkspaceAtom } from "@/atoms/workspace";

const FormSchema = z.object({
  name: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, { message: "Insira um nome válido" }),
  email: z
    .string({ required_error: "Campo obrigatório" })
    .email({ message: "Insira um email válido" }),
  cpf: z
    .string({ required_error: "Campo obrigatório" })
    .length(11, { message: "Insira um CPF válido" }),
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

interface CreateClientProps {
  closeFunction?: any
}

export const CreateClient = ({ closeFunction }: CreateClientProps) => {
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [, setSidesection] = useAtom(SidesectionAtom)
  const [ workspace, setWorkspace] = useAtom(WorkspaceAtom)
  const {
    register,
    handleSubmit,
    formState: { errors },
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
      workspace_id: workspace?.workspace_id
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
    <motion.div className="w-full h-[95vh] overflow-y-auto items-center p-3">
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

      <p className="text-3xl mt-10">Criar Cliente</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-1  w-full justify-center"
      >
        <TextInput
          title="Nome Completo"
          register={{ ...register("name") }}
          error={errors?.name}
        />

        <TextInput
          title="Email"
          register={{ ...register("email") }}
          error={errors?.email}
        />

        <div className="flex items-center w-full gap-x-6">
          <PhoneInput
            title="Telefone com DDD"
            registerPhoneDDD={{
              ...register("phone.ddd", { maxLength: 2 }),
            }}
            registerPhoneNumber={{
              ...register("phone.phoneNumber", { maxLength: 9 }),
            }}
            error={errors?.phone}
          />

          <DateInput
            title="Data de nascimento"
            registerDay={{
              ...register("born_date.day"),
            }}
            registerMonth={{ ...register("born_date.month") }}
            registerYear={{ ...register("born_date.year") }}
            error={errors?.born_date}
          />
        </div>

        <div className="w-full flex items-center gap-x-3">
          <TextInput
            title="Cpf"
            register={{ ...register("cpf") }}
            error={errors?.cpf}
          />

          <SexInput
            title="Sexo"
            register={{ ...register("sex") }}
            error={errors?.sex}
          />
        </div>

        <button
          className="bg-gray-800 hover:bg-black duration-100 rounded-md w-44 py-2 mx-auto mt-2 text-white flex items-center justify-center"
          type="submit"
          disabled={submitting && submitting}
        >
          {submitting ? (
            <FiLoader size={24} className="animate-spin" color="#fafafab1" />
          ) : (
            "Criar"
          )}
        </button>
      </form>
    </motion.div>
  )
}