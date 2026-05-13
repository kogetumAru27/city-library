"use client";
import { useState,useEffect} from "react";
export default function COunt(){
    const [time,settimer] = useState(60);
    const [start,setstart] = useState(false)
    useEffect(() => {
            if(!start) return;
            if(time <= 0)return
            const interval = setInterval(() => settimer(c => c-1),1000)
            return () => clearInterval(interval);},[start,time])

    return(
        <div>
            <button onClick={() => setstart(true)}>start</button>
            <button onClick={() => {settimer(60);setstart(false)}}>リセット</button>
            {time}
        </div>

    )

}