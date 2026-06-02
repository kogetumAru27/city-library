"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function borrowBook(bookId:string) {
    const session = await getServerSession(authOptions);
    if(!session)return {error:"ログインしてください"}
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);
    const startDate = new Date();
    const loan = await prisma.loan.create({
        data:{
            bookId,
            userId:session.user.id,
            startDate,
            endDate,
            status:"BORROWING",
        }
    });
    await prisma.book.update({
        where:{id:bookId},
        data:{stock:{decrement:1}}
    });

}