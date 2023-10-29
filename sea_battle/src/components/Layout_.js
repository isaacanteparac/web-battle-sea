import React, {useState } from 'react';
import { fetch_ } from '../util/fetch';
import { io } from "socket.io-client";
import ShipSize from './ShipSize';
import Board from './Board';

function Layout(props) {
    const [boatSizeData, setboatSizeData] = useState();
    const [matrixData, setMatrixData] = useState()
    const [nickname, setNickname] = useState("")
    const [title, setTitle] = useState("Mi tablero")
    const [showBoard, setShowBoard] = useState(false)

    const serverPort = process.env.REACT_APP_API_URL
    const socket = io(serverPort);

    const send = () => {
        if (nickname != "") {

            if (Object.keys(loadPlayer).length === 0) {
                socket.emit("nickname", nickname);
            }
            setNickname("")
            loadDataMatrix()
            setTitle(`Tablero de "${nickname}"`)
            setShowBoard(true)
            loadboatSizeData()
        }
    }

    const loadPlayer = async () => {
        const d = await fetch_("player/" + nickname)
        return d
    }

    const loadDataMatrix = async () => {
        const d = await fetch_("player/matrix/" + nickname)
        setMatrixData(d)
    }

    const loadboatSizeData = async () => {
        let d = await fetch_("ship")
        setboatSizeData(Object.values(d))
    }

    return (<div className='layout'>
        {showBoard ? (<div className='divColumn'>
            <h2 className='title'>{title}</h2>
            <div className='boardContainer'>
                <Board json={matrixData} />
            </div>
        </div>) : null}

        <div className='startInformation'>
            {!showBoard ? (<div className='input'>
                <input placeholder="nickname" type='text' value={nickname} onChange={(e) => setNickname(e.target.value)} />
                <button onClick={() => send()}>{">"}</button>
            </div>) : null}

            {showBoard ? (boatSizeData?.map((ship) => (
                <ShipSize key={ship.name} name={ship.displayName} nSize={ship.size} color={ship.color} amount={ship.amount} />
            ))) : null}
        </div>
    </div>);
}

export default Layout;