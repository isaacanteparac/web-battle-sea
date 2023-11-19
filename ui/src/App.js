
import "./main.css";
import Player from "./components/Player";
import { useState } from "react";
import SeePlayers from "./components/SeePlayers";

function App() {
  const [showPlayer, setShowPlayer] = useState(false)
  const [showSeePlayers, setSeePlayers] = useState(false)
  const [showBtn, setShowBtn] = useState(true)

  return (
    <div className="App">
      {showBtn ? (<div className="menu">
      <button onClick={() => { setSeePlayers(true); setShowBtn(false) }}>
          Ver jugadores
        </button>
        <button onClick={() => { setShowPlayer(true); setShowBtn(false) }}>
          Jugar
        </button>
      </div>) : null

      }
      {showPlayer ? <Player /> : null}
      {showSeePlayers ? <SeePlayers /> : null}

    </div>
  );
}

export default App;
