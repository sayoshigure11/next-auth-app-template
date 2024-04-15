// "use client"
"use server"
import { auth } from '@/auth'
import { createClient } from '@supabase/supabase-js'


//jose
export const supabase2 = async () => {

    const session:any = await auth()
    const { supabaseAccessToken } = await session
    const supabase = await createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            global: {
                headers: {
                    Authorization: `Bearer ${supabaseAccessToken}`
                }
            }
        },
    )
    return supabase
}


//// Create a single supabase client for interacting with your database
// export const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
// )