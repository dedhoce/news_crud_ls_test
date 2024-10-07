import { createSlice } from "@reduxjs/toolkit";

export const popupStatus = createSlice({
    name: 'popup',
    initialState: { isOpenPopup: false },
    reducers: {
        setStatusActive: (state) => {
            state.isOpenPopup = true
        },
        setStatusDisabled: (state) => {
            state.isOpenPopup = false
        }
    }
})

export const { setStatusActive, setStatusDisabled } = popupStatus.actions
export default popupStatus.reducer