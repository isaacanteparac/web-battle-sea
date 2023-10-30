import React, { useEffect, useState } from 'react';
import { fetch_ } from '../util/fetch';
import { io } from "socket.io-client";
import ShipSize from './ShipSize';
import Board from './Board';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Input_ from './Input_';


function Layout() {
    const [boatSizeData, setboatSizeData] = useState();
    const system = useSelector((state) => state.system)
    const user = useSelector((state) => state.user)

    const loadboatSizeData = async () => {
        let data = await fetch_("ship")
        setboatSizeData(Object.values(data))
    }

    useEffect(() => { loadboatSizeData() }, [])

    return (<div className='layout'>
        {system.showMyBoard ? (
            <div className='divColumn'>
                <h2 className='title'>{system.textMyBoard}</h2>
                <div className='boardContainer'>
                    <Board json={user.board} />
                </div>
            </div>) : null}

        <div className='startInformation'>
            {!system.showMyBoard ? (
                <Input_ />) : null}
            {system.showMyBoard ? (boatSizeData?.map((ship) => (
                <ShipSize key={ship.name} name={ship.displayName} nSize={ship.size} color={ship.color} amount={ship.amount} />
            ))) : null}
        </div>

    </div>);
}

export default Layout;