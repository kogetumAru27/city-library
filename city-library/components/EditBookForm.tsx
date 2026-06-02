"use client";
import UpdateBook from "@/app/actions/updateBook";
import { BookType } from "@/app/generated/prisma/client";
import { useReducer } from "react";
import { useFormState } from "react-dom";
type Book = {
    id: string
    title: string
    author: string | null
    type: BookType
    stock: number
}
type State = {
    title: string
    author: string
    stock: string
    type: BookType
}
 type Action = {type:"settitle",payload:string} | {type:"setauthor",payload:string} | {type:"setstock",payload:string} | {type:"settype",payload:BookType}
function redcur(state:State,action:Action){
    switch(action.type){
        case "settitle":
            return {...state,title:action.payload};
        case "setauthor":
            return {...state,author:action.payload};
        case "settype":
            return {...state,type:action.payload};
        case "setstock":
            return {...state,stock:action.payload};
        default :
            return state;
    }
} 
export default function EditBookForm({book}:{book:Book}){
    const initialState = {
        title: book.title,
        author: book.author ?? "",
        stock: String(book.stock),
        type: book.type as BookType
    }
    const [state,dispatch] = useReducer(redcur,initialState);
    const [formstate,formAction] = useFormState(UpdateBook,{error:""})
    return(
        <form action={formAction}>
            <input type="hidden" name="bookId" value={book.id} />
            <input type="text" name="title" value={state.title} placeholder="本のタイトル" onChange={(e) => dispatch({type:"settitle",payload:e.target.value})} 
            className="shadow-md px-4 py-2 rounded-lg text-black w-full mb-2"/>
            <input type="text" name="author" value={state.author} placeholder="著者" onChange={(e) => dispatch({type:"setauthor",payload:e.target.value})} 
            className="shadow-md px-4 py-2 rounded-lg w-full text-black mb-2"/>
            <select name="type" value={state.type} onChange={(e) => dispatch({type:"settype",payload:e.target.value as BookType})} className="w-full bg-gray-800 px-4 py-2 rounded-xl mb-2 text-white">
            <option value="NOVEL">小説</option>
            <option value="LITERATURE">文学</option>
            <option value="ESSAY">エッセイ</option>
            <option value="SCIENCE">科学</option>
            <option value="HISTORY">歴史</option>
            <option value="MANGA">漫画</option>
            <option value="ACADEMIC">学術書</option>
            <option value="OTHERS">その他</option>
            </select>
            <input type="number" name="stock" value={state.stock} min={0} onChange={(e) => dispatch({type:"setstock",payload:e.target.value})} className="w-full bg-gray-800 text-white px-4 py-2 rounded-xl mb-4"/>
            {formstate.error && <p className="font-bold text-red-500">{formstate.error}</p>}
            <button type="submit" className="rounded-full border border-gray-800 hover:bg-gray-800 hover:text-white transition px-4 py-2">変更</button>
        </form>
    )
}