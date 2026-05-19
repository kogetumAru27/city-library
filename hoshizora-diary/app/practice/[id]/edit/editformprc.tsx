"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
export default function UpdateImgprc({currentImageUrl}:{currentImageUrl:string}){
    const [UpdateImg,setUpdateImg] = useState(currentImageUrl);
    return(
        <div>
            <input type="hidden" name="imageUrl" value={UpdateImg} />
            {currentImageUrl && <img src={currentImageUrl} width={300} height={300} alt="現在の画像"></img>}
            <CldUploadWidget uploadPreset="ml_default"
            onSuccess={(result) => {
                const info = result.info as {secure_url:string}
                setUpdateImg(info.secure_url);
            }}
            >{({open}) => {<button type="button" onClick={() => open()}>画像変更アップロード</button>}}</CldUploadWidget>
        </div>
    )
}
