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
        toggleNotificationVisibility(state, action) {
            state.visible = !state.visible
        },
        setNotificationVisibility(state, action) {
            if (typeof(action.payload) === 'boolean') {
                state.visible = action.payload
            }
        }
    }
})

export const { setNotification, toggleNotificationVisibility, setNotificationVisibility } = notificationSlice.actions
export default notificationSlice.reducer