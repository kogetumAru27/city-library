import { useState } from "react";
import Weather from "./weatherRea3";
import Todo from "./todo8";
import Constellation from "./Constellation3";
import Stargame from "./star_game4";
function App(){
  const [tab,setTab] = useState("Todo");
  return(
    <>
    <nav>
    <button onClick={() => setTab("Todo")}>Todo</button>
    <button onClick={() => setTab("Stargame")}>星ゲーム</button>
    <button onClick={() => setTab("Constellation")}>星座</button>
    <button onClick={() => setTab("Weather")}>天気</button>
    </nav>
    <div>
      {tab === "Todo" && <Todo/>}
      {tab === "Stargame" && <Stargame/>}
      {tab === "Constellation" && <Constellation/>}
      {tab === "Weather" && <Weather/>}
    </div>
    </>
  )
}
export default App;