"use client";
import { useRouter } from "next/navigation";
import deleteBooks from "@/app/actions/practice/Prcdelete";
export default function DeleteButton({bookId}:{bookId:string}){
    const router = useRouter();
    async function handleDelete() {
        const comp = window.confirm("本当に削除しますか？");
        if(!comp) return;
        await deleteBooks(bookId);
        router.refresh();
    }
    return(
        <div>
            <button onClick={handleDelete} className="border border-black rounded-full px-4 py-2 hover:bg-black hover:text-white transition cursor-pointer">削除</button>
        </div>
    )
}
