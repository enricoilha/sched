import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Request } from "express";

interface LoginBody {
    email: string;
    password: string
}

export default async function POST(request: Request) {

    if (!request.body) {
        throw new Error(`Request body can't be  NULL`)
    }
    const { email, password } = request.body

    const supabase = createServerComponentClient({ cookies })

    const user = await supabase.auth.signInWithPassword({
        email,
        password
    })


    return user
}