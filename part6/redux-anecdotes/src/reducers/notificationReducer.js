import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  message: 'Default message',
  visible: false,
  timerId: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationMessage(state, action) {
      const message = action.payload
      state.message = message
    },
    toggleNotificationVisibility(state, action) {
      state.visible = !state.visible
    },
    setNotificationVisibility(state, action) {
      if (typeof (action.payload) === 'boolean') {
        state.visible = action.payload
      }
    },
    setTimerId(state, action) {
      clearTimeout(state.timerId)
      state.timerId = action.payload
    }
  }
})

export const { setNotificationMessage, toggleNotificationVisibility, setNotificationVisibility, setTimerId } = notificationSlice.actions
export const setNotification = ( message, duration ) => {
  return async dispatch => {
    dispatch(setNotificationMessage(message))
    dispatch(setNotificationVisibility(true))
    dispatch(setTimerId(setTimeout(() => dispatch(setNotificationVisibility(false)), duration * 1000)))
  }
}

export default notificationSlice.reducer