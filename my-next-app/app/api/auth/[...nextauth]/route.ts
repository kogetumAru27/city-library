import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
    session: {
        maxAge: 60 * 10 // 10分
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!, 
        }),
        GithubProvider({
            clientId:process.env.GITHUB_CLIENT_ID!,
            clientSecret:process.env.GITHUB_CLIENT_SECRET!,
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
        }
    }
    
});
export { handler as GET, handler as POST }