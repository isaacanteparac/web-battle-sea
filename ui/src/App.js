
import "./main.css";
import Player from "./components/Player";
import { useEffect, useState } from "react";
import SeePlayers from "./components/SeePlayers";
import { fetch_ } from "./util/fetch";
import { useSelector } from "react-redux";


function App() {
  const [showBtn, setShowBtn] = useState(true)
  const [component, setComponent] = useState()
  const user = useSelector((state) => state.user);



  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
      fetch_(`sign-out?idUser=${user.idUser}&idRoom=${user.idRoom}`)
      const message = '¿Estás seguro de que deseas abandonar la página? Se recargará en 5 segundos.';
      alert(message);
  
      setTimeout(() => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        window.location.reload();
      }, 5000);
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user.idUser, user.idRoom]);
  


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
