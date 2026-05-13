"use client";
import { useState } from "react";
import Test from "./prc";
export default function Practice(){
    const [model,setModel] = useState(false);
    return(
        <>
        <p>モーダルです</p>
        <button onClick={() => setModel(true)}>開く</button>
        {model && (
    <div style={{     
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)"
                }}>
        <div style={{    
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                backgroundColor: "white",
                padding: "20px"}}>
            <p>モーダルの中身</p>
            <button onClick={() => setModel(false)}>閉じる</button>
        </div>
    </div>
)}
<Test/>
        </>
    )
}