"use server";
import { prisma } from "@/lib/prisma";
export async function deleteBook(bookId:string){
    const ok = await prisma.loan.findFirst({
        where:{id:bookId,status:"BORROWING"}
    });
    if(ok)return {error:"貸し出し中の本は削除できません"}
    await prisma.book.delete({
        where:{id:bookId,}
    });

}
