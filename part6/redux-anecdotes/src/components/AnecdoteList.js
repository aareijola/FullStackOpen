import { useSelector, useDispatch } from 'react-redux'
import { upvoteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, setNotificationVisibility } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter.text)  
  const anecdotes = useSelector(state => state.anecdotes.anecdotes.filter(
    a => a.content.toLowerCase().includes(filter.toLowerCase())
  ))
  const dispatch = useDispatch()
  const vote = (anecdote) => {
    dispatch(upvoteAnecdote(anecdote.id))
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
          has {anecdote.votes} votes
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList
