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
import { Input } from "../ui/input";
import { NumberInput } from "../NumberInput";

const FormSchema = z.object({
  service_name: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, { message: "Insira um nome válido" }),
  description: z
    .string({ required_error: "Campo obrigatório" })
    .optional(),
  duration: z.number({
    required_error: "Campo obrigatório", 
    invalid_type_error: "Campo obrigatório"
    }).int().positive().gt(5, {message: "Mínimo 5 minutos"}),
  
})

type FormType = z.infer<typeof FormSchema>

interface CreateServiceProps {
  closeFunction?: any
}

export const CreateService = ({ closeFunction }: CreateServiceProps) => {
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
   description,
   duration,
   service_name,
  }: FormType) => {
    setSubmitting(true)

    console.log(duration)
   
    

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

      <p className="text-3xl mt-10">Criar Serviço</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-1  w-full justify-center"
      >
        <TextInput
          title="Nome do serviço"
          register={{ ...register("service_name") }}
          error={errors?.service_name}
        />

        <TextInput
          title="Descrição"
          placeholder="Opcional"
          register={{ ...register("description") }}
          error={errors?.description}
        />

          <NumberInput 
          title="Duração (Minutos)"
          placeholder="Ex: 30"
          register={{ ...register("duration", { valueAsNumber: true }) }}
          error={errors?.duration}
          />

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