import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import systemReducer from "./systemSlice";
import thunk from "redux-thunk";

export const store_ = configureStore({
    reducer: {
        user: userReducer,
        system: systemReducer
    },
    middleware: [thunk]

})