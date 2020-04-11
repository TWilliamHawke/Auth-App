import React, { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../hooks/useFetch';
import ErrorList from './ErrorList';


const UsernameForm = () => {
  const {data, saveData, getToken} = useContext(UserContext)
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const input = useRef(null)
  const [doFetch, response, loading, error] = useFetch('/api/user')


  useEffect(() => {
    setUsername(data.name)
  }, [data.name])

  useEffect(() => {
    if(input.current) input.current.focus()
  },[input, isEdit])

  const formHandler = async () => {
    const token = await getToken()
    setName(username)
    await doFetch({
      method: 'PUT',
      headers: {Authorization: token},
      data:{ name: username }
    })
  }

  useEffect(() => {
    if(!response ) return
    saveData({name}) //может вызвать баги
    setIsEdit(false)
  }, [response, saveData, name])


  if(isEdit) return(
    <>
    <div className='profile-form'>
      <strong>User name:</strong>
      <input 
        className='user-input' 
        ref={input} 
        value={username} 
        onChange={e => setUsername(e.target.value)} />
      <button disabled={loading} className='username-btn active' onClick={formHandler} >
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </div>
    <ErrorList data={error} />
    </>
  )


  return(
    <div className='username-wrapper'>
      <span><strong>User name:</strong> {username}</span>
      <button className='username-btn' onClick={() => setIsEdit(true)}><FontAwesomeIcon icon={faEdit} /></button>
    </div>
  )
}

export default UsernameForm
