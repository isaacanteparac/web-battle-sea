import Element from './data/Element.js';
import VitalConditions from './data/VitalConditions.js';
import Users from './database/models/Users.js';
import Historial from './database/models/Historial.js';


const ctrlSocket = {

}


ctrlSocket.receiverAttack = async (newAttack) => {
    const enemy = await Users.findOne({ idUser: newAttack["idNicknameEnemy"] }).exec();
    const user = await Users.findOne({ idUser: newAttack["idUser"] }).exec();


    let emoji = ""
    if (enemy["score"] > 0) {
        enemy["score"] -= 10
    }
    const enemyBoard = enemy["board"]
    const row = newAttack["coordinate"].slice(0, 2);
    const column = newAttack["coordinate"].slice(2);
    const element = enemyBoard[row][column]["element"]
    if (element == Element.OCEAN || element == Element.BOMB) {
        user["color"] = "btnBlue"
        emoji = "🌊"

    } else {
        enemyBoard[row][column]["element"] = Element.BOMB
        enemyBoard[row][column]["vital"] = VitalConditions.DEAD
        user["color"] = "btnRed"
        emoji = "💀"
    }
    user["yourTurn"] = false
    enemy["yourTurn"] = true
    const newData = {
        color: user["color"],
        score: user["score"],
        emoji: emoji
    }

    const newHistorial = new Historial({
        row: row,
        column: column,
        idUser: newAttack["idUser"],
        idNicknameEnemy: newAttack["idNicknameEnemy"],
        idRoom: user["idRoom"]

    });
    newHistorial.save()
    return newData
}

export { ctrlSocket }