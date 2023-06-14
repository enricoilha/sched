"use client"

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useAtom } from "jotai"
import {  ChevronsRight } from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import { FiLoader } from "react-icons/fi"
import { z } from "zod"

import { supabase } from "@/lib/supabase"

import { SidesectionAtom } from "../../atoms/sidesection"
import { PhoneInput } from "../PhoneInput"
import { SexInput } from "../SexInput"
import { TextInput } from "../TextInput"
import { useToast } from "../ui/use-toast"

import {  RoleSelect } from "./RoleSelect";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  name: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, { message: "Insira um nome válido" }),
  role: z
    .string({ required_error: "Campo obrigatório" })
    .min(3,{ message: "Campo obrigatório" }),
  cpf: z
    .string({ required_error: "Campo obrigatório" })
    .length(11, { message: "Insira um CPF válido" }),
  phone: z.object({
    ddd: z.string().length(2, { message: "DDD deve conter 2 caracteres" }),
    phoneNumber: z
      .string()
      .length(9, { message: "Telefone deve conter 9 caracteres" }),
  }),
  sex: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" }),
})

type FormType = z.infer<typeof FormSchema>


export const CreateWorker: React.FC = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [, setSidesection] = useAtom(SidesectionAtom)
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = async ({
    role,
    name,
    phone,
    sex,
    cpf,
  }: FormType) => {
    setSubmitting(true)
    const checkIfAlreadyExists: any = await supabase
      .from("professionals")
      .select("name")
      .eq("cpf", cpf)

    if (checkIfAlreadyExists.data[0] !== undefined) {
      setSubmitting(false)
      return toast({
        title: "Erro no cadastro",
        description: "Já existe um profissional cadastrado com esse CPF",
        variant: "destructive",
      })
    }

    const phoneAndDDD = phone.ddd + phone.phoneNumber

    const insertToDb = await supabase.from("professionals").insert({
      name,
      role,
      phone: phoneAndDDD,
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
      description: "Profissional cadastrado com sucesso",
    })
    3
    await fetch('/api/revalidate')
    setSidesection((content) => ({ ...content, isOpen: false }))
    return router.refresh()
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


      <p className="text-3xl mt-10">Novo profissional</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-2  w-full justify-center"
      >
        <TextInput
          title="Nome Completo"
          register={{ ...register("name") }}
          error={errors?.name}
        />

        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <RoleSelect 
              error={errors.role} 
              value={field.value} 
              onBlur={field.onBlur} 
              onChange={field.onChange} 
              title="Ocupação"   
            />
          )}
          />

        <div className="w-full flex items-center gap-x-3">
          <TextInput
            title="CPF"
            register={{ ...register("cpf") }}
            error={errors?.cpf}
          />
        </div>

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