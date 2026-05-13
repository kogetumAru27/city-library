import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async signIn({ user }) {
            await prisma.user.upsert({
                where: { email: user.email! },
                update: { name: user.name! },
                create: {
                    email: user.email!,
                    name: user.name!,
                }
            })
            return true
        },
        async session({ session }) {
            const dbUser = await prisma.user.findUnique({
                where: { email: session.user?.email! }
            })
            session.user.id = dbUser?.id ?? ""
            return session
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }