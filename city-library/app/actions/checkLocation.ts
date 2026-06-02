"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function checkLocation(userLat: number, userLon: number) {
    const session = await getServerSession(authOptions);
    if (!session) return;

    // 自分が借りている本を取得
    const loans = await prisma.loan.findMany({
        where: {
            userId: session.user.id,
            status: "BORROWING"
        },
        include: { book: true }
    });

    // 各本の図書館との距離を確認
    for (const loan of loans) {
        const distance = calcDistance(
            userLat, userLon,
            loan.book.latitude!, loan.book.longitude!
        );

        // 15km圏外なら通知を作る
        if (distance > 15) {
            const existing = await prisma.notification.findFirst({
                where: { loanId: loan.id, message: "図書館から15km圏外に出ました" }
            });
            if (!existing) {
                await prisma.notification.create({
                    data: {
                        userId: session.user.id,
                        loanId: loan.id,
                        message: "図書館から15km圏外に出ました",
                        isRead: false,
                    }
                });
            }
        }
    }
}

function calcDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}