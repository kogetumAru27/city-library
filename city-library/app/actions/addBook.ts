"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { BookType } from "../generated/prisma/client";
export default async function addBooks(prevState:any,formData:FormData){
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const type = formData.get("type") as BookType;
    const stock = Number(formData.get("stock"));
    if(!title.trim())return{error:"タイトルを入力してください"}
    if(!author.trim())return{error:"著者を入力してください"}
    if(stock <= 0)return {error:"在庫数を入力してください"}
     await prisma.book.create({
        data:{
            title,
            author,
            type,
            stock,
            createdAt:new Date(),
            location: "逗子図書館",
            latitude: 35.2946,
            longitude: 139.5765,
        }
    });
    redirect("/admin/books")
}