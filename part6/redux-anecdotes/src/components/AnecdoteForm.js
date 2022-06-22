import { useDispatch } from "react-redux"
import { create } from '../reducers/anecdoteReducer'
import { setNotification, setNotificationVisibility } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(create(content))
    dispatch(setNotification(`You created '${content}'`))
    dispatch(setNotificationVisibility(true))
    setTimeout(() => dispatch(setNotificationVisibility(false)), 5000)
  }
  
  return (
    <div>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm