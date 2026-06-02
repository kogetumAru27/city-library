"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { BookType } from "../generated/prisma/client";
export default async function UpdateBook(prevState:any,formData:FormData){
    const bookId = formData.get("bookId") as string;
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const stock = Number(formData.get("stock"));
    const type = formData.get("type") as BookType;
    if(!title.trim())return{error:"タイトルを入力してください"}
    if(!author.trim())return{error:"著者を入力してください"}
    if(stock <= 0)return {error:"在庫数を入力してください"}
    await prisma.book.update({
        where:{id:bookId},
        data:{
            title,
            author,
            stock,
            type
        }
    });
    redirect("/admin/books")
}
