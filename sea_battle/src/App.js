import Input_ from './components/Input_';
import ShipSize from './components/ShipSize';
import Board from './components/Board';
import jsonBoard from "./data/board.json";
import { io } from "socket.io-client";
import "./main.css";

function App() {
  const b = jsonBoard
  const serverPort = "http://localhost:6060/";
  const socket = io(serverPort); // Store the socket instance

  return (
    <div className="App">
      <Board json={b} />
      <Input_ />
      <ShipSize name="mini" nSize={1} color="#dc5a10" />
      <ShipSize name="pequeño" nSize={2} color="#ac10dc" />
      <ShipSize name="grande" nSize={3} color="#dcac10" />
      <ShipSize name="gigante" nSize={4} color="#10dcac" />
    </div>
  );
}

export default App;
