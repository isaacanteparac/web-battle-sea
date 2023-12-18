import React, { useEffect, useState } from 'react';
import { fetch_ } from '../util/fetch';
import ShipSize from './ShipSize';
import Board from './Board';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Input_ from './Input_';
import { thunks_ } from '../redux/thunks_';
import { useDispatch } from 'react-redux';

function MyLayout() {
    const user = useSelector((state) => state.user);
    const system = useSelector((state) => state.system);
    const dispatch = useDispatch();
    const [rowData, setRowData] = useState([]);
    const [columnData, setColumnData] = useState([]);
    const [boatSizeData, setBoatSizeData] = useState([]);
    const [shipSelection, setShipSelection] = useState('');
    const [rowSelection, setRowSelection] = useState('');
    const [columnSelection, setColumnSelection] = useState('');
    const [orientationSelection, setOrientationSelection] = useState('');
    const [automatic, setAutomatic] = useState(false);
    const [getManualChoice, setManualChoice] = useState(false);
    const [positions, setPositions] = useState([]);
    const [totalClicks, setTotalClicks] = useState();
    const [countClicks, setCountClicks] = useState({
        "mini": 0,
        "small": 0,
        "big": 0,
        "gigant": 0,
        "total": 0
    });

    const urlRow = "rows";
    const urlColumns = "columns";
    const urlShips = "ship";

    const loadRCData = async () => {
        let rdata = await fetch_(urlRow);
        let cdata = await fetch_(urlColumns);
        let sdata = await fetch_(urlShips);
        setBoatSizeData(Object.values(sdata));
        setRowData(Object.values(rdata));
        setColumnData(Object.values(cdata));
        setTotalClicks({
            "mini": sdata.mini.amount,
            "small": sdata.small.amount,
            "big": sdata.big.amount,
            "gigant": sdata.gigant.amount,
            "total": sdata.big.amount + sdata.small.amount + sdata.mini.amount + sdata.gigant.amount
        });
    };

    const manualSend = async () => {
        if (!automatic) {
            if (countClicks.total !== totalClicks.total) {
                let nameShip = "" + shipSelection
                if (shipSelection !== '' && rowSelection !== '' && columnSelection !== '' && orientationSelection !== '') {

                    if (countClicks[nameShip] <= totalClicks[nameShip] - 1) {
                        countClicks[nameShip] += 1
                        const positionExists = positions.some(
                            (item) => item.row === rowSelection && item.column === columnSelection
                        );

                        if (!positionExists) {
                            positions.push({
                                ship: shipSelection,
                                row: rowSelection,
                                column: columnSelection,
                                orientation: orientationSelection,
                            });
                            countClicks.total += 1;
                            setPositions([...positions]);
                        } else {
                            countClicks[nameShip] -= 1
                        }
                    } else {
                        document.getElementById(nameShip).style.display = "none";
                    }
                    save()
                }
            }
        }
    };

    const delete_ = (id, size) => {
        console.log(id)
        console.log("total")
        console.log(countClicks.total)
        if (countClicks.total !== 0) {
            const updatedPositions = positions.filter((_, idx) => idx !== id);
            setPositions(updatedPositions);
            countClicks[size] -= 1
            countClicks.total -= 1;
            save()
        }

    }

    const save = () => {
        const data = { automatic, positions, idUser: user.idUser, clicks: countClicks.total };
        dispatch(thunks_.boardGenerate(data));
    };

    useEffect(() => {
        loadRCData();
    }, []);

    return (
        <div className='layout'>
            {system.showMyBoard ? (
                <div className='divColumn'>
                    <h2 className='title'>{system.textMyBoard}</h2>
                    <div className='boardContainer layout_1'>
                        <Board json={user.board} button={false} />
                        <div className='containerShip_size'>
                            {boatSizeData.map((ship) => (
                                <ShipSize key={ship.name} name={ship.displayName} nSize={ship.size} color={ship.color} amount={ship.amount} />
                            ))}
                            <div>
                                {!getManualChoice ? (
                                    <div className='typeGeneration'>
                                        <h3 style={{ color: "#fff" }}>Tipo de generacion: </h3>
                                        <div>
                                            <button className='typeGenerationBtn' onClick={() => {
                                                setAutomatic(true);
                                                countClicks.total = 10;
                                                save();
                                            }}>
                                                Automatico
                                            </button>
                                            <button className='typeGenerationBtn' onClick={() => { setAutomatic(false); setManualChoice(true); }}>
                                                Manual
                                            </button>
                                        </div>
                                        <label style={{ fontSize: "15px", textAlign: "left", marginBlock: "10px", color: "#fff" }}>🟨Opt Automatico hacer click x2 para confirmar, en 1seg.</label>
                                        <label style={{ fontSize: "15px", textAlign: "left", color: "#fff" }}>🟥Opt manual en beta.</label>
                                    </div>
                                ) : (
                                    <div className='manual'>
                                        <div className='manualComponent'>
                                            <label style={{ color: "#3376FA", fontSize: "19px" }}>Selección Manual</label>

                                            <div className='optionalBox'>
                                                <label>Tamaño</label>
                                                <select name="shipSize" onChange={(e) => setShipSelection(e.target.value)}>
                                                    <option disabled selected value="">Seleccione</option>
                                                    {boatSizeData.map((value, index) => (
                                                        <option key={index} value={value.name} id={value.name}>{value.displayName}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className='optionalBox'>
                                                <label>Fila</label>
                                                <select name="rowData" onChange={(e) => setRowSelection(e.target.value)}>
                                                    <option disabled selected value="">Seleccione</option>
                                                    {rowData.map((value, index) => (
                                                        <option key={index} value={value}>{value}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className='optionalBox'>
                                                <label>Columna</label>
                                                <select name="columnData" onChange={(e) => setColumnSelection(e.target.value)}>
                                                    <option disabled selected value="">Seleccione</option>
                                                    {columnData.map((value, index) => (
                                                        <option key={index} value={value}>{value}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className='optionalBox' style={{ marginBottom: "10px" }}>
                                                <label>Orientación</label>
                                                <select name="orientation" onChange={(e) => setOrientationSelection(e.target.value)}>
                                                    <option disabled selected value="">Seleccione</option>
                                                    <option value={"horizontal"}>Horizontal</option>
                                                    <option value={"vertical"}>Vertical</option>
                                                </select>
                                            </div>
                                            <label style={{ fontSize: "15px", textDecoration: "underline", color: "#775418" }}>⚠️Los barcos de añaden de <strong>IZQUIERDA a DERECHA</strong> y <strong>ARRIBA hacia ABAJO</strong>⚠️</label>

                                            <button onClick={() => manualSend()}>Guardar</button>
                                        </div>
                                        <table className='manualComponent'>
                                            <thead>
                                                <tr>
                                                    <th>Tamaño</th>
                                                    <th>Fila</th>
                                                    <th>Columna</th>
                                                    <th>Posicion</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {positions.map((item, index) => (
                                                    <tr key={index} id={'trId' + index}>
                                                        <td>{item.ship}</td>
                                                        <td>{item.row}</td>
                                                        <td>{item.column}</td>
                                                        <td>{item.orientation}</td>
                                                        <td><button onClick={() => delete_(index, item.ship)}>x</button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            {!system.showMyBoard ? (<div className='startInformation'> <Input_ /></div>) : null}
        </div>
    );
}

export default MyLayout;
