import Element from "./Object/Element.js";
import { Row, Column } from "./Object/Position.js";
import Ship from "./Object/Ship.js";
import VitalConditions from "./Object/VitalConditions.js";

const random_ = {

}

var matrixToPredict = [];
var matrixOriginal = {}

random_.run = (userBoard = { automatic: true, data: {} }) => {
    matrixToPredict = [[0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]]
    matrixOriginal = {
        [Row.R1]: {
            [Column.C1]: {
                "position": `${Row.R1}${Column.C1}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C2]: {
                "position": `${Row.R1}${Column.C2}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C3]: {
                "position": `${Row.R1}${Column.C3}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C4]: {
                "position": `${Row.R1}${Column.C4}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C5]: {
                "position": `${Row.R1}${Column.C5}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C6]: {
                "position": `${Row.R1}${Column.C6}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C7]: {
                "position": `${Row.R1}${Column.C7}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            }
        },
        [Row.R2]: {
            [Column.C1]: {
                "position": `${Row.R2}${Column.C1}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C2]: {
                "position": `${Row.R2}${Column.C2}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C3]: {
                "position": `${Row.R2}${Column.C3}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C4]: {
                "position": `${Row.R2}${Column.C4}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C5]: {
                "position": `${Row.R2}${Column.C5}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C6]: {
                "position": `${Row.R2}${Column.C6}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C7]: {
                "position": `${Row.R2}${Column.C7}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            }
        },
        [Row.R3]: {
            [Column.C1]: {
                "position": `${Row.R3}${Column.C1}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C2]: {
                "position": `${Row.R3}${Column.C2}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C3]: {
                "position": `${Row.R3}${Column.C3}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C4]: {
                "position": `${Row.R3}${Column.C4}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C5]: {
                "position": `${Row.R3}${Column.C5}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C6]: {
                "position": `${Row.R3}${Column.C6}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C7]: {
                "position": `${Row.R3}${Column.C7}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            }

        },
        [Row.R4]: {
            [Column.C1]: {
                "position": `${Row.R4}${Column.C1}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C2]: {
                "position": `${Row.R4}${Column.C2}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C3]: {
                "position": `${Row.R4}${Column.C3}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C4]: {
                "position": `${Row.R4}${Column.C4}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C5]: {
                "position": `${Row.R4}${Column.C5}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C6]: {
                "position": `${Row.R4}${Column.C6}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C7]: {
                "position": `${Row.R4}${Column.C7}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            }
        },
        [Row.R5]: {
            [Column.C1]: {
                "position": `${Row.R5}${Column.C1}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C2]: {
                "position": `${Row.R5}${Column.C2}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C3]: {
                "position": `${Row.R5}${Column.C3}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C4]: {
                "position": `${Row.R5}${Column.C4}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C5]: {
                "position": `${Row.R5}${Column.C5}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C6]: {
                "position": `${Row.R5}${Column.C6}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C7]: {
                "position": `${Row.R5}${Column.C7}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            }

        },
        [Row.R6]: {
            [Column.C1]: {
                "position": `${Row.R6}${Column.C1}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C2]: {
                "position": `${Row.R6}${Column.C2}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C3]: {
                "position": `${Row.R6}${Column.C3}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C4]: {
                "position": `${Row.R6}${Column.C4}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C5]: {
                "position": `${Row.R6}${Column.C5}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C6]: {
                "position": `${Row.R6}${Column.C6}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C7]: {
                "position": `${Row.R6}${Column.C7}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            }
        },
        [Row.R7]: {
            [Column.C1]: {
                "position": `${Row.R7}${Column.C1}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C2]: {
                "position": `${Row.R7}${Column.C2}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C3]: {
                "position": `${Row.R7}${Column.C3}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C4]: {
                "position": `${Row.R7}${Column.C4}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C5]: {
                "position": `${Row.R7}${Column.C5}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C6]: {
                "position": `${Row.R7}${Column.C6}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C7]: {
                "position": `${Row.R7}${Column.C7}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            }
        },
    };
    placeShipsInMatrix(matrixToPredict, Ship, userBoard);
}


function placeShipsInMatrix(matrix, ships, data) {
    if (data.automatic) {
        const shipsArray = Object.values(ships);
        for (const ship of shipsArray) {
            for (let i = 0; i < ship.amount; i++) {
                let placed = false;
                while (!placed) {
                    const randomRow = Math.floor(Math.random() * matrix.length);
                    const randomColumn = Math.floor(Math.random() * matrix[0].length);
                    const randomOrientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
                    placed = placeAutomaticShip(matrix, randomRow, randomColumn, randomOrientation, ship)
                }
            }
        }
    }
    else {
        placeManualShip(matrix, data)
    }
}

function placeManualShip(matrix, data) {
    for (let i = 0; i < data.positions.length; i++) {
        let objPosition = data.positions[i]
        let ship_ = Ship[objPosition.ship]
        const rowNumber = parseInt(objPosition.row.substring(1)-1);
        const columnNumber = parseInt(objPosition.column.substring(1)-1 );
        placeAutomaticShip(matrix, rowNumber, columnNumber, objPosition.orientation, ship_)
    }
}

function placeAutomaticShip(matrix, startRow, startColumn, orientation, ship) {
    if (orientation === 'horizontal' && startColumn + ship.size <= matrix[0].length) {
        for (let i = 0; i < ship.size; i++) {
            if (matrix[startRow][startColumn + i] !== 0) {
                return false;
            }
        }
        for (let i = 0; i < ship.size; i++) {
            matrix[startRow][startColumn + i] = ship.symbol;
            matrixOriginal[`r${startRow + 1}`][`c${startColumn + i + 1}`].element = Element.Ship;
            matrixOriginal[`r${startRow + 1}`][`c${startColumn + i + 1}`].type = returnObject(ship.name);
            matrixOriginal[`r${startRow + 1}`][`c${startColumn + i + 1}`].type = returnObject(ship.name);

        }
        return true;
    } else if (orientation === 'vertical' && startRow + ship.size <= matrix.length) {
        for (let i = 0; i < ship.size; i++) {
            if (matrix[startRow + i][startColumn] !== 0) {
                return false;
            }
        }
        for (let i = 0; i < ship.size; i++) {
            matrix[startRow + i][startColumn] = ship.symbol;
            matrixOriginal[`r${startRow + i + 1}`][`c${startColumn + 1}`].element = Element.Ship;
            matrixOriginal[`r${startRow + i + 1}`][`c${startColumn + 1}`].type = returnObject(ship.name);
        }
        return true;
    } else {
        return false;
    }
}

function returnObject(name) {
    switch (name) {
        case (Ship.mini.name): {
            return Ship.mini;
        } case (Ship.small.name): {
            return Ship.small
        } case (Ship.big.name): {
            return Ship.big
        } case (Ship.gigant.name): {
            return Ship.gigant
        }
    }
}


random_.getMatrix = () => {
    return matrixOriginal
}

random_.getDefaultMatrix = () => {
    const md = {
        [Row.R1]: {
            [Column.C1]: {
                "position": `${Row.R1}${Column.C1}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C2]: {
                "position": `${Row.R1}${Column.C2}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C3]: {
                "position": `${Row.R1}${Column.C3}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C4]: {
                "position": `${Row.R1}${Column.C4}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C5]: {
                "position": `${Row.R1}${Column.C5}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C6]: {
                "position": `${Row.R1}${Column.C6}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C7]: {
                "position": `${Row.R1}${Column.C7}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            }
        },
        [Row.R2]: {
            [Column.C1]: {
                "position": `${Row.R2}${Column.C1}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C2]: {
                "position": `${Row.R2}${Column.C2}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C3]: {
                "position": `${Row.R2}${Column.C3}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C4]: {
                "position": `${Row.R2}${Column.C4}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C5]: {
                "position": `${Row.R2}${Column.C5}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C6]: {
                "position": `${Row.R2}${Column.C6}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C7]: {
                "position": `${Row.R2}${Column.C7}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            }
        },
        [Row.R3]: {
            [Column.C1]: {
                "position": `${Row.R3}${Column.C1}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C2]: {
                "position": `${Row.R3}${Column.C2}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C3]: {
                "position": `${Row.R3}${Column.C3}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C4]: {
                "position": `${Row.R3}${Column.C4}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C5]: {
                "position": `${Row.R3}${Column.C5}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C6]: {
                "position": `${Row.R3}${Column.C6}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C7]: {
                "position": `${Row.R3}${Column.C7}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            }

        },
        [Row.R4]: {
            [Column.C1]: {
                "position": `${Row.R4}${Column.C1}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C2]: {
                "position": `${Row.R4}${Column.C2}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C3]: {
                "position": `${Row.R4}${Column.C3}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C4]: {
                "position": `${Row.R4}${Column.C4}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C5]: {
                "position": `${Row.R4}${Column.C5}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C6]: {
                "position": `${Row.R4}${Column.C6}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C7]: {
                "position": `${Row.R4}${Column.C7}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            }
        },
        [Row.R5]: {
            [Column.C1]: {
                "position": `${Row.R5}${Column.C1}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C2]: {
                "position": `${Row.R5}${Column.C2}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C3]: {
                "position": `${Row.R5}${Column.C3}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C4]: {
                "position": `${Row.R5}${Column.C4}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C5]: {
                "position": `${Row.R5}${Column.C5}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C6]: {
                "position": `${Row.R5}${Column.C6}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C7]: {
                "position": `${Row.R5}${Column.C7}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            }

        },
        [Row.R6]: {
            [Column.C1]: {
                "position": `${Row.R6}${Column.C1}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C2]: {
                "position": `${Row.R6}${Column.C2}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C3]: {
                "position": `${Row.R6}${Column.C3}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C4]: {
                "position": `${Row.R6}${Column.C4}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C5]: {
                "position": `${Row.R6}${Column.C5}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C6]: {
                "position": `${Row.R6}${Column.C6}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C7]: {
                "position": `${Row.R6}${Column.C7}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            }
        },
        [Row.R7]: {
            [Column.C1]: {
                "position": `${Row.R7}${Column.C1}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C2]: {
                "position": `${Row.R7}${Column.C2}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C3]: {
                "position": `${Row.R7}${Column.C3}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C4]: {
                "position": `${Row.R7}${Column.C4}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C5]: {
                "position": `${Row.R7}${Column.C5}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C6]: {
                "position": `${Row.R7}${Column.C6}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            },
            [Column.C7]: {
                "position": `${Row.R7}${Column.C7}`,
                "element": Element.OCEAN,
                "type": "",
                "vital": VitalConditions.ALIVE
            }
        },
    };
    return md
}

export { random_ };


