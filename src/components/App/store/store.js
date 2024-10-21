import { configureStore } from "@reduxjs/toolkit";
import deletedNewsData from "./deletedNewsData";
import newByEdit from "./newByEdit";
import newsData from "./newsData";
import themeDark from "./themeDark";

export const store = configureStore({
    reducer: {
        deletedNewsData: deletedNewsData,
        newByEdit: newByEdit,
        newsData: newsData,
        themeDark: themeDark
    }
})