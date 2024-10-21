import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deletedNewsData: JSON.parse(localStorage.getItem('deletedNews')) || []
}

export const deletedNewsData = createSlice({
    name: 'deletedNewsData',
    initialState: initialState,
    reducers: {
        setDelete: (state, action) => {
            state.deletedNewsData = state.deletedNewsData.filter(i => i._id !== action.payload)
        },
        setUpdate: (state, action) => {            
            state.deletedNewsData = state.deletedNewsData.map(i => i._id === action.payload._id ? action.payload : i)
        },
        setCreate: (state, action) => {                 
            state.deletedNewsData = [...state.deletedNewsData, { ...action.payload }]
        }
    }
})

export const { setDelete, setUpdate, setCreate } = deletedNewsData.actions
export default deletedNewsData.reducer