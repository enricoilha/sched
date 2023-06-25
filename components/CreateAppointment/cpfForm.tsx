import { Dispatch, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SetStateAction } from "jotai"
import { useForm } from "react-hook-form"
import { FiLoader } from "react-icons/fi"
import { z } from "zod"
import { motion } from "framer-motion"

import { Clients } from "@/types/clients"
import { supabase } from "@/lib/supabase"

import { TextInput } from "../TextInput"
import { useToast } from "../ui/use-toast"
import { NewClientButton } from "./newClientButton"

const formSchema = z.object({
  cpf: z
    .string({ required_error: "Campo obrigatório" })
    .length(11, { message: "Insira um CPF válido" }),
})

type FormType = z.infer<typeof formSchema>

interface CpfFormProps {
  setClient: Dispatch<SetStateAction<Clients | undefined>>
}

export const CpfForm: React.FC<CpfFormProps> = ({ setClient }) => {
  const { toast } = useToast()
  const [checking, setChecking] = useState<boolean>(false)
  const [ createNewCLient, setCreateNewClient ] = useState<boolean>(false)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (fields: FormType) => {
    setChecking(true)
    const client: any = await supabase
      .from("clients")
      .select("*")
      .eq("cpf", fields.cpf)

    if (client.data[0] === undefined) {
      setChecking(false)
      setCreateNewClient(true)
      return toast({
        title: "Cliente não encontrado",
        description: "Cliente não encontrado, crie um novo registro do cliente",
        variant: "destructive",
      })
    }

    setClient(client.data[0])
    return setChecking(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-1 justify-center items-center"
    >
      <TextInput
        register={{ ...register("cpf") }}
        title="Pequisar CPF"
        error={errors.cpf}
      />

      {createNewCLient && <NewClientButton />}
  
      <button
        type="submit"
        disabled={checking && checking}
        className="text-sm font-medium hover:bg-neutral-100 px-5 py-1 rounded duration-100"
      >
        {checking ? (
          <FiLoader size={18} className="animate-spin" color="#242424" />
        ) : (
          "Pesquisar"
        )}
      </button>
    </form>
  )
}
