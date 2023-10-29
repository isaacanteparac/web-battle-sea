
import "./main.css";
import Layout from "./components/Layout_";
import { useEffect, useState } from "react";

function App() {
  const [showWait, setShowWait] = useState(true)

  return (
    <div className="App">
      <Layout msg="en espera..."/>
      {showWait ? (<label className="textWait">{"Buscado jugador...."}</label>) : null}
    </div>
  );
}

export default App;
