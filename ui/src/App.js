
import "./main.css";
import Player from "./components/Player";
import { useState } from "react";
import SeePlayers from "./components/SeePlayers";

function App() {
  const [showBtn, setShowBtn] = useState(true)
  const [component, setComponent] = useState()



  return (
    <div className="App">
      {showBtn ? (<div className="menu">
        <button onClick={() => { setShowBtn(false); setComponent(<SeePlayers />) }}>
          Espectador 👀
        </button>
        <button onClick={() => {
          setShowBtn(false); setComponent(<Player />)
        }}>
          Jugar 🕹️
        </button>
      </div>) : null

      }
      {component}

    </div>
  );
}

export default App;
