import { createSlice } from "@reduxjs/toolkit";

export const themeDark = createSlice({
    name: 'themeDark',
    initialState: { themeDark: false },
    reducers: {
        setThemeDark: (state, action) => {
            state.themeDark = action.payload
        }        
    }
})

export const { setThemeDark } = themeDark.actions
export default themeDark.reducer