import { ReactNode } from "react"
import Image from "next/image"
import authbg from "@/public/authbg.svg"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="w-screen h-screen relative flex items-center justify-center">
      <Image
        src={authbg}
        fill
        alt="Plano de fundo albus tela de autenticação"
        className="object-cover absolute -z-10"
      />
      {children}
    </section>
  )
}
