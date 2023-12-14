import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunks_ } from '../redux/thunks_';
import Singleton from '../redux/Singleton';

function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [text, setText] = useState("");
    const [bg, setBg] = useState("");
    const [showWinner, setWinner] = useState(false)
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const singleton = new Singleton();
    const socket = singleton.getSocket();
    const waitTime = 4

    useEffect(() => {
        if (!showWinner) {
            let intervalo;
            if (user.yourTurn) {
                setText("Tu turno ")
                setBg("#96f60d")
            } else {
                setText("Turno de enemigo ")
                setBg("#f60d96")
            }

            intervalo = setInterval(() => {
                setSeconds((prevseconds) => prevseconds + 1);
            }, 1000);

            if (seconds === waitTime) {
                setSeconds(0);
                dispatch(thunks_.updateTurn(socket, user))
                dispatch(thunks_.getUpdateData(socket));
                socket.emit("update_data", { idUser: user.idUser, idRoom: user.idRoom });
            }

            return () => {
                clearInterval(intervalo);
            };
        }
        if (user.winner === user.idUser) {
            setText("🏆¡Felicitaciones, has ganado!🏆");
            setWinner(true)
        } else {
            setText("💩¡Felicitaciones manc@, has perdido!💩");
            setWinner(true)
        }



    }, [user.yourTurn, user.idUser, seconds, socket, user, dispatch]);

    return (
        <>
            {!showWinner ? (<label style={{ background: bg, padding:"5px", color:"black"}}>{`${text} ${seconds}s/${waitTime}s`}</label>) : <label style={{ background: bg, color:"black" }}>{text}</label>}
        </>
    );
};

export default Timer;
