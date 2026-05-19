import {prisma} from"@/lib/prisma";
import DeleteButton from "../DeleteButton";
import PostImage from "../Postimage";
import Link from "next/link";
export default async function PostDetailPage({params}:{params:Promise<{id:string}>}){
    const {id} = await params;
    const post = await prisma.post.findUnique({
        where:{id}
    });
    console.log(post)
    console.log(id)
    return(
        <div className="min-h-screen bg-gray-950 text-white p-4 pb-20">
            <div className="bg-gray-800 rounded-2xl p-6">
        <p className="text-yellow-300 font-bold text-xl mt-4">{post?.location}</p>
        <p className="text-gray-400 text-sm mt-1">{post?.caption}</p>
        {post?.imageUrl && (<PostImage src={post.imageUrl} alt={post.location ?? ""}></PostImage>)}
        <div className="flex gap-4 mt-6">
        <DeleteButton id={id}/>
        <Link href={`/posts/${id}/edit`} className="border border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition">編集</Link>
        </div>
        </div>
        </div>
    )
}