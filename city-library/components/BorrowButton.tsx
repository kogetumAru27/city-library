"use client";
import { borrowBook } from "@/app/actions/borrow";
import { useRouter } from "next/navigation";
export default function BorrowButton({bookId,stock}:{bookId:string,stock:number}){
    const router = useRouter();
    async function handleBorrows(){
        await borrowBook(bookId);
        router.refresh();
    }
    return (
        <div>
            {stock === 0 ?(
               <button className="rounded-lg bg-gray-500 text-white px-4 py-2">在庫なし</button> 
            ):(
                <button onClick={handleBorrows} className="hover:bg-gray-500 hover:text-white transition px-4 py-2 rounded-lg">借りる</button>
            )}
        </div>
    )
}