"use client"

import React from "react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { SidesectionAtom } from "@/atoms/sidesection";
import { CreateClient } from "../CreateClient";


export const NewClientButton: React.FC = () => {
    const [ ,setSidesection ] = useAtom(SidesectionAtom)
    const handleNewCLient = () => {
        return setSidesection((content) => ({
            ...content,
            children: <CreateClient />
        }))
    }

    return (
        <motion.div 
            onClick={handleNewCLient} 
            initial={{height: 0}} 
            animate={{height: 40}} 
            className="text-emerald-500 font-medium cursor-pointer hover:bg-emerald-50 px-8 flex items-center rounded-md duration-100" 
        >
            Clique aqui para criar um novo cliente
        </motion.div>
    )
}