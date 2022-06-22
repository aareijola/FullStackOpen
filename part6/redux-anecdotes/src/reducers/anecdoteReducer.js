const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case 'UPVOTE':
      const id = action.data.id
      const votedAnecdote = state.find(a => a.id === id)
      const updatedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes +1
      }
      return state.map(a => a.id === id ? updatedAnecdote : a).sort(
        (a, b) => b.votes - a.votes
      )
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'SET':
      return action.data
    default:
     return state
  }
}

export const setAnecdotes = (anecdotes) => {
  return {
    type: 'SET',
    data: anecdotes
  }
}

export const upvote = (id) => {
  return {
    type: 'UPVOTE',
    data: { id }
  }
}

export const create = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    // data: asObject(content)
    data: content
  }
}

export default reducer