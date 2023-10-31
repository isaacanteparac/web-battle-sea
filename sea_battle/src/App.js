
import "./main.css";
import MyLayout from "./components/MyLayout_";
import EnemyLayout from "./components/EnemyLayout";
import { useDispatch, useSelector } from "react-redux";
import { changeInGame, changeIdRoom, changeIdNicknameEnemy, changeIdUser } from './redux/userSlice';
import { setShowTextWait, setMyLayout, setEnemyLayout } from './redux/systemSlice';

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { fetch_ } from "./util/fetch";



function App() {
  const system = useSelector((state) => state.system);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const socket = io(process.env.REACT_APP_API_URL)
  const [count, setCount] = useState(0)

  socket.on("data user", async (data) => {
    if (data["inGame"]) {
      if (count == 0) {
        const searchRoom = await fetch_("room/" + data["idRoom"])
        dispatch(changeIdNicknameEnemy(searchRoom["player2"]))
        setTimeout(() => {
          dispatch(setShowTextWait(false));
          dispatch(setMyLayout(false));
          dispatch(setEnemyLayout(true));
        }, 1000);

        setCount(1)
      }

      dispatch(changeInGame(true));
      dispatch(changeIdRoom(data["idRoom"]));


    }
  })

  useEffect(() => {
    socket.emit("data user", user.idUser)
  })
  //usar el socket para que se pueda cambiar los estados cuando ya se haiga añadido a un room

  return (
    <div className="App">
      {system.showMyLayout ? (<MyLayout />) : null}
      {system.showTextWait ? (<label className="textWait textblink">{"Buscado jugador...."}</label>) : null}
      {system.showEnemyLayout ? (<EnemyLayout />) : null}
    </div>
  );
}

export default App;
