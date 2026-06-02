"use client";
import Link from "next/link";
import { useEffect, useReducer, useState } from "react";
import { BookType } from "@/app/generated/prisma/client";
import { checkLocation } from "@/app/actions/checkLocation";
type Book =
    {
        id: string
        title: string
        author: string | null
        type: BookType,
        stock: number
        location: string
        createdAt: Date
        latitude: number | null,
        longitude:number | null
    }
    const typeLabel: { [key: string]: string } = {
        NOVEL: "小説",
        SCIENCE: "科学",
        HISTORY: "歴史",
        MANGA: "漫画",
        LITERATURE: "文学",
        ESSAY: "エッセイ",
        ACADEMIC: "論文・学術",
        OTHERS: "その他",
    }
    type FilterType = BookType | "全て";
const initialState = {
    type:"全て" as FilterType,
    search:"",
    sort:"新しい順",
}
type Action = {type:"setsearch",payload:string} | {type:"settype",payload:FilterType} | {type:"setsort",payload:string}
function redcur(state:typeof initialState,action:Action){
    switch(action.type){
        case "setsearch":
            return {...state,search:action.payload};
        case "setsort":
            return {...state,sort:action.payload};
        case "settype":
            return {...state,type:action.payload};
        default:
            return state;
    }

}
function calcDistance(lat1:number,lon1:number,lat2:number,lon2:number){
    const R = 6371;
    const dLat = (lat2-lat1) * Math.PI / 180;
    const dLon = (lon2-lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI /180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
    return R * c
}
export function Bookfilter({books}:{books:Book[]}){
    const [userLocation,setUserLocation] = useState<{lat:number,lon:number} | null> (null);
    const [state,dispatch] = useReducer(redcur,initialState);
    const filtered = books
    .filter(book => {
        const seartchMatch = (book.title.includes(state.search)||book?.author?.includes(state.search) ||typeLabel[book?.type].includes(state.search))
        const TypeMatch = (state.type === "全て" || state.type === book.type)
        const distanceMatch = true;
        return seartchMatch && TypeMatch && distanceMatch;
    })
    .sort((a,b) => state.sort === "新しい順"?new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime():
new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
useEffect(() => {
 const watchId = navigator.geolocation.watchPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude
    setUserLocation({lat,lon});
    checkLocation(lat, lon);
 });
 return () => navigator.geolocation.clearWatch(watchId);
},[]);

return(
    <div className="p-8">
        <input type="text" value={state.search} onChange={(e) => dispatch({type:"setsearch",payload:e.target.value})} placeholder="検索" 
        className="w-full border border-black rounded-lg px-4 py-2 mb-2"/>
        <select value={state.sort} onChange={(e) => dispatch({type:"setsort",payload:e.target.value})}>
            <option>新しい順</option>
            <option>古い順</option>
        </select>
        <select value={state.type} onChange={(e) => dispatch({type:"settype",payload:e.target.value as BookType})}>
            <option value="全て">全て</option>
            <option value="NOVEL">小説</option>
            <option value="SCIENCE">科学</option>
            <option value="HISTORY">歴史</option>
            <option value="MANGA">漫画</option>
            <option value="LITERATURE">文学</option>
            <option value="ESSAY">エッセイ</option>
            <option value="ACADEMIC">論文・学術</option>
            <option value="OTHERS">その他</option>
        </select>
        {filtered.map(book => (
            <Link href={`/books/${book.id}`} key={book.id} >
            <div className="font-bold">
                <p className="border border-gray  text-black rounded-lg px-4 py-2 mb-2">{book.title}</p>
                <p className="border border-gray  text-black rounded-lg px-4 py-2 mb-2">{book.author}</p>
                <p className="border border-gray  text-black rounded-lg px-4 py-2 mb-2">{typeLabel[book.type] || book.type}</p>
                <p className={book.stock <=3?"text-red-300 font-bold":"text-green-500"}>在庫:{book.stock}</p>
            </div>
            </Link>
        ))}
        {filtered.length === 0 && <p className="font-bold text-black">見つかりませんでした</p>}
    </div>
)

}