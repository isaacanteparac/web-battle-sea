import React, { useState } from 'react';

import { io } from "socket.io-client";
import { fetch_ } from '../util/fetch';

function Input_() {

    const [nickname, setNickname] = useState("")
    const serverPort = process.env.REACT_APP_API_URL
    const socket = io(serverPort);

    const send = () => {
        if (nickname != "") {
            socket.emit("nickname", nickname);
            setNickname("")
            loadDataMatrix()

        }

    }


    const [matrixData, setMatrixData] = useState()

    console.log(matrixData)

    const loadDataMatrix = async () => {
        const d = await fetch_("matrix/" + nickname)
        setMatrixData(d)
    }

    return (<div className='input'>
        <input placeholder="nickname" type='text' value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <button onClick={() => send()}>{">"}</button>
    </div>);
}

export default Input_;