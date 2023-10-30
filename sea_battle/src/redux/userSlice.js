import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    nickname: "",
    inGame: null,
    idRoom: null,
    board: null,
    nicknameEnemy: ""
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
        changeNicknameEnemy: (state, action) => {
            state.nicknameEnemy = action.payload;
        }
    }
})

export const { newUser, changeIdRoom, changeBoard, changeInGame, changeNickname, changeNicknameEnemy } = userSlice.actions;
export default userSlice.reducer;