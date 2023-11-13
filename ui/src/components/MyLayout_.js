import React, { useEffect, useState } from 'react';
import { fetch_ } from '../util/fetch';
import ShipSize from './ShipSize';
import Board from './Board';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Input_ from './Input_';


function MyLayout() {
    const [boatSizeData, setboatSizeData] = useState();
    const user = useSelector((state) => state.user)
    const system = useSelector((state) => state.system);
    const urlShips = "ship"

    const loadboatSizeData = async () => {
        let data = await fetch_(urlShips)
        setboatSizeData(Object.values(data))
    }

    useEffect(() => { loadboatSizeData() }, [])

    return (<div className='layout'>
        {system.showMyBoard ? (
            <div className='divColumn'>
                <h2 className='title'>{system.textMyBoard}</h2>
                <div className='boardContainer layout_1'>
                    <Board json={user.board} button={false} />
                    <div className='containerShip_size'>
                        {boatSizeData?.map((ship) => (
                            <ShipSize key={ship.name} name={ship.displayName} nSize={ship.size} color={ship.color} amount={ship.amount} />
                        ))}
                    </div>

                </div>
            </div>) : null}
        {!system.showMyBoard ? (<div className='startInformation'> <Input_ /></div>) : null}
    </div>);
}

export default MyLayout;