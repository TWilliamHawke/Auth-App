import React, { useContext, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import TextAreaAutoSize from 'react-textarea-autosize'

const ChatInput = ({socket}) => {
  const { data } = useContext(UserContext)
  const { name, avatar } = data
  const [newMessage, setNewMessage] = useState('')

  const inputHandler = e => {
    setNewMessage(e.target.value)
  }

  const buttonHandler = () => {
    const messageData = {
      author: name,
      authorAvatar: avatar,
      text: newMessage
    }
    socket.emit('sendMessage', messageData)
    setNewMessage('')
  }

  return (
    <div className='chat-input'>
      <TextAreaAutoSize
        onChange={inputHandler}
        value={newMessage}
      ></TextAreaAutoSize>
      <button onClick={buttonHandler}>Send</button>
    </div>
  );
};

export default ChatInput;
