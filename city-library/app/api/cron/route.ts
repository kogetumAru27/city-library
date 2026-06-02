import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(){
    const three = new Date();
    three.setDate(three.getDate() + 3);
    const oneDaylater = new Date();
    oneDaylater.setDate(oneDaylater.getDate() + 1);
    const loans = await prisma.loan.findMany({
        where: {
            status: "BORROWING",
            endDate: {
                lte: three,
            }
        }
    });
    const  loansOneDayBefore = await prisma.loan.findMany({
        where:{
            status:"BORROWING",
            endDate:{
                lte:oneDaylater,
            }
        }
    });
    // 3日前の処理
for (const loan of loans) {
    const existing = await prisma.notification.findFirst({//この通知があるかどうかなので一件でいい
        where: { loanId: loan.id, message: "返却3日前です" }
    });
    if (!existing) {
        await prisma.notification.create({
            data: { userId: loan.userId, loanId: loan.id, message: "返却3日前です", isRead: false }
        });
    }
}

// 1日前の処理
for (const loan of loansOneDayBefore) {
    const existing = await prisma.notification.findFirst({
        where: { loanId: loan.id, message: "返却1日前です" }
    });
    if (!existing) {
        await prisma.notification.create({
            data: { userId: loan.userId, loanId: loan.id, message: "返却1日前です", isRead: false }
        });
    }
}

    return NextResponse.json({message:"完了"})
}