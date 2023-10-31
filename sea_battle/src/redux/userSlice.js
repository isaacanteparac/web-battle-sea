import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    idUser: "",
    nickname: "",
    inGame: null,
    idRoom: null,
    board: null,
    score: 0,
    idNicknameEnemy: "",
    enemyBoard: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        newUser: (state, action) => {
            const { nickname, inGame, idRoom, board } = action.payload;
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
        changeEnemyBoard: (state, action) => {
            state.enemyBoard = action.payload;
        }
    }
})

export const { newUser, changeIdUser, changeIdRoom, changeBoard, changeInGame, changeNickname, changeIdNicknameEnemy, changeEnemyBoard, changeScore } = userSlice.actions;
export default userSlice.reducer;