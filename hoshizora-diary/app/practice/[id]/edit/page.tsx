import { prisma }from"@/lib/prisma";
import UpdateImgprc from "./editformprc";
import { Updateprc } from "../../actionsprc";
export default async function PrcEdit({params}:{params:Promise<{id:string}>}){
    const {id} = await params;
    const edit = await prisma.post.findUnique({
        where:{id}
    });
    return(
        <form action={Updateprc}>
            <input name="location" defaultValue={edit?.location ?? ""} />
            <input type="hidden" name="id" value={id}/>
            <textarea name="caption" defaultValue={edit?.caption ?? ""}></textarea>
            <select name="starType" defaultValue={edit?.starType ??""}>
                    <option value="CONSTELLATION">星座</option>
                    <option value="METEOR_SHOWER">流星群</option>
                    <option value="MOON">月</option>
                    <option value="PLANET">惑星</option>
                    <option value="MILKY_WAY">天の川</option>
                    <option value="NEBULA">星雲</option>
                    <option value="OTHER">その他</option>
            </select>
            <UpdateImgprc currentImageUrl={edit?.imageUrl ?? ""}/>
            <button type="submit">変更</button>
        </form>
    )
}