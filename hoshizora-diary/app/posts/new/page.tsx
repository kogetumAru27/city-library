"use client";
import { useState } from "react";
import { createPosts } from "../actions";
import { CldUploadWidget } from "next-cloudinary";
export default function PostPage(){
    const  [imageUrl, setImageUrl] = useState("") 
    return(
        <form action={createPosts}>
            <input name="location" placeholder="観測地"/>
            <select name="starType">
                <option value="CONSTELLATION">星座</option>
                <option value="METEOR_SHOWER">流星群</option>
                <option value="MOON">月</option>
                <option value="PLANET">惑星</option>
                <option value="MILKY_WAY">天の川</option>
                <option value="NEBULA">星雲</option>
                <option value="OTHER">その他</option>
            </select>
            <textarea name="caption" placeholder="コメント"/>
            <input type="hidden" name="imageUrl" value={imageUrl} /> 
            <CldUploadWidget 
                uploadPreset="ml_default"
                onSuccess={(result) => {
                    console.log(result) 
                    const info = result.info as { secure_url: string }
                    setImageUrl(info.secure_url)
                }}>
                {({open}) => (
                    <button type="button" onClick={() => open()}>画像をアップロード</button>
                )}
            </CldUploadWidget>
            <button type="submit">投稿</button>
        </form>
    )
}