import React from 'react';

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
        return '#Ece008'; // Color predeterminado si no coincide con ninguno de los casos anteriores
    };

    return (
        <div className='boxContainer'>
            {rows.map((row) => (
                Object.values(row || {}).map((column, colIndex) => (
                    <div
                        key={colIndex}
                        className="box"
                        style={{ backgroundColor: getColorByElement(column.element, column.type) }}
                    >
                        <label>{`${column.position}`}</label>
                    </div>
                ))
            ))}
        </div>
    );
}

export default Board;
