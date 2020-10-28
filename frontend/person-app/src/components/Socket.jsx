import React, { useState } from 'react'

export default function Socket(props) {
  const[socket] = useState(new WebSocket("ws://localhost:8000/ws"))
  const[msg,setMsg] = useState("")

  socket.onopen = () => {
    console.log("Successfully Connected");
  }
  socket.onmessage = (event) => {
    setMsg(event.data)
    props.rerender()
    setTimeout(() => {
      setMsg("")
    },2000)
  }

  const loadNotification = () => {
    if (msg !== "") {
      return (
        <div className="absolute right-0 bg-white rounded p-2">
        <h1>
          {msg}
        </h1>
      </div>
      )
    } else {
      return ""
    }
  }
  socket.onerror = error => {
    console.log("Socket Error: ", error);
  }

  return (
    <div>
      {loadNotification()}
    </div>
  )

}