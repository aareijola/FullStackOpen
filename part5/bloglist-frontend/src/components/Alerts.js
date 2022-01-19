import react from "react"

const Alert = ({message}) => {
    if (message === '') {
        return null
    } else {
        return (
            <div className="alert">
                {message}
            </div>
        )
    }
}

const Error = ({message}) => {
    if (message === '') {
        return null
    } else {
        return (
            <div className="error">
                {message}
            </div>
        )
    }
}

export default { Alert, Error }