import React from 'react'

const Notification = ({ message, content }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={content}>
        {message}
      </div>
    )
  }

export default Notification
