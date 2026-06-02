import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "町の図書館",
  description: "みんなの図書管理システム",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  const session = await getServerSession(authOptions)
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full">
      <Providers>
      <nav className="flex justify-center gap-4 p-4 bg-gray-100">
            <Link href="/" className="hover:underline">ホーム</Link>
            <Link href="/books" className="hover:underline">本の一覧</Link>
            <Link href="/mypage" className="hover:underline">マイページ</Link>
            {session?.user?.role === "ADMIN" && (
              <>
                <Link href="/admin/books" className="hover:underline">本の管理</Link>
                <Link href="/admin/loans" className="hover:underline">貸出状況</Link>
              </>
            )}
          </nav>
        {children}
      </Providers>
      </body>
      
    </html>
  );
}
