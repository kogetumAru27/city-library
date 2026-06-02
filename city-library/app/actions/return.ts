"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function returnBook(bookId:string,loanId:string){
    const session = await getServerSession(authOptions);
    if(!session)return {error:"ログインしてください"}
    await prisma.book.update({
        where:{id:bookId},
        data:{stock:{increment:1}}
    })
    await prisma.loan.update({
        where:{id:loanId},
        data:{
            status:"RETURNED",
            returnedAt:new Date()
        }
    })
}