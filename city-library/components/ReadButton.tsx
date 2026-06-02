"use client";
import { useRouter } from "next/navigation";
import Readnoti from "@/app/actions/readNotification";
export default function ReadButton({notificationId}:{notificationId:string}){
    const router = useRouter();
    async function handleRead(){
        Readnoti(notificationId);
        router.refresh();
    } 
    return(
        <div>
            <button onClick={handleRead} className="border border-black hover:bg-gray-500 hover:text-white transition px-4 py-2 mb-2 rounded-lg">既読</button>
        </div>
    )
}