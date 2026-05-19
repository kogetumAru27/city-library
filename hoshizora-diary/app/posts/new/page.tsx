"use client";
import { useState } from "react";
import { createPosts } from "../actions";
import { CldUploadWidget } from "next-cloudinary";
export default function PostPage(){
    const  [imageUrl, setImageUrl] = useState("") 
    return(
        <form action={createPosts} className="min-h-screen bg-gray-950 text-white p-4">
            
            <input name="location" placeholder="観測地" className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl mb-4"/>
            <select name="starType" className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl mb-4">
                <option value="CONSTELLATION">星座</option>
                <option value="METEOR_SHOWER">流星群</option>
                <option value="MOON">月</option>
                <option value="PLANET">惑星</option>
                <option value="MILKY_WAY">天の川</option>
                <option value="NEBULA">星雲</option>
                <option value="OTHER">その他</option>
            </select>
            <textarea name="caption" placeholder="コメント" className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl mb-4"/>
            <input type="hidden" name="imageUrl" value={imageUrl} /> 
            <CldUploadWidget 
                uploadPreset="ml_default"
                onSuccess={(result) => {
                    console.log(result) 
                    const info = result.info as { secure_url: string }
                    setImageUrl(info.secure_url)
                }}>
                {({open}) => (
                    <button type="button" onClick={() => open()} className="w-full border border-white py-3 rounded-full hover:bg-white hover:text-black transition">画像をアップロード</button>
                )}
            </CldUploadWidget>
            <button type="submit" className="w-full bg-yellow-300 text-gray-900 font-bold py-3 rounded-full hover:bg-yellow-400 transition">投稿</button>
        </form>
    )
}