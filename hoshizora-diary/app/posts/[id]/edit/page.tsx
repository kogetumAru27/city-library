import { prisma }from"@/lib/prisma";
import { Update } from "../../actions";
import UpdateImg from "./EditForm";
export default async function EditPage({params}:{params:Promise<{id:string}>}){
    const {id} = await params;
    const edit = await prisma.post.findUnique({
        where:{id}
    });
    return(
        <form action={Update} className="min-h-screen bg-gray-950 text-white p-4">
           <input name="location" defaultValue={edit?.location ?? ""} placeholder="観測値" className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl mb-4"/>
           <input type="hidden" name="id" value={id} />
           <select name="starType" defaultValue={edit?.starType ??""} className="w-full bg-gray-800 px-4 py-3 rounded-xl mb-4">
                    <option value="CONSTELLATION">星座</option>
                    <option value="METEOR_SHOWER">流星群</option>
                    <option value="MOON">月</option>
                    <option value="PLANET">惑星</option>
                    <option value="MILKY_WAY">天の川</option>
                    <option value="NEBULA">星雲</option>
                    <option value="OTHER">その他</option>
            </select>
           <textarea name="caption" defaultValue={edit?.caption ?? ""} placeholder="コメント" className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl mb-4"/>
            <UpdateImg currentImageUrl={edit?.imageUrl ?? ""}/>
           <button type="submit" className="w-full bg-yellow-300 text-gray-900 font-bold py-3 rounded-full hover:bg-yellow-400 transition">変更</button>
        </form>
    )
} 