"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function Navigation(){
    const pathname = usePathname();
    return(
        <nav className="fixed bottom-0 w-full bg-gray-900 flex justify-around py-4 border-t border-gray-700">
                  <Link href="/" className={pathname === "/" ?"text-yellow-300 flex flex-col items-center":"text-gray-500 flex flex-col items-center"}>
                  <span>🏠</span>
                  <span className="text-xs">ホーム</span>
                  </Link>
                  <Link href="/posts" className={pathname === "/posts" ? "text-yellow-300 flex flex-col items-center" : "text-gray-500 flex flex-col items-center"}>
                  <span>💫</span>
                  <span className="text-xs">投稿一覧</span>
                  </Link>
                  <Link href="/mypage" className={pathname === "/mypage"?"text-yellow-300 flex flex-col items-center":"text-gray-500 flex flex-col items-center"}>
                  <span>👤</span>
                  <span className="text-xs">マイページ</span>
                  </Link>
        </nav>
    )
}