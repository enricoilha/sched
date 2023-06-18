"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

import { supabase } from "@/lib/supabase"

export const AuthProvider = (props: any) => {
  useEffect(() => {
    const activesesh = supabase.auth.getSession()
  }, [])
}
