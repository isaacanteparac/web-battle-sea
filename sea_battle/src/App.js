
import "./main.css";
import MyLayout from "./components/MyLayout_";
import EnemyLayout from "./components/EnemyLayout";
import { useDispatch, useSelector } from "react-redux";
import { setShowTextWait, setMyLayout, setEnemyLayout } from './redux/systemSlice';
import { io } from "socket.io-client";
import { thunks_ } from "./redux/thunks_";
import { useEffect, useState } from "react";
var count = 0

function App() {
  const system = useSelector((state) => state.system);
  const user = useSelector((state) => state.user)
  const [listenAndEmit, setListenAndEmit] = useState(true)
  const dispatch = useDispatch()
  /*TODO: CON RESPECTO AL SOCKECT HAY QUE CREAR UN PATRON DE DISEÑO SINGLETON, PARA ENVITAR 
  ENVIAR EL SOCKECT POR MEDIO DE LOS PROPS, ESTO COMPLIA SU CONTROL YA QUE SE HEREDA DE COMPONENTE EN COMPONENTE */
  const socket = io(process.env.REACT_APP_API_URL)

  useEffect(() => {
    if (listenAndEmit && user.idRoom === "") {
      socket.emit("data user", user.idUser);
      socket.on("data user", (data) => {
        if (system.showTextWait && data["inGame"] && count === 0) {
          dispatch(thunks_.searchRooms(data, user, data["idUser"]))
          setTimeout(() => {
            dispatch(setShowTextWait(false));
            dispatch(setMyLayout(false));
            dispatch(setEnemyLayout(true));
            setListenAndEmit(false);
          }, 2000);
          return () => {
            socket.off("data user");
          };
        }
      });
    } else {
      return () => {
        socket.off("data user");
      };
    }

  }, [dispatch, listenAndEmit, socket, system.showTextWait, user, user.idUser]);

  return (
    <div className="App">
      {system.showMyLayout ? (<MyLayout socket={socket}/>) : null}
      {system.showTextWait ? (<label className="textWait textblink">{"Buscado jugador...."}</label>) : null}
      {system.showEnemyLayout ? (<EnemyLayout socket={socket}/>) : null}
    </div>
  );
}

export default App;
