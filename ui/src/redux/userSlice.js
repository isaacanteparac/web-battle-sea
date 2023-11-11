import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    idUser: "",
    nickname: "",
    inGame: null,
    idRoom: null,
    board: null,
    score: 0,
    idNicknameEnemy: "",
    defaultBoard: null,
    yourTurn: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { idUser,
                nickname,
                inGame,
                idRoom,
                board,
                score,
                idNicknameEnemy,
                defaultBoard } = action.payload;
            state.idUser = idUser;
            state.score = score;
            state.idNicknameEnemy = idNicknameEnemy;
            state.defaultBoard = defaultBoard;
            state.nickname = nickname;
            state.inGame = inGame;
            state.idRoom = idRoom;
            state.board = board;
        },
        changeIdUser: (state, action) => {
            state.idUser = action.payload;
        },
        changeNickname: (state, action) => {
            state.nickname = action.payload;
        },
        changeInGame: (state, action) => {
            state.inGame = action.payload;
        },
        changeIdRoom: (state, action) => {
            state.idRoom = action.payload;
        },
        changeBoard: (state, action) => {
            state.board = action.payload;
        },
        changeScore: (state, action) => {
            state.score = action.payload;
        },
        changeIdNicknameEnemy: (state, action) => {
            state.idNicknameEnemy = action.payload;
        },
        changeDefaultBoard: (state, action) => {
            state.defaultBoard = action.payload;
        },
        changeYourTurn: (state, action) => {
            state.yourTurn = action.payload;
        },
   
    }
})

export const { updateUser, changeYourTurn, changeIdUser, changeIdRoom, changeBoard, changeInGame, changeNickname, changeIdNicknameEnemy, changeDefaultBoard, changeScore } = userSlice.actions;
export default userSlice.reducer;