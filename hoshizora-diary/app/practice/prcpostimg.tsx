"use client"
import { CldImage } from "next-cloudinary";
export default function PrcPostImg({src,alt}:{src: string, alt: string}){
    return(
        <CldImage 
        src={src}
        width={300}
        height={300}
        alt={alt}
        />
    )
}