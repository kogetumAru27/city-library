"use client";
import returnBook from "@/app/actions/return";
import { useRouter } from "next/navigation";
export default function ReturnButton({bookId,loanId}:{bookId:string,loanId:string}){
    const router = useRouter();
    async function handleReturn(){
        await returnBook(bookId,loanId);
        router.refresh();
    }
    return(
        <div>
            <button onClick={handleReturn} className="hover:bg-gray-500 hover:text-white transition px-4 py-2 rounded-lg">返却</button>
        </div>
    )
}