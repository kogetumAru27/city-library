"use client";
import { signIn,signOut,useSession } from "next-auth/react";
export default function LoginButton(){
    const {data:session} = useSession();
    if(session){
        return(
            <div className="flex flex-col items-center mt-8">
                  <p className="text-white mb-4">{session.user?.name}</p>
                  <button onClick={() =>signOut({callbackUrl:"/"})} className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition">ログアウト</button>  
            </div>
        )
    }
    return(
       <button onClick={() => signIn("google")} className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition">ログイン</button>
    )

}