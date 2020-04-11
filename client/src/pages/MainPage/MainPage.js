import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const MainPage = () => {
  const user = useContext(UserContext)
  
  const getHandler = async () => {
    const token = await user.getToken()
    console.log(token)
  }

  return (
    <div className='container'>
      <h1>MainPage</h1>
      <button onClick={getHandler}>get totken</button>
    </div>
  );
};

export default MainPage;