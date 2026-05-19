"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import Prcdata from "../actionsprc";
export default function Prcposts(){
    const [imageUrl,setImageUrl] = useState("");
    return(
        <form action={Prcdata}>
            <input name="location" placeholder="観測地" />
            <select name="starType">
                <option value="CONSTELLATION">星座</option>
                <option value="METEOR_SHOWER">流星群</option>
                <option value="MOON">月</option>
                <option value="PLANET">惑星</option>
                <option value="MILKY_WAY">天の川</option>
                <option value="NEBULA">星雲</option>
                <option value="OTHER">その他</option>
            </select>
            <textarea name="caption" placeholder="コメント"></textarea>
            <input type="hidden" name="imageUrl" value={imageUrl}/>
            <CldUploadWidget 
            onSuccess={(result) => {
                const info = result.info as {secure_url:string}
                setImageUrl(info.secure_url);
            }}
            >{({open}) => (
                <button type="button" onClick={() => open()}>画像をアップロード</button>
            )}</CldUploadWidget>
            <button type="submit">投稿</button>

        </form>

    )
}