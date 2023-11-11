import { fetch_ } from "../util/fetch";
import { setYourTurn } from "./systemSlice";
import { updateUser, changeIdNicknameEnemy, changeIdRoom, changeInGame, changeBoard, changeScore } from "./userSlice";
const thunks_ = {}

thunks_.createUserAndRoom = (user, bool = false) => {
    const urlCreateRoom = "create/room"
    const urlCreatePlayer = "create/player";
    return async (dispatch) => {
        const data1 = await fetch_(urlCreatePlayer, { "nickname": user.nickname }, "POST");
        dispatch(updateUser(data1));
        if (bool) {
            const data = await fetch_(urlCreateRoom, { join: data1["idUser"] }, "POST")
            dispatch(changeIdRoom(data["idRoom"]));
            dispatch(changeInGame(data["avalible"]));
        }
    };
};

thunks_.searchRooms = (data, user) => {
    const urlRoomId = "room/"
    return async (dispatch) => {
        const searchRoom = await fetch_(`${urlRoomId}${data["idRoom"]}`)
        if(user.idUser === searchRoom["createdGame"]){
            await dispatch(changeIdNicknameEnemy(searchRoom["joinGame"]))
        }else{
            await dispatch(changeIdNicknameEnemy(searchRoom["createdGame"]))

        }

        
       

    }
}

thunks_.attackSend = (socket, state) => {
    return async (dispatch) => {
        socket.on("attack", async (data) => {
            await dispatch(setYourTurn(data["yourTurn"]))
            await dispatch(changeScore(data["score"]))
            await state(data["color"])
        })
    }
}

thunks_.updateBoard = (socket, user) => {
    return async (dispatch) => {
        socket.emit("update_board", user)
        socket.on("update_board", async (data) => {
            await dispatch(changeBoard(data))

        })
    }
}

export { thunks_ };
