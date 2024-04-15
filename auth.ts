import NextAuth, {NextAuthConfig} from "next-auth"
import Github from "next-auth/providers/github"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import jwt from "jsonwebtoken"
import { SignJWT, jwtVerify } from "jose"


export const config: NextAuthConfig = {
    providers: [Github({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
    })],
    adapter: SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        // secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        secret: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
    }),
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
        },
        async session({ session, user }) {
            //見本
            // const signingSecret = process.env.SUPABASE_JWT_SECRET


            // //jose claude3
            const signingSecret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET)
            
            
            
            if (signingSecret) {
                const payload = {
                aud: "authenticated",
                exp: Math.floor(new Date(session.expires).getTime() / 1000),
                sub: user.id,
                email: user.email,
                role: "authenticated",
                }
                //見本
                // session.supabaseAccessToken = jwt.sign(payload, signingSecret)


                // jose claude3
                session.supabaseAccessToken = await new SignJWT(payload)
                    .setProtectedHeader({ alg: "HS256" })
                    .setIssuedAt()
                    // .setExpirationTime(new Date(session.expires).toISOString())
                    .setExpirationTime(new Date(session.expires))
                    .sign(signingSecret)
            }
            return session
        },
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)
