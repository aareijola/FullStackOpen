import react from "react"
import propTypes from "prop-types"


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

Alert.propTypes = {
    message: propTypes.string.isRequired
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

Error.propTypes = {
    message: propTypes.string.isRequired
}

export default { Alert, Error }