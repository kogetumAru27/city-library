"use server";
import { prisma } from "@/lib/prisma";
export default async function deleteBooks(bookId:string){
    const ok = await prisma.loan.findFirst({
        where:{status:"BORROWING"}
    });
    if(!ok) return {error:"本は貸し出し中なので削除できません"}
    await prisma.book.delete({
        where:{id:bookId}
    })
}