"use client";
import { useState} from "react";
export default function Colors(){
    const [colors,setColors] = useState("#ffffff");
    function handlecolor(){
        return "#"+Math.floor(Math.random() * 16777215).toString(16).padStart(6,"0");
    }
    return(
        <div style={{background:colors}}>
            <p>{colors}</p>
            <button onClick={() => setColors(handlecolor())}>押してください</button>
        </div>
    )
}