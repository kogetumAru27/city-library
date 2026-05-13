"use client";
import { useSession } from "next-auth/react";
export default function PrcB(){
    const {data:session,status} = useSession();
    if(status === "authenticated"){
        return(
            <div>
                <p>こんにちは!{session.user?.name}</p>
            </div>
        )
    }else if(status === "unauthenticated"){
        return (
            <p>ゲストさん！ぜひログインを</p>
        )
    }else{
        return(
        <p>読み込み中・・・</p>
        )
    }
}