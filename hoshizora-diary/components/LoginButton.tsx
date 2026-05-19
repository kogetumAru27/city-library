"use client";
import { useSession,signIn,signOut } from "next-auth/react";
export default function LoginButton(){
    const {data:session} =useSession();
    if(session){
        return(
            <div className="flex flex-col items-center mt-8">
                <p className="text-white mb-4">{session.user?.name}</p>
                <button className="border border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition" onClick={() => signOut({callbackUrl:"/"})}>ログアウト</button>
            </div>
        )
    }
    return(
        <div className="flex justify-center mt-8">
        <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition" onClick={() => signIn("google")}>googleでログイン</button>
        </div>
    )
}