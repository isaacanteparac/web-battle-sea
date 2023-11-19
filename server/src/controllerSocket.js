import Element from './data/Element.js';
import VitalConditions from './data/VitalConditions.js';
import Users from './database/models/Users.js';
import Historial from './database/models/Historial.js';


const ctrlSocket = {

}


ctrlSocket.receiverAttack = async (newAttack) => {
    const enemy = await Users.findOne({ idUser: newAttack["idNicknameEnemy"] });
    const user = await Users.findOne({ idUser: newAttack["idUser"] });

    const properties = {}
    const updateEnemyData = {}
    updateEnemyData["row"] = newAttack["coordinate"].slice(0, 2);
    updateEnemyData["column"] = newAttack["coordinate"].slice(2);
    updateEnemyData["yourTurn"] = true
    const element = enemy["board"][updateEnemyData["row"]][updateEnemyData["column"]]["element"]
    if (element == Element.OCEAN || element == Element.BOMB) {
        updateEnemyData["element"] = Element.OCEAN
        updateEnemyData["vital"] = VitalConditions.ALIVE
        properties["color"] = "btnBlue"
        properties["emoji"] = "🌊"

    } else {
        updateEnemyData["element"] = Element.BOMB
        updateEnemyData["vital"] = VitalConditions.DEAD
        properties["color"] = "btnRed"
        properties["emoji"] = "💀"
        if (enemy["score"] > 0) {
            updateEnemyData["score"] = enemy["score"] - 10
        }
    }


    const newHistorial = new Historial({
        row: newAttack["row"],
        column: newAttack["column"],
        idUser: newAttack["idUser"],
        idNicknameEnemy: newAttack["idNicknameEnemy"],
        idRoom: user["idRoom"]

    });
    newHistorial.save()

    const newData = {
        color: properties["color"],
        score: user["score"],
        emoji: properties["emoji"],
    }

    await Users.findOneAndUpdate(
        { idUser: newAttack["idUser"] },
        { $set: { yourTurn: false, } },
        { new: true }
    );

    await Users.findOneAndUpdate(
        { idUser: newAttack["idNicknameEnemy"] },
        {
            $set: {
                score: updateEnemyData["score"],
                yourTurn: updateEnemyData["yourTurn"],
                [`board.${updateEnemyData["row"]}.${updateEnemyData["column"]}.element`]: updateEnemyData["element"],
                [`board.${updateEnemyData["row"]}.${updateEnemyData["column"]}.vital`]: updateEnemyData["vital"]
            }
        },
        { new: true }
    );

    console.log(newAttack["idUser"])
    console.log(newData)

    return newData
}

export { ctrlSocket }