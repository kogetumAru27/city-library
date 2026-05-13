"use client";
import { useState } from "react";
const diaryEntries = [
    { id: 1, title: "オリオン座が綺麗だった", type: "観測" },
    { id: 2, title: "新しい望遠鏡を買った", type: "機材" },
    { id: 3, title: "北極星の見つけ方", type: "学習" },
    { id: 4, title: "冬の大三角を撮影", type: "観測" },
  ];
export function Star(){
    const [tab,settab] = useState("全て");
    const filtered = tab === "全て"?diaryEntries:diaryEntries.filter(di => di.type === tab);
    return(
        <div>
        <button onClick={() => settab("全て")}>全て</button>
        <button onClick={() => settab("機材")}>機材</button>
        <button onClick={() => settab("観測")}>観測</button>
        <button onClick={() => settab("学習")}>学習</button>
        {filtered.map(fil => (
            <div key={fil.id}>
                <p>{fil.title}</p>
            </div>
        ))}
        </div>
    ) 

}

const todos = [
    { id: 1, task: "買い物", status: "未完了" },
    { id: 2, task: "掃除", status: "完了" },
    { id: 3, task: "勉強", status: "完了" },
  ];
export function Test5(){
    const [todo,setodo] = useState("全て");
    const filtered = todo === "全て"?todos:todos.filter(to => to.status === todo);
    const Buttons = [{label:"全て",value:"全て"},{label:"未完了",value:"未完了"},{label:"完了",value:"完了"}]
    return(
        <div>
        {Buttons.map(bu => (
            <button key={bu.value} onClick={() => setodo(bu.value)}>
            {bu.label} {/* ここで表示用テキストを出す */}
          </button>
        ))}
        {filtered.map(fil => (
            <div key={fil.id}>
                <p>{fil.task}</p>
            </div>
        ))}
        </div>
    )
}
const houses = [
    { id: 1, name: "山の見える家", area: "rural" },
    { id: 2, name: "駅近マンション", area: "urban" },
    { id: 3, name: "川沿いの平屋", area: "rural" },
  ];
  export function Test6(){
    const [address,setaddress] = useState("all");
    const filtered2 = address === "all"?houses:houses.filter(fil => fil.area === address);
    const buttons = [
        {label2:"全エリア",value2:"all"},
        {label2:"田舎",value2:"rural"},
        {label2:"都会",value2:"urban"}
    ];
    return(
        <div>
        {buttons.map(but => (
            <button key={but.value2} onClick={() => setaddress(but.value2)}>{but.label2}</button>
        ))}
        {filtered2.map(f2 => (
            <div key={f2.id}>
                <p>{f2.name}</p>
            </div>
        ))}
        </div>
    )
  }