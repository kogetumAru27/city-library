"use client";

import { useEffect, useState } from "react";

type Props = {
    id:number,
    name:string,
    age:number
}
type UserData = {
    id:number,
    name:string
}
export default function Test3(){
    const users:Props[] = [
        { id: 1, name: "田中", age: 25 },
        { id: 2, name: "鈴木", age: 30 },
        { id: 3, name: "佐藤", age: 22 },
      ];
      return(
        <>
        {users.map(user => (
            <Child key={user.id} id={user.id}name={user.name} age={user.age}/>
        ))}
        </>
      )

}
 function Child({id,name,age}:Props){
    return(
       <div>
        <p>{name}</p>
        <p>{age}</p>
       </div>
    )
 }
 function UseFetch(url:string){
    const [data,setdata] = useState<UserData | null>(null);
    const [loading,setloading] = useState(true);
    const [error,seterror] = useState<string | null>(null)
    useEffect(() => {
    fetch(url)
    .then(re => re.json())
    .then(json =>{
        setdata(json)
        setloading(false)
    })
    .catch(err => {
        seterror("エラーが発生しました")
        setloading(false);

    });
    },[]);
    return { data, loading, error } 
 }
 export function Test4(){
    const {data,loading,error} = UseFetch("https://jsonplaceholder.typicode.com/users/1")
    return (
        <div>
            {loading && <p>読み込み中...</p>}
            {error && <p>{error}</p>}
            {data && <p>{data.name}</p>}
        </div>
    )

 }