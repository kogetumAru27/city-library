"use server";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma"
import { authOptions } from "../api/auth/[...nextauth]/route";
import { StarType } from "../generated/prisma/client";
export async function createPosts(formData:FormData){
    const location = formData.get("location") as string;
    const starType = formData.get("starType") as StarType;
    const caption = formData.get("caption") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        throw new Error("ログインしてください")
      }
    const userId = session?.user?.id
    await prisma.post.create({
        data:{location,starType,caption,imageUrl,userId}
    });
    redirect("/posts")
}
export async function Delete(id:string){
    await prisma.post.delete({
        where:{id}
    });
    redirect("/posts");
}

export async function Update(formData:FormData){
    const location = formData.get("location") as string;
    const starType = formData.get("starType") as StarType;
    const caption = formData.get("caption") as string;
    const imageUrl = formData.get("imageUrl")as string;
    const id = formData.get("id") as string
    await prisma.post.update({
        where:{ id },
        data:{location,starType,caption,imageUrl}
    }) 
redirect("/posts");
}