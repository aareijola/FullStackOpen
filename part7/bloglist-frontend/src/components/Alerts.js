import React from 'react'
import { useSelector } from 'react-redux'

const Alert = () => {
  const alert = useSelector((state) => state.notification.alert)
  if (!alert.visible) {
    return null
  } else {
    return <div className="alert">{alert.message}</div>
  }
}

const Error = () => {
  const error = useSelector((state) => state.notification.error)
  if (!error.visible) {
    return null
  } else {
    return <div className="error">{error.message}</div>
  }
}

export default { Alert, Error }
