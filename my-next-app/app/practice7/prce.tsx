"use client";
import { useState} from "react";
export default function PRce(){
    const [search,setSearch] = useState("");
    const fruits = ["りんご","バナナ","ブドウ","みかん","いちご","メロン"];
    const filter = fruits.filter(fruit => fruit.includes(search));
    return(
        <div>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            {filter.map(fil => (
                <div key={fil}>
                    <p>{fil}</p>
                </div>
            ))}
            {filter.length === 0 && <p>見つかりません</p>}
        </div>
    )

}