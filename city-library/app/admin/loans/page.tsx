import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function LoanUser(){
    const session = await getServerSession(authOptions);
    if(!session || session?.user?.role !== "ADMIN") redirect("/")
    const loans = await prisma.loan.findMany({
        where:{status:"BORROWING"},
        include:{
            user:true,
            book:true
        }
    });
    return(
        <div className="p-8">
            <h1 className="text-center mb-2 font-bold">貸し出し状況</h1>
            {loans.map(loan => (
                <div key={loan.id} className="bg-gray-500 text-white">
                    <p className="border shadow-md px-4 py-2 rounded-lg mb-2 w-full">{loan.user.name}</p>
                    <p className="border shadow-md px-4 py-2 rounded-lg mb-2 w-full">{loan.book.title}</p>
                    <p className="border shadow-md px-4 py-2 rounded-lg mb-2 w-full">{loan.endDate.toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    )
}