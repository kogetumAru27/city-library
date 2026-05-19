import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma }from"@/lib/prisma";
import PostImage from "@/app/posts/Postimage";
const starTypeLabels = {
    CONSTELLATION: "星座",
    METEOR_SHOWER: "流星群",
    MOON: "月",
    PLANET: "惑星",
    MILKY_WAY: "天の川",
    NEBULA: "星雲",
    OTHER: "その他",
}
export default async function Mypage(){
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const posts = await prisma.post.findMany({
        where:{userId: userId}
    });
    return(
        <div className="min-h-screen bg-gray-950 text-white p-4 pb-20">
            {posts.map(post => (
                <div key={post.id} className="bg-gray-800 rounded-2xl p-4 mb-4">
                   <p className="text-yellow-300 font-bold m-2">{post.location}</p>
                   <p className="text-white mt-1">{post.caption}</p>
                    <p className="text-gray-400 text-sm">{starTypeLabels[post.starType]}</p>
                    <PostImage src={post.imageUrl} alt={post.location}/>
                </div>
            ))}
        
        </div>
    )
}