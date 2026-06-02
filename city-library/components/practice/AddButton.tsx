"use client";
import { useReducer } from "react";
import { useFormState } from "react-dom";
import { BookType } from "@/app/generated/prisma/client";
import addBook from "@/app/actions/practice/AddBook";
const initialState = {
    title:"",
    author:"",
    type:"NOVEL" as BookType,
    stock:""
}
type Action = {type:"settitle",payload:string} | {type:"setauthor",payload:string} | {type:"settype",payload:BookType} | {type:"setstock",payload:string}
function redcur(state:typeof initialState,action:Action){
    switch(action.type){
        case "settitle":
            return {...state,title:action.payload}
        case "setauthor":
            return {...state,author:action.payload}
        case "setstock":
            return {...state,stock:action.payload}
        case "settype":
            return {...state,type:action.payload}
        default:
            return state;  
    }
}
export default function AddBooks(){
    const [state,dispatch] = useReducer(redcur,initialState);
    const [formstate,formAction] = useFormState(addBook,{error:""})
    return(
        <form action={formAction}>
            <input type="text" value={state.title} placeholder="タイトル" onChange={(e) => dispatch({type:"settitle",payload:e.target.value})} 
            className="shadow-md text-black px-4 py-2 mb-2 rounded-lg w-full"/>
            <input type="text" value={state.author} placeholder="著者" onChange={(e) => dispatch({type:"setauthor",payload:e.target.value})} 
            className="shadow-md text-black px-4 py-2 mb-2 rounded-lg w-full"/>
            <input type="text" value={state.stock} placeholder="在庫数" onChange={(e) => dispatch({type:"setstock",payload:e.target.value})} 
            className="shadow-md text-black px-4 py-2 mb-2 rounded-lg w-full"/>
            <select value={state.type} onChange={(e) => dispatch({type:"settype",payload:e.target.value as BookType})} className="w-full bg-gray-800 px-4 py-2 rounded-xl mb-2 text-white">
            <option value="NOVEL">小説</option>
            <option value="LITERATURE">文学</option>
            <option value="ESSAY">エッセイ</option>
            <option value="SCIENCE">科学</option>
            <option value="HISTORY">歴史</option>
            <option value="MANGA">漫画</option>
            <option value="ACADEMIC">学術書</option>
            <option value="OTHERS">その他</option>
            </select>
            {formstate.error && <p className="text-red-500">{formstate.error}</p>}
          <button type="submit">追加</button>  
        </form>
    );
}