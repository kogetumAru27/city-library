"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
export default function UpdateImg({ currentImageUrl }: { currentImageUrl: string }){
    const [UpdateImg,setUpdateImg] = useState(currentImageUrl);
    return(
        <div>
        <input type="hidden" name="imageUrl" value={UpdateImg}/>
        {currentImageUrl && <img src={currentImageUrl} width={200} height={200} alt="現在の画像" />}
        <CldUploadWidget uploadPreset="ml_default"
        onSuccess={(result) => {
            const info = result.info as {secure_url:string}
            setUpdateImg(info.secure_url)
        }}
        >{({open}) => <button type="button" onClick={() => open()} className="w-full border border-white py-3 rounded-full hover:bg-white hover:text-black transition">画像を変更アップロード</button>}</CldUploadWidget>
        </div>
    )
}