import { prisma }from"@/lib/prisma";
import PrcPostImg from "../prcpostimg";
import Deletebutton from "@/app/posts/DeleteButton";
import Link from "next/link";
Link
export default async function DetailPost({params}:{params:Promise<{id:string}>}){
    const {id} = await params
    const posts = await prisma.post.findUnique({
        where: {id}
    });
    return(
        <div>
        <p>{posts?.location}</p>
        <p>{posts?.caption}</p>
        <p>{posts?.starType}</p>
        <p>{posts?.imageUrl && (<PrcPostImg src={posts.imageUrl} alt={posts.caption}></PrcPostImg>)}</p>
        <Deletebutton id={id}/>
        <Link href={`/practice/${id}/edit`}>編集</Link>
        </div>
        
    )
}