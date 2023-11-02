
import "./main.css";
import MyLayout from "./components/MyLayout_";
import EnemyLayout from "./components/EnemyLayout";
import { useDispatch, useSelector } from "react-redux";
import { setShowTextWait, setMyLayout, setEnemyLayout } from './redux/systemSlice';
import { io } from "socket.io-client";
import { thunks_ } from "./redux/thunks_";
import { changeIdUser } from "./redux/userSlice";
var count = 0

function App() {
  const system = useSelector((state) => state.system);
  const dispatch = useDispatch()
  const socket = io(process.env.REACT_APP_API_URL)
  const user = useSelector((state) => state.user)


  socket.on("data user", async (data) => {
    if (system.showTextWait) {
      if (data["inGame"]) {
        if (count == 0) {
          dispatch(thunks_.searchRooms(data, user, data["idUser"]))
          setTimeout(() => {
            dispatch(setShowTextWait(false));
            dispatch(setMyLayout(false));
            dispatch(setEnemyLayout(true));
          }, 2500);
          count = 1
        }
      }
    }

  })

  socket.emit("data user", user.idUser)

  return (
    <div className="App">
      {system.showMyLayout ? (<MyLayout />) : null}
      {system.showTextWait ? (<label className="textWait textblink">{"Buscado jugador...."}</label>) : null}
      {system.showEnemyLayout ? (<EnemyLayout />) : null}
    </div>
  );
}

export default App;
