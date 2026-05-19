import { prisma } from "@/lib/prisma";
import Link from "next/link";
import PrcPostImg from "./prcpostimg";
const starTypeLabels = {
    CONSTELLATION: "星座",
    METEOR_SHOWER: "流星群",
    MOON: "月",
    PLANET: "惑星",
    MILKY_WAY: "天の川",
    NEBULA: "星雲",
    OTHER: "その他",
}
export default async function Allposts(){
    const posts = await prisma.post.findMany();
    return(
        <div>
        <Link href={"/practice/prc"}>新規投稿</Link>
        {posts.map(post => (
            <Link href={`/practice/${post.id}`} key={post.id}>
            <div>
            <p>{post.caption}</p>
            <p>{post.location}</p>
            <p>{starTypeLabels[post.starType]}</p>
            {post.imageUrl&&(<PrcPostImg src={post.imageUrl} alt={post.location}></PrcPostImg>)}
            </div>
            </Link>
        ))}
        </div>
        
    )
}