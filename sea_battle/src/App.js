
import "./main.css";
import Layout from "./components/Layout_";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const system = useSelector((state)=> state.system)

  //usar el socket para que se pueda cambiar los estados cuando ya se haiga añadido a un room

  return (
    <div className="App">
      <Layout/>
      {system.showTextWait ? (<label className="textWait textblink">{"Buscado jugador...."}</label>) : null}
    </div>
  );
}

export default App;
