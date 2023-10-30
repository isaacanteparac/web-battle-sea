import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import systemReducer from "./systemSlice";
export const store_ = configureStore({
    reducer: {
        user: userReducer,
        system: systemReducer
    }
})