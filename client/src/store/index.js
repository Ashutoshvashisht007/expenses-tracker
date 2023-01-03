import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth.js"

export default configureStore({
    reducer: {
        auth: authReducer,
    },
});