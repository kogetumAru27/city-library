"use client";
import { useState } from "react";
export default function Test(){
    const [tab,setTab] = useState("profile");
  return(
    <>
    <button style={{ background: tab === "profile" ? "blue" : "white" }} onClick={() => setTab("profile")}>プロフィール</button>
    <button style={{background: tab === "post" ? "green" : "white" }} onClick={() => setTab("post")}>投稿</button>
    <button style={{background: tab === "setting" ? "red" : "white" }} onClick={() => setTab("setting")}>設定</button>
    <div>
    {tab==="profile" && (
        <p>ここはprofileです</p>
    )}
    {tab === "post" && (
        <p>ここは投稿です</p>
    )}
    {tab === "setting" && (
        <p>ここは設定です</p>
    )}
    </div>
    </>
  )
}
export function Test2(){
    const [heart,setheart] = useState(false);
    const [count,setCount] = useState(0);
    function handleheart(){
        setCount(c => heart === false ?  c + 1 : Math.max(0,c-1));//Math.max(a, b) → aとbの大きい方を返す
        setheart(!heart);
    }
    return(
        <>
        <button style={{color:heart ===true?"pink":"white"}} onClick={handleheart}>いいね</button>
        {count}
        </>
    )
}
