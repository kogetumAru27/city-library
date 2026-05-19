import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route"
import Link from "next/link";
import LoginButton from "@/components/LoginButton";
export default async function Home(){
  const session = await getServerSession(authOptions);
  return(
    <div className="flex flex-col items-center justify-center min-h-screen text-blue-300 " style={{backgroundImage:"url('/star.jpg')",backgroundSize:"cover",backgroundPosition:"center"}}>
      <h1 className="text-4xl font-bold mb-4">星空観測日記</h1>
      <p className="text-lg text-blue-200 mb-8">あなたの星空を記録しよう!</p>
      <LoginButton/>
      {session?(
        <div className="text-center">
          <p className="mb-4 text-blue-200">ようこそ,{session.user?.name}さん！</p>
          <Link href="/posts" className="bg-blue-600 px-6 py-3 rounded-full text-yellow-200">観測日記を見る</Link>
          </div>
      ):(
      <p className="text-blue-200">ログインをして観測日記を始めよう</p>
      )}
    </div>
  )
}
