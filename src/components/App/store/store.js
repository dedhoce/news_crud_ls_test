import { configureStore } from "@reduxjs/toolkit";
import popupStatus from "./popupStatus";
import newByEdit from "./newByEdit";
import newsData from "./newsData";

export const store = configureStore({
    reducer: {
        popup: popupStatus,
        newByEdit: newByEdit,
        newsData: newsData
    }
})