import Element from './Object/Element.js';
import VitalConditions from './Object/VitalConditions.js';
import Users from './database/models/Users.js';
import Historial from './database/models/Historial.js';
import Rooms from './database/models/Rooms.js';


const ctrlSocket = {

}


ctrlSocket.receiverAttack = async (newAttack) => {
    const enemy = await Users.findOne({ idUser: newAttack["idNicknameEnemy"] });
    const user = await Users.findOne({ idUser: newAttack["idUser"] });

    const properties = {}
    const updateEnemyData = {}
    updateEnemyData["row"] = newAttack["coordinate"].slice(0, 2);
    updateEnemyData["column"] = newAttack["coordinate"].slice(2);
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

    if(updateEnemyData["score"] === 0){
        console.log("0 es la puntuacion del enemigo")
        await Rooms.findOneAndUpdate(
            { idRoom: newAttack["idRoom"] },
            {
                $set: {
                    Winner: newAttack["idUser"],
                    isActive: false
                }
            },
            { new: true }
        )
    }


    const newHistorial = new Historial({
        row: newAttack["row"],
        column: newAttack["column"],
        idUser: newAttack["idUser"],
        idNicknameEnemy: newAttack["idNicknameEnemy"],
        idRoom: user["idRoom"]

    });
    newHistorial.save()

    await Users.findOneAndUpdate(
        { idUser: newAttack["idNicknameEnemy"] },
        {
            $set: {
                score: updateEnemyData["score"],
                [`board.${updateEnemyData["row"]}.${updateEnemyData["column"]}.element`]: updateEnemyData["element"],
                [`board.${updateEnemyData["row"]}.${updateEnemyData["column"]}.vital`]: updateEnemyData["vital"]
            }
        },
        { new: true }
    );

    const newData = {
        color: properties["color"],
        emoji: properties["emoji"],
    }

    return newData
}

export { ctrlSocket }