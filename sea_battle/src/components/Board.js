import React from 'react';

function Board(props) {

    return <div className='boxContainer'>
        {props.json.map((item, index) => (
            <div key={index} className="box"
                style={{ backgroundColor: item.element === "ocean" ? "blue" : "" }}>
                <label>{`${item.row}${item.column}`}</label>
            </div>
        ))}
    </div>
}

export default Board;