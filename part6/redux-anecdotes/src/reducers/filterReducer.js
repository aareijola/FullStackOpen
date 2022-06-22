import { createSlice } from "@reduxjs/toolkit"

const initialState = {text : ''}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action) {
            state.text = action.payload
        },
        resetFilter(state, action) {
            state.text = ''
        }
    }
})

export const { setFilter, resetFilter } = filterSlice.actions
export default filterSlice.reducer