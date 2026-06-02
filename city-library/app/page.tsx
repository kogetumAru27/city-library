import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import LoginButton from "@/components/LoginButton";
export default async function Home(){
  const session = await getServerSession(authOptions);
  return(
    <div className="flex flex-col items-center justify-center min-h-screen text-blue-300 ">
      <h1 className="text-4xl font-bold mb-4">町の図書館</h1>
      <LoginButton />
      {session?(
        <div className="text-center">
          <p>ようこそ,{session.user?.name}さん！</p>
          <Link href="/books">本の在庫を確認する</Link>
        </div>
      ):(
        <p className="text-black">ログインして自分だけの本を見つけよう！</p>
      )}
    </div>
  )
}