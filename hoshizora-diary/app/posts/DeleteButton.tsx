"use client";
import { Delete } from "./actions";
export default function DeleteButton({id}:{id:string}){
    return(
        <button onClick={() => Delete(id)} className="border border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition">削除</button>
    )
}