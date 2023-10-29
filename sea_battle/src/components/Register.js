import React, { useEffect, useState } from 'react';
import ShipSize from './ShipSize';
import Input_ from './Input_';
import { fetch_ } from '../util/fetch';

function Register() {
    const [boatSizeData, setboatSizeData] = useState();

    console.log(boatSizeData)

    const loadboatSizeData = async () => {
        let d = await fetch_("ship")
        setboatSizeData(Object.values(d))
    }




    useEffect(() => {
        loadboatSizeData()
    }, [])

    return (
        <div className='startInformation'>
            <Input_ />
            {boatSizeData?.map((ship) => (
                <ShipSize key={ship.name} name={ship.displayName} nSize={ship.size} color={ship.color} />
            ))}
        </div>
    );
}

export default Register;
