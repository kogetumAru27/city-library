"use client";
import { useState } from "react";
export default function Counter(){
    const [count,setCount] = useState(0);
    return(
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(c => c + 1)}>+</button>
            <button onClick={() => setCount(c => c - 1)}>-</button>
            <button onClick={() => setCount(0)}>リセット</button>
        </div>
    )
}
 export function Text(){
    const [text,setText] = useState("");
    return(
        <div>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="好きな言葉"/>
        <p>{text}</p>
        </div>
    )
 }
 export function ColorBox(){
    const [color,setColor] = useState("red");
     function handlecolor(){
        setColor(color === "red"?"blue":color === "blue"?"green":"red");
     }

    return(
        <div> 
            <div style={{ backgroundColor: color, width: 100, height: 100 }} />
            <button onClick={handlecolor}>色を変える</button>
        </div>
    )
 }
 export function Complete(){
    const [comp,setComp] = useState(false);
    return(
        <>
        <button onClick={() => setComp(!comp)} className="bg-blue-500 text-white rounded-lg px-4 py-3 hover:bg-blue-700">押してください</button>
        {comp&& <p>表示</p>}
        {!comp && <p>非表示</p>}
        </>
    )
 }