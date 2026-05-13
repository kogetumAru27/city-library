import {prisma} from"@/lib/prisma";
import PostImage from "../Postimage";
export default async function PostDetailPage({params}:{params:Promise<{id:string}>}){
    const {id} = await params;
    const post = await prisma.post.findUnique({
        where:{id}
    });
    console.log(post)
    console.log(id)
    return(
        <>
        <p>{post?.location}</p>
        <p>{post?.caption}</p>
        <p>{post?.imageUrl && (<PostImage src={post.imageUrl} alt={post.location ?? ""}></PostImage>)}</p>
        </>
    )
}