"use server";
import { redirect } from "next/navigation";
import { prisma }from"@/lib/prisma";
import { getServerSession } from "next-auth";
import { StarType } from "../generated/prisma/client";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function Prcaction(formData:FormData){
    const location = formData.get("location") as string;
    const starType = formData.get("starType") as StarType;
    const imageUrl = formData.get("imageUrl") as string;
    const caption = formData.get("caption") as string;
    const session = await getServerSession(authOptions);
    if(!session?.user?.id)throw new Error("ログインしてください");
    const userId =  session.user.id;
    await prisma.post.create({
        data:{location,starType,caption,imageUrl,userId}
    });
    redirect("/practice");
}