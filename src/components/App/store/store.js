import { configureStore } from "@reduxjs/toolkit";
import popupStatus from "./popupStatus";

export const store = configureStore({
    reducer: {
        popup: popupStatus,
    }
})