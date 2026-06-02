import { prisma } from "@/lib/prisma";
import { Bookfilter } from "@/components/BookFilter";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function BooksPage(){
    const session = await getServerSession(authOptions)
    const books = await prisma.book.findMany();
    let hasActive = false;
    if(session?.user?.id){
        const loan = await prisma.loan.findFirst({
            where:{userId:session.user.id,status:"BORROWING"}
        });
        hasActive = !!loan;
    }
    return(
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">本の一覧</h1>
            <Bookfilter books={books} hasActive={hasActive}/>
        </div>
    )
}