import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    showTextWait: false,
    showMyBoard: false,
    showMyLayout: true,
    showEnemyLayout: false,
    textMyBoard: "Mi tablero",
}

export const systemSlice = createSlice({
    name: "system",
    initialState,
    reducers: {
        setShowTextWait: (state, action) => {
            state.showTextWait = action.payload;
        },
        setShowMyBoard: (state, action) => {
            state.showMyBoard = action.payload;
        },
        setTextMyBoard: (state, action) => {
            state.textMyBoard = action.payload;
        },
        setMyLayout: (state, action) => {
            state.showMyLayout = action.payload;
        },

        setEnemyLayout: (state, action) => {
            state.showEnemyLayout = action.payload;
        },
    }
})

export const { setShowTextWait, setShowMyBoard, setTextMyBoard, setMyLayout, setEnemyLayout } = systemSlice.actions;
export default systemSlice.reducer;