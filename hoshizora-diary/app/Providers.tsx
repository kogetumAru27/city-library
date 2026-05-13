"use client";
//倉庫に格納する全ページにログイン状態を渡すファイル,usesessionで使う
import { SessionProvider } from "next-auth/react";
export default function Providers({children}:{children:React.ReactNode}){
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}