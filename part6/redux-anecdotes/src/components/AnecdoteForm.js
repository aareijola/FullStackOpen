import { useDispatch } from "react-redux"
import { create } from '../reducers/anecdoteReducer'
import { setNotification, setNotificationVisibility } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    console.log(content)

    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(create(newAnecdote))
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