import React from 'react'
import { useSelector } from "react-redux";

export default function Notification() {
  const notification = useSelector((state) => state.noti);
  if (!notification.typeNoti &&! notification.content) {
    return null
  }
  return (
    <div>
      <p className={notification.typeNoti === 'error' ? 'error' : 'noti'}>{notification.content}</p>
    </div>
  )
}
