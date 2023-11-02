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
            dispatch(changeIdNicknameEnemy(data["createdGame"]));
            dispatch(changeIdRoom(data["idRoom"]));
            dispatch(changeInGame(data["avalible"]));
        }
    };
};

thunks_.searchRooms = (data, user) => {
    const urlRoomId = "room/"
    return async (dispatch) => {
        const searchRoom = await fetch_(`${urlRoomId}${data["idRoom"]}`)
        if (user.idNicknameEnemy == "") {
            if (user.idUser == searchRoom["joinGame"]) {
                dispatch(changeIdNicknameEnemy(searchRoom["createdGame"]))
            } else {
                dispatch(changeIdNicknameEnemy(searchRoom["joinGame"]))
                dispatch(setYourTurn(true))
            }
        }
    }
}

thunks_.attackSend = (data) => {
    return async (dispatch) => {
        dispatch(changeBoard(data["board"]))
        dispatch(setYourTurn(data["yourTurn"]))
        dispatch(changeScore(data["score"]))
    }
}

export { thunks_ };
