"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function Readnoti(notificationId: string){
    const session = await getServerSession(authOptions);
    if(!session)return {error:"ログインしてください"}
    await prisma.notification.update({
        where:{id:notificationId },
        data:{isRead:true}
    })
}