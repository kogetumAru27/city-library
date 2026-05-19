import { prisma } from "@/lib/prisma";
import Link from "next/link";
import PostImage from "./Postimage";
const starTypeLabels = {
    CONSTELLATION: "星座",
    METEOR_SHOWER: "流星群",
    MOON: "月",
    PLANET: "惑星",
    MILKY_WAY: "天の川",
    NEBULA: "星雲",
    OTHER: "その他",
}
export default async function PostPage(){
    const posts = await prisma.post.findMany();
    return(
        <div className="min-h-screen bg-gray-900 text-white p-4 pb-20">
        <Link href="/posts/new">
            <button className="w-full bg-yellow-300 text-gray-900 font-bold py-3 rounded-full mb-6 hover:bg-yellow-400 transition">＋新しく投稿する</button>
        </Link>
        {posts.map(post => (
            <Link href={`/posts/${post.id}`} key={post.id}>
           <div className="bg-gray-800 rounded-2xl p-4 mb-4 hover:bg-gray-700 transition">
            <p className="text-yellow-300 font-bold m-2">{post.location}</p>
            <p className="text-gray-400 text-sm">{starTypeLabels[post.starType]}</p>
            <p className="text-white mt-1">{post.caption}</p>
            <PostImage src={post.imageUrl} alt={post.location}/>
           </div> 
           </Link>
        ))}
        </div>
    )
}