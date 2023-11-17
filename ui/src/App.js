
import "./main.css";
import MyLayout from "./components/MyLayout_";
import EnemyLayout from "./components/EnemyLayout";
import { useDispatch, useSelector } from "react-redux";
import { setShowTextWait, setMyLayout, setEnemyLayout } from './redux/systemSlice';
import { thunks_ } from "./redux/thunks_";
import { useEffect, useState } from "react";
import Singleton from "./redux/Singleton";

function App() {
  const system = useSelector((state) => state.system);
  const user = useSelector((state) => state.user)
  const [listenAndEmit, setListenAndEmit] = useState(true)
  const dispatch = useDispatch()
  const singleton = new Singleton()
  const socket = singleton.getSocket()

  useEffect(() => {
    if (listenAndEmit && user.idRoom === "") {
      socket.emit("user_data", user.idUser);
      socket.on("user_data", (data) => {
        if (system.showTextWait && data["inGame"]) {
          dispatch(thunks_.searchRooms(data, user))
          setTimeout(() => {
            dispatch(setShowTextWait(false));
            dispatch(setMyLayout(false));
            dispatch(setEnemyLayout(true));
            setListenAndEmit(false);
          }, 2000);
          return () => {
            socket.off("user_data");
          };
        }
      });
    } else {
      return () => {
        socket.off("user_data");
      };
    }

  }, [dispatch, listenAndEmit, socket, system.showTextWait, user, user.idUser]);

  return (
    <div className="App">
      {system.showMyLayout ? (<MyLayout />) : null}
      {system.showTextWait ? (<h2 className="textWait textblink">{"Buscado jugador...."}</h2>) : null}
      {system.showEnemyLayout ? (<EnemyLayout />) : null}
    </div>
  );
}

export default App;
