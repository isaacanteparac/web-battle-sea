import { fetch_ } from "../util/fetch";
import { updateUser, changeIdNicknameEnemy, changeIdRoom, changeInGame, changeBoard, changeScore, changeYourTurn } from "./userSlice";
const thunks_ = {}

thunks_.createUserAndRoom = (user, bool = false) => {
    const urlCreateRoom = "create/room"
    const urlCreatePlayer = "create/player";
    return async (dispatch) => {
        const data1 = await fetch_(urlCreatePlayer, { "nickname": user.nickname }, "POST");
        dispatch(updateUser(data1));
        if (bool) {
            const data = await fetch_(urlCreateRoom, { join: data1["idUser"] }, "POST")
            await dispatch(changeYourTurn(true))
            dispatch(changeIdRoom(data["idRoom"]));
            dispatch(changeInGame(data["avalible"]));
        }
    };
};

thunks_.searchRooms = (data, user) => {
    const urlRoomId = "room/"
    return async (dispatch) => {
        const searchRoom = await fetch_(`${urlRoomId}${data["idRoom"]}`)
        if (user.idUser === searchRoom["createdGame"]) {
            await dispatch(changeIdNicknameEnemy(searchRoom["joinGame"]))
        } else {
            await dispatch(changeIdNicknameEnemy(searchRoom["createdGame"]))
        }
    }
}

thunks_.attackSend = (socket, state) => {
    return async (dispatch) => {
        socket.on("attack", async (data) => {
            await dispatch(changeYourTurn(data["yourTurn"]))
            await dispatch(changeScore(data["score"]))
            await state(data["color"])
        })
    }
}

thunks_.updateBoard = (socket) => {
    return async (dispatch) => {
        socket.on("update_board", async (data) => {
            await dispatch(changeBoard(data))

        })
    }
}

thunks_.updateTurn = (socket) => {
    return async (dispatch) => {
        socket.on("update_turn", async (data) => {
            await dispatch(changeYourTurn(data))

        })
    }
}

export { thunks_ };
