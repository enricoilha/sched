'use client'

import { motion } from "framer-motion";
import Image from "next/image"
import emailSvg from "@/public/email.svg"
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


export default function ConfirmPage() {

    const { toast } = useToast()
    const email = useSearchParams().get("email")
    const supabase = createClientComponentClient()

    async function handleResend() {
        const { data, error } = await supabase.auth.resend({
            type: 'signup',
            email: email || ''
          })
          
          if(error) {
            console.log(error)
            return toast({
                title: "Houve um erro inesperado",
                description: "Não foi possível reenviar seu email de confirmação",
                variant: "destructive"
            })
          }

          return toast({
            title: "Email de confirmação reenviado",
            description: "O email pode estar sendo movido para caixas de spam ou lixo eletrônico pelo seu provedor de email."
          })
    }

    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        className="w-[35rem] flex flex-col items-center gap-4 p-8 bg-white rounded-2xl shadow"
        >
            <Image alt="Email Image" src={emailSvg} width={200} />
            <p className="text-xl font-medium" >Confirmação do cadastro por E-mail</p>
            <p className="text-center font-light" >Nós enviamos um email para <span className="text-emerald-600 font-medium" >{email}</span> para confirmar a validade do seu endereço de email. Siga o link recebido para confirmar seu cadastro e seguir para a plataforma. </p>

            <p>Não recebeu email de confirmação?</p>

            <button onClick={() => handleResend()} className="px-5 py-1 bg-emerald-500 rounded text-white font-medium hover:bg-emerald-600 duration-100" >Enviar novo email</button>
        </motion.div>
    )
}