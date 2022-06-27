import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const initialState = {
  anecdotes: []
}

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        upvote(state, action) {
            const id =  action.payload
            const votedAnecdote = state.anecdotes.find(a => a.id === id)
            const updatedAnecdote = {
              ...votedAnecdote,
              votes: votedAnecdote.votes +1
            }
            state.anecdotes = state.anecdotes.map(a => a.id === id ? updatedAnecdote: a)
            .sort((a, b) => b.votes - a.votes)
        },
        setAnecdotes(state, action) {
          state.anecdotes = action.payload
        },
        create(state, action)  {
          state.anecdotes = [...state.anecdotes, action.payload]
        }
    }
})

export const { upvote, setAnecdotes, create } = anecdoteSlice.actions
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes.sort(
      (a, b) => b.votes - a.votes
    )))
  }
}
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(create(newAnecdote))
  }
}
export const upvoteAnecdote = (id) => {
  return async dispatch => {
    const upvotedAnecdote = await anecdoteService.upvote(id)
    dispatch(upvote(upvotedAnecdote.id))
  }
}


export default anecdoteSlice.reducer