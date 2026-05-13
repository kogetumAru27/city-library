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
        <div>
        <Link href="/posts/new">
            <button>新しく投稿する</button>
        </Link>
        {posts.map(post => (
            <Link href={`/posts/${post.id}`} key={post.id}>
           <div>
            <p>{post.location}</p>
            <p>{starTypeLabels[post.starType]}</p>
            <p>{post.caption}</p>
            <PostImage src={post.imageUrl} alt={post.location}/>
           </div> 
           </Link>
        ))}
        </div>
    )
}