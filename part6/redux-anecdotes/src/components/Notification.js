import { connect } from "react-redux"

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    props.visible ?
    <div style={style}>
      {props.message}
    </div>
    : <div/>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
    visible: state.notification.visible
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification