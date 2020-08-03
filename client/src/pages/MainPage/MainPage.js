import React, { useContext } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { UserContext } from '../../context/UserContext';
import { Chat } from './Components/Chat'


const MainPage = () => {
  const { socket, isLoading, chatData } = useSocket()
  const { data } = useContext(UserContext)
  const { name } = data

  return (
    <div className='container'>
      <h1>MainPage</h1>
      {name && <Chat isLoading={isLoading} socket={socket} chatData={chatData} />}
    </div>
  );
};

export default MainPage;