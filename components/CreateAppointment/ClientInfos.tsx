import React from "react"

interface ClientInfosProps {
  name: string
}

export const ClientInfos: React.FC<ClientInfosProps> = ({ name }) => {
  return (
    <section className="w-full flex flex-col">
      <p className="font-medium">Cliente:</p>
      <p className="font-light">{name}</p>
    </section>
  )
}
