import React, { useContext, useState, useEffect } from 'react';

import { UserContext } from '../../context/UserContext';
import UserAvatar from '../../components/UserAvatar/UserAvatar'
import UsernameForm from '../../components/UsernameForm'
import useFetch from '../../hooks/useFetch';
import ErrorList from '../../components/ErrorList';
import './UserPage.css'


const UserPage = () => {
  const {data, getToken, logout} = useContext(UserContext)
  const [isConfirm, setIsConfirm] = useState(false)
  const [doFetch, response, loading, error] = useFetch('api/user')

  const deleteHandler = async () => {
    const token = await getToken()
    doFetch({
      method: 'delete',
      headers: {Authorization: token},
    })
  }

  useEffect(() => {
    if(!response) return
    logout()
  }, [response, logout])

  return (
    <div className="container">
      <h1>Profile settings</h1>
      <div className='settings-wrapper'>
        <UserAvatar />
        <div className='info-wrapper'>
          <p><strong>Email:</strong> {data.email}</p>
          <UsernameForm/>
        </div>
      </div>

          <button onClick={() => setIsConfirm(old => !old)} className="delete-btn" >Delete Account</button>
      {isConfirm && (
        <div  className="delete-wrapper">
          <button className="delete-btn" onClick={() => setIsConfirm(false)} >Cancel</button>
          <button className="delete-btn red" disabled={loading} onClick={deleteHandler}>Delete</button>
        </div>
      )}
      <ErrorList data={error} />
    </div>
  );
};

export default UserPage;