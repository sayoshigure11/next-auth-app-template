import NextAuth, {NextAuthConfig} from "next-auth"
import Github from "next-auth/providers/github"
import { SupabaseAdapter } from "@auth/supabase-adapter"
export const config: NextAuthConfig = {
    providers: [Github({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
    })],
    // adapter: SupabaseAdapter({
    //     url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    //     secret: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    // }),
    basePath: "/api/auth",
    callbacks: {
        authorized({ request, auth }) {
            try {
                const { pathname } = request.nextUrl
                if (pathname === "/protected-page") return !!auth
                return true
            } catch (err) {
                console.log(err)
            }
        },
        jwt({ token, trigger, session }) {
            if (trigger === "update") token.name = session.user.name
            return token
        }
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)
