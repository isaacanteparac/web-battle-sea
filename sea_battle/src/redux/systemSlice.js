import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    showTextWait: false,
    showMyBoard: false,
    textMyBoard: "Mi tablero"

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
        setTextMyBoardd: (state, action) => {
            state.textMyBoard = action.payload;
        }


    }
})

export const { setShowTextWait, setShowMyBoard, setTextMyBoardd } = systemSlice.actions;
export default systemSlice.reducer;