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
    const [totalClicks, setTotalClicks] = useState(0);
    const [countClicks, setCountClicks] = useState(1);

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
        setTotalClicks(sdata.big.amount + sdata.small.amount + sdata.mini.amount + sdata.gigant.amount);
    };

    const manualSend = async () => {
        setCountClicks(countClicks+1);
        if (!automatic) {
            console.log("click "+countClicks)
            console.log("total de clicl "+totalClicks)
            if (countClicks !== totalClicks) {
                positions.push({
                    ship: shipSelection,
                    row: rowSelection,
                    column: columnSelection,
                    orientation: orientationSelection,
                });
                setPositions([...positions]);
            } else {
                save();
            }
        }
    };

    const save = () => {
        const data = { automatic, positions, idUser: user.idUser };
        dispatch(thunks_.boardGenerate(data));
    };

    useEffect(() => { loadRCData(); }, []);

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
                                    <div>
                                        <h3>Tipo de generacion: </h3>
                                        <button onClick={() => { setAutomatic(true); save(); }}>
                                            Automatico
                                        </button>
                                        <button onClick={() => { setAutomatic(false); setManualChoice(true); }}>
                                            Manual
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                    <div className=''>
                                        <label className='subTitle'>Selección Manual</label>
                                        <div>
                                            <label>Tamaño del Barco</label>
                                            <select name="shipSize" onChange={(e) => setShipSelection(e.target.value)}>
                                                <option disabled selected value="">Seleccione</option>
                                                {boatSizeData.map((value, index) => (
                                                    <option key={index} value={value.name}>{value.displayName}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label>Fila</label>
                                            <select name="rowData" onChange={(e) => setRowSelection(e.target.value)}>
                                                <option disabled selected value="">Seleccione</option>
                                                {rowData.map((value, index) => (
                                                    <option key={index} value={value}>{value}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label>Columna</label>
                                            <select name="columnData" onChange={(e) => setColumnSelection(e.target.value)}>
                                                <option disabled selected value="">Seleccione</option>
                                                {columnData.map((value, index) => (
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

                                        <button onClick={() => manualSend()}>Guardar</button>
                                    </div>
                                 <div>
                                 <table>
                                     <thead>
                                         <tr>
                                             <th>Tamaño</th>
                                             <th>Fl</th>
                                             <th>Clm</th>
                                             <th>Pstn</th>
                                         </tr>
                                     </thead>
                                     <tbody>
                                         {positions.map((item, index) => (
                                             <tr key={index}>
                                                 <td>{item.ship}</td>
                                                 <td>{item.row}</td>
                                                 <td>{item.column}</td>
                                                 <td>{item.orientation}</td>
                                             </tr>
                                         ))}
                                     </tbody>
                                 </table>
                             </div></>
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
