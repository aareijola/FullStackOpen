import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    message: 'Default message',
    visible: false
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            const message = action.payload
            state.message = message
        },
        toggleVisibility(state, action) {
            state.visible = !state.visible
        }
    }
})

export const { setNotification, toggleVisibility } = notificationSlice.actions
export default notificationSlice.reducer