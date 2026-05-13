"use client";
import { useSession,signIn,signOut } from "next-auth/react";
export default function PrcButton(){
    const {data:session} = useSession();
    if(session){
        return(
            <div>
                <p>{session.user?.name}</p>
                <button onClick={() => signOut({callbackUrl:"/"})}>ログアウト</button>
            </div>
        )
    }
    return(
        <>
        <button onClick={() => signIn("google")}>googleでログイン</button>
        <button onClick={() => signIn("github")}>GitHubでログイン</button>
        </>
    )
}