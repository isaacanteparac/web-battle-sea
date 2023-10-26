import React, { useState } from 'react';

function Input_() {

    const url = "kasd"
    const [nickname, setNickname] = useState("");

    const send = () => {
        console.log(" se genera automaticamente los barcos - " + nickname);
    }

    return (<div className='input'>

        <input placeholder="nickname" type='text' value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <button onClick={() => send()}>{">"}</button>
    </div>);
}

export default Input_;