import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ReturnButton from "@/components/ReturnButton";
import ReadButton from "@/components/ReadButton";
export default async function Mypage(){
    const session = await getServerSession(authOptions);
    if(!session)return <p>ログインしてください</p>
    const loans = await prisma.loan.findMany({//自分が借りている本
        where:{
            userId:session.user.id,
            status:"BORROWING"
        },
        include:{
            book:true
        }    
    });
    const notifications = await prisma.notification.findMany({
        where:{
            userId:session.user.id,
            isRead:false
        }
    })
    return(
        <div>
            <h1 className="px-4 py-2 font-bold text-center border border-white shadow-md rounded-lg bg-white mb-2">借りている本</h1>
            {loans.map(loan => (
                <div key={loan.id} className="px-4 py-4 rounded-lg bg-white shadow-md mb-4 text-black">
                    <p className="font-bold text-lg">{loan.book.title}</p>
                    <p className="text-gray-500">{loan.book.author}</p>
                    <p className="text-red-500 mt-2" >返却期限:{loan.endDate.toLocaleDateString()}</p>
                    <ReturnButton bookId={loan.bookId} loanId={loan.id}/>
                </div>
            ))}
            {notifications.map(not => (
                <div key={not.id} className="bg-yellow-100 px-4 py-2 rounded-lg mb-2 text-black">
                    <p>{not.message}</p>
                    <ReadButton notificationId={not.id} />
                </div>
            ))}
        </div>
    )
}
