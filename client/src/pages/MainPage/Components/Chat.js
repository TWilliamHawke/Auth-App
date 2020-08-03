import React, { useRef, useEffect } from 'react';
import './chat.css'
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { useScroll } from '../../../hooks/useScroll';

export const Chat = ({ socket, chatData, isLoading }) => {
  const chatPanel = useRef()
  const { scrollToBottom } = useScroll()
  const deleteMessage = id => {
    socket.emit('deleteMessage', id) 
  }

  const messages = chatData.map((message) => {
    return(
      <ChatMessage key={message._id} onDelete={deleteMessage} data={message} />
    )  
  }) 

  useEffect(() => {
    if(isLoading) return
    scrollToBottom(chatPanel)
  }, [isLoading, scrollToBottom])


  if(isLoading) return(
    <div className='chat'>
      <h2>...Loading</h2>
    </div>
  )

  console.log('data')

  return(
    <div className='chat'>
      <h2>Welcome to Chat!</h2>
        <div className='chat-listwrapper'>
        <div ref={chatPanel} className='chat-list'>
          {messages}
        </div>
        </div>
      <ChatInput socket={socket} />
    </div>
  )
}