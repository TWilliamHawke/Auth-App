import React from 'react';
import { useDateTf } from '../../../hooks/useDateTf'

const ChatMessage = ({data, onDelete}) => {
  const {text, author, date, authorAvatar} = data
  const tfDate = useDateTf(date)

  return (
    <div className='message'>
      <div className='message-image'>
        <img src={authorAvatar} alt=''></img>
      </div>

      <div className='message-data'>
        <p className='message-author'>
          <b>{author}</b> in {tfDate} <span onClick={() => onDelete(data._id)}>del</span>
        </p>
        <p className='message-text'>{text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;