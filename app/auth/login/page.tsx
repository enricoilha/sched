"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import albus from "@/public/albus.webp"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { motion } from "framer-motion"
import { Loader } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useToast } from "@/components/ui/use-toast"
import { TextInput } from "@/components/TextInput"

const FormSchema = z.object({
  email: z
    .string({ required_error: "Campo obrigatório" })
    .email({ message: "Insira um email obrigatório" }),
  password: z
    .string({ required_error: "Campo obrigatório" })
    .min(6, { message: "Mínimo de 6 caracteres" }),
})

type FormType = z.infer<typeof FormSchema>

export default function LoginPage() {
  const supabase = createClientComponentClient()
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(fields: FormType) {
    setLoading(true)

    const user = await supabase.auth.signInWithPassword({
      email: fields.email,
      password: fields.password,
    })

    console.log(user.error?.status)

    if (user.error) {
      setLoading(false)
      return user.error.status === 400
        ? toast({
          title: "Não foi possível realizar o login",
          description: "Credenciais inválidas",
          variant: "destructive",
        })
        : toast({
          title: "Não foi possível realizar o login",
          variant: "destructive",
        })
    }

    router.push("/workspaces")
  }

  return (
    <motion.div
      initial={{ translateX: "-50%", opacity: 0 }}
      animate={{ translateX: "0%", opacity: 1 }}
      className="w-[26rem] min-h-[28rem] bg-white shadow p-8 rounded-md flex flex-col"
    >
      <Image src={albus} alt="Albus logo" width={80} />

      <p className="mt-8 font-semibold text-xl ml-1">Entrar</p>
      <p className="font-light text-sm mt-1 ml-1">
        Coloque suas credenciais para acessar a plataforma
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-1 mt-6"
      >
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
          disabled={loading && loading}
          className="w-full h-9 bg-emerald-500 text-white font-medium rounded duration-100 hover:bg-emerald-600 flex justify-center items-center"
        >
          {loading ? <Loader size={22} className="animate-spin" /> : "Entrar"}
        </button>
      </form>
      <div className="mt-2 text-sm flex gap-x-2 items-center justify-center">
        <p>Não possui conta?</p>
        <button
          onClick={() => router.push("/auth/signup")}
          disabled={loading && loading}
          type="button"
          className="text-emerald-600 font-medium hover:underline duration-100 underline-offset-2"
        >
          Cadastre-se
        </button>
      </div>
    </motion.div>
  )
}
