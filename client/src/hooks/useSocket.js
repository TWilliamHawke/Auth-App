import openSocket from 'socket.io-client'
import { useEffect, useState } from 'react'

export const useSocket = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [chatData, setChatData] = useState([])
  const [socket, setSocket] = useState(null)

  // open socket and gain old messages on first render
  useEffect(() => {
    const socket = openSocket('http://localhost:5000')
    socket.emit('getOldMessages', '')
    setSocket(socket)
    socket.on('getOldMessages', messages => setChatData(messages.reverse()))
    socket.on('sendMessage', message => setChatData(old => {
      return [...old, message]
    }))
    socket.on('deleteMessageS', async id => {
      console.log('delete', id)
      setChatData(oldData => oldData.filter(item => item._id !== id))
    })
    // eslint-disable-next-line
  }, [])
  
  // disable loading after receiving data
  useEffect(() => {
    if(!chatData.length) return
    setIsLoading(false)
  }, [chatData])

  return {
    isLoading,
    chatData,
    socket
  }
}