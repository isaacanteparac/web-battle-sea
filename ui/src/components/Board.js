import React from 'react';
import ButtonAttack from './ButtonAttack';

function Board(props) {
    const rows = Object.values(props.json || {});

    const getColorByElement = (element, type) => {
        if (element === 'ship') {
            return type.color;
        } else if (element === 'bomb') {
            return 'red';
        } else if (element === 'ocean') {
            return 'white';
        }
    };


    const buttonOrDiv = (colIndex, element, type, position) => {
        if (props.button) {
            return (
                <ButtonAttack key={"b" + colIndex} colIndex={colIndex} position={position}/>
            )
        } else {
            return (
                <div
                    key={colIndex}
                    className="circle"
                    style={{ backgroundColor: getColorByElement(element, type), color: "#FFFFFF" }}
                >
                    <label className='textCircle' >{`${position}`}</label>
                </div>
            )
        }

    }

    return (
        <div className='boxContainer'>
            {rows.map((row) => (
                Object.values(row || {}).map((column, colIndex) => (
                    buttonOrDiv(colIndex, column.element, column.type, column.position)

                ))
            ))}
        </div>
    );
}

export default Board;
