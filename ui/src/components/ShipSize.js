import React from 'react';

function ShipSize(props) {

    const size = () => {
        let divs = []
        for (let i = 1; i <= props.nSize; i++) {
            divs.push(<div key={i} style={{ backgroundColor: props.color || 'black' }}></div>)
        }
        return divs
    }


    return (<div className='ship_size'>
        <label>
            {props.name} {props.amount}
        </label>
        <div className='nShip'>
            {size()}
        </div>
    </div>);
}

export default ShipSize;