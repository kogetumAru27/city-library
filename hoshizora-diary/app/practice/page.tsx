import { prisma }from"@/lib/prisma";
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
export default async function PrcPosts(){
    const posts =  await prisma.post.findMany();
    return(
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <p>{post.location}</p>
                    <p>{starTypeLabels[post.starType]}</p>
                    <p>{post.caption}</p>
                    <PrcPostImg src={post.imageUrl} alt = {post.location}/>
                </div>
            ))}
        </div>

    )
}