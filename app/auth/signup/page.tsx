"use client"

import { sign } from "crypto"
import Image from "next/image"
import { useRouter } from "next/navigation"
import albus from "@/public/albus.webp"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"
import { TextInput } from "@/components/TextInput"

const FormSchema = z.object({
  name: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" }),
  email: z
    .string({ required_error: "Campo obrigatório" })
    .email({ message: "Insira um email obrigatório" }),
  password: z
    .string({ required_error: "Campo obrigatório" })
    .min(6, { message: "Mínimo de 6 caracteres" }),
})

type FormType = z.infer<typeof FormSchema>

export default function LoginPage() {
  const { toast } = useToast()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(fields: FormType) {
    const signup = await supabase.auth.signUp({
      email: fields.email,
      password: fields.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (signup.error) {
      console.log(signup.error)
      return toast({
        title: "Não foi possível realizar o cadastro",
      })
    }

    router.refresh()
  }

  return (
    <motion.div
      initial={{ translateX: "-50%", opacity: 0 }}
      animate={{ translateX: "0%", opacity: 1 }}
      className="w-[26rem] min-h-[28rem] bg-white shadow p-8 rounded-2xl flex flex-col"
    >
      <Image src={albus} alt="Albus logo" width={80} />

      <p className="mt-8 font-semibold text-xl ml-1">Cadastre-se</p>
      <p className="font-light text-sm mt-1 ml-1">
        Coloque suas credenciais para se cadastrar na plataforma
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-1 mt-6"
      >
        <TextInput
          title="Nome completo"
          register={{ ...register("name") }}
          error={errors.name}
        />
        <TextInput
          title="Email"
          register={{ ...register("email") }}
          error={errors.email}
        />

        <TextInput
          title="Senha"
          type="password"
          register={{ ...register("password") }}
          error={errors.password}
        />

        <button
          type="submit"
          className="w-full h-9 bg-emerald-500 text-white font-medium rounded duration-100 hover:bg-emerald-600 "
        >
          Entrar
        </button>
      </form>
      <div className="mt-2 text-sm flex gap-x-2 items-center justify-center">
        <p>Já possui conta?</p>
        <button
          type="button"
          onClick={() => router.push("/auth/login")}
          className="text-emerald-600 font-medium hover:underline duration-100 underline-offset-2"
        >
          Entrar
        </button>
      </div>
    </motion.div>
  )
}
