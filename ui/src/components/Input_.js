import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { setShowTextWait, setShowMyBoard, setTextMyBoard } from '../redux/systemSlice';
import { changeNickname, changeIdNicknameEnemy } from '../redux/userSlice';
import { thunks_ } from '../redux/thunks_';
import Singleton from '../redux/Singleton';
import { fetch_ } from '../util/fetch';



function Input_() {

    const [showOptions, setShowOptions] = useState(false)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const singleton = new Singleton()
    const socket = singleton.getSocket()
    const [getManualChoice, setManualChoice] = useState(false);

    const [rowData, setRowData] = useState();
    const [columnData, setColumnData] = useState();
    const [boatSizeData, setBoatSizeData] = useState()
    const [shipSelection, setShipSelection] = useState();
    const [rowSelection, setRowSelection] = useState();
    const [columnlSelection, setColumnSelection] = useState();
    const [orientationSelection, setOrientationSelection] = useState();
    const [automatic, setAutomatic] = useState()
    const [manualSelectionData, setManualSelectionData] = useState({ data: [], automatic: automatic })

    const urlRow = "rows";
    const urlColumns = "columns";
    const urlShips = "ship"

    let totalClicks = 0;
    let countClicks = 0;


    const loadRCData = async () => {
        let rdata = await fetch_(urlRow);
        let cdata = await fetch_(urlColumns);
        let sdata = await fetch_(urlShips)
        setBoatSizeData(Object.values(sdata))
        setRowData(Object.values(rdata));
        setColumnData(Object.values(cdata));
        totalClicks = sdata.big["amount"] + sdata.small["amount"] + sdata.mini["amount"] + sdata.gigant["amount"]
    };


    const createNewUser = () => {
        if (!showOptions) {
            dispatch(thunks_.createUserAndRoom(user))
        } else {
            dispatch(thunks_.createUserAndRoom(user, true))
        }
    }

    const restore = () => {
        return async (dispatch) => {
            dispatch(setShowTextWait(true))
            dispatch(setShowMyBoard(true))
            dispatch(setTextMyBoard(`Tablero de "${user.nickname}"`))
        }
    }


    const loadPlayers = () => {
        if (!showOptions) {
            socket.emit("available_players", "")
            socket.on("available_players", (data) => {
                if (data != null) {
                    dispatch(changeIdNicknameEnemy(data["idUser"]))
                    setShowOptions(true)
                    socket.off("available_players")
                }
            })
        }
    }

    const saveAndSend = async () => {
        let positions = {}
        if (!automatic) {
            if (countClicks !== totalClicks) {
                positions = {
                    ship: shipSelection,
                    row: rowSelection,
                    column: columnlSelection,
                    orientation: orientationSelection,
                }

            }
            countClicks += 1
        } else {
            const data = { automatic, positions, idUser: user.idUser}
            dispatch(thunks_.boardGenerate(data))
            dispatch(restore());
         
        }



    }
/*TODO:al hacer click que en enviar que salga la opcion de botones, pero que se desabiliti mi entrada al teclado
test de seleccion manual*/

    useEffect(() => { loadRCData() }, [])

    return (<div className='separator'>

        <div className='inputBox'>
            <input placeholder="nickname" type='text' value={user.nickname} onClick={() => loadPlayers()} onChange={(e) => dispatch(changeNickname(e.target.value))} />
            {!showOptions ? (<button className="send" onClick={() => createNewUser()}>{">"}</button>) : null}
        </div>
        {showOptions ? (<>
            <label className='textWait'>{"VS"}</label>
            <div className='inputBox'>
                <input placeholder="nickname" type='text' value={user.idNicknameEnemy} disabled={true} />
            </div>
            <button className="send keep" onClick={() => createNewUser()}>{"Unirse"}</button></>) : null
        }
        {!getManualChoice ? (
            <div>
                <h3>Tipo de generacion: </h3>
                <button onClick={() => { setAutomatic(true); saveAndSend(); }}>
                    Automatico
                </button>
                <button onClick={() => { setAutomatic(false); saveAndSend(); }}>
                    Manual
                </button>
            </div>
        ) : (
            <div className=''>
                <h1>Selección Manual</h1>

                <div>
                    <label>Tamaño del Barco</label>
                    <select name="shipSize" onChange={(e) => setShipSelection(e.target.value)}>
                        <option disabled selected value="">Seleccione</option>
                        {boatSizeData?.map((value, index) => (
                            <option key={index} value={value.name}>{value.displayName}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Fila</label>
                    <select name="rowData" onChange={(e) => setRowSelection(e.target.value)}>
                        <option disabled selected value="">Seleccione</option>
                        {rowData?.map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Columna</label>
                    <select name="columnData" onChange={(e) => setColumnSelection(e.target.value)}>
                        <option disabled selected value="">Seleccione</option>
                        {columnData?.map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Orientación</label>
                    <select name="orientation" onChange={(e) => setOrientationSelection(e.target.value)}>
                        <option disabled selected value="">Seleccione</option>
                        <option value={"horizontal"}>Horizontal</option>
                        <option value={"vertical"}>Vertical</option>
                    </select>
                </div>

                <button onClick={() => saveAndSend()}>Guardar</button>
            </div>
        )}

    </div>

    );
}

export default Input_;