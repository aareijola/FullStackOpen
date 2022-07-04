import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  alert: {
    message: 'Default alert',
    visible: false,
    timerId: null,
  },
  error: {
    message: 'Default error',
    visible: false,
    timerId: null,
  },
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setAlertMessage(state, action) {
      const message = action.payload
      state.alert.message = message
    },
    setErrorMessage(state, action) {
      const message = action.payload
      state.error.message = message
    },
    setAlertVisibility(state, action) {
      if (typeof action.payload === 'boolean') {
        state.alert.visible = action.payload
      }
    },
    setErrorVisibility(state, action) {
      if (typeof action.payload === 'boolean') {
        state.error.visible = action.payload
      }
    },
    setAlertTimerId(state, action) {
      clearTimeout(state.alert.timerId)
      state.alert.timerId = action.payload
    },
    setErrorTimerId(state, action) {
      clearTimeout(state.error.timerId)
      state.error.timerId = action.payload
    },
  },
})

export const {
  setAlertMessage,
  setErrorMessage,
  setAlertVisibility,
  setErrorVisibility,
  setAlertTimerId,
  setErrorTimerId,
} = notificationSlice.actions

export const setAlert = (message, duration) => {
  return async (dispatch) => {
    dispatch(setAlertMessage(message))
    dispatch(setAlertVisibility(true))
    dispatch(
      setAlertTimerId(
        setTimeout(() => dispatch(setAlertVisibility(false)), duration * 1000)
      )
    )
  }
}
export const setError = (message, duration) => {
  return async (dispatch) => {
    dispatch(setErrorMessage(message))
    dispatch(setErrorVisibility(true))
    dispatch(
      setErrorTimerId(
        setTimeout(() => dispatch(setErrorVisibility(false)), duration * 1000)
      )
    )
  }
}

export default notificationSlice.reducer
