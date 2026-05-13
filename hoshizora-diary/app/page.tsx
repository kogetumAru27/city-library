import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route"
import Link from "next/link";
export default async function Home(){
  const session = await getServerSession(authOptions);
  return(
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4x1 font-bold mb-4">星空観測日記</h1>
      <p className="text-lg text-gray-400 mb-8">あなたの星空を記録しよう!</p>
      {session?(
        <div className="text-center">
          <p className="mb-4">ようこそ,{session.user?.name}さん！</p>
          <Link href="/posts" className="bg-blue-600 px-6 py-3 rounded-full">観測日記を見る</Link>
          </div>
      ):(
      <p className="text-gray-400">ログインをして観測日記を始めよう</p>
      )}
    </div>
  )
}
