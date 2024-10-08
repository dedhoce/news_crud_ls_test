import {NEWS_ARRAY} from '../../../constants/arrayNewsForTest'
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newsData: JSON.parse(localStorage.getItem('news')) || NEWS_ARRAY.map(item => ({ ...item, _id: Math.random() }))
}

export const newsData = createSlice({
    name: "newsData",
    initialState: initialState,
    reducers: {
        setNewDelete: (state, action) => {
            state.newsData = state.newsData.filter(i => i._id !== action.payload)
        },
        setNewUpdate: (state, action) => {            
            state.newsData = state.newsData.map(i => i._id === action.payload._id ? action.payload : i)
        },
        setNewCreate: (state, action) => {                 
            state.newsData = [...state.newsData, { ...action.payload, _id: Math.random() }]
        }
    }
})

export const { setNewDelete, setNewUpdate, setNewCreate } = newsData.actions
export default newsData.reducer