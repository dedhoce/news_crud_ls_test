import { createSlice } from "@reduxjs/toolkit";

export const newByEdit = createSlice({
    name: 'newByEdit',
    initialState: {
        newByEdit:  {title: '', text: '', _id: 0} 
    },
    reducers: {
        setData: (state, action) => {
            const {title, text, _id} = action.payload
            state.newByEdit = { ...state.newByEdit, title, text, _id }
        },
        setDefault: (state) => {
            state.newByEdit = { ...state.newByEdit, title: '', text: '', _id: 0 }
        }
    }
})

export const { setData, setDefault} = newByEdit.actions
export default newByEdit.reducer