"use client";
import { Delete } from "./actionsprc";
export default function Deletebutton({id}:{id:string}){
    return(
        <>
        <button onClick={() => Delete(id)}>削除</button>
        </>
    )
}