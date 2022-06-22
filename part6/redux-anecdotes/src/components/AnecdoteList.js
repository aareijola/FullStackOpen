import { useSelector, useDispatch } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'
import { setNotification, setNotificationVisibility } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(upvote(anecdote.id))
    dispatch(setNotification(`You upvoted '${anecdote.content}'`))
    dispatch(setNotificationVisibility(true))
    setTimeout(() => dispatch(setNotificationVisibility(false)), 5000)
  }

  return (
    <div>{anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList
