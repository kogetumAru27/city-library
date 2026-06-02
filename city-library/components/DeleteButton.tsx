"use client";
import { useRouter } from "next/navigation";
import { deleteBook } from "@/app/actions/deleteBook";
export default function DeleteButton({bookId}:{bookId:string}){
    const router = useRouter();
    async function handleDelete(){
        const colect = window.confirm("本当に削除しますか？");
        if(!colect)return
         await deleteBook(bookId);
        router.refresh();
    }
    return(
        <div className="p-8">
            <button onClick={handleDelete} className="px-4 py-2 hover:bg-black hover:text-white transition rounded-lg text-black">削除</button>
        </div>
    )
}