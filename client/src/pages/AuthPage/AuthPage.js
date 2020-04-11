import React, { useState, useEffect, useContext } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import './AuthPage.css'
import useFetch from '../../hooks/useFetch';
import { UserContext } from '../../context/UserContext';
import ErrorList from '../../components/ErrorList';

const AuthPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, SetName] = useState('')
  const {path} = useRouteMatch()
  const history = useHistory()
  const isRegPage = path === '/register'
  const [doFetch, isRegister, loading, regError, clearRError] = useFetch('/api/auth/register')
  const [doLogin, userData, logLoad, logError] = useFetch('/api/auth/login')
  const error = logError || regError
  const user = useContext(UserContext)

  const regHandler = async () => {
    clearRError()
    await doFetch({
       method: 'post',
       data: { email, password, name }
     })
    if(!regError) console.log('no errors')
  }

  useEffect(() => {
    if(!error) return
  }, [error])

  const logHandler = () => {
    doLogin({
      method: 'post',
      data: { email, password }
    })
    
  }

  useEffect(() => {
    if(regError || !isRegister) return
    history.push('/login')

  }, [isRegister, regError, history])

  useEffect(() => {
    if(!userData) return
    user.login(userData)
    history.push('/')
  }, [userData, history, user])

  useEffect(() => {
    clearRError()
  }, [clearRError])
  return (
    <div className="container auth">
      {isRegPage && <h1>Create account</h1>}
      {!isRegPage && <h1>Login</h1>}

      <ErrorList data={error} />
    <div className='auth-wrapper'>
      <input className='user-input' type="email" id="email" value={email} 
        onChange={e => setEmail(e.target.value)}
        placeholder="enter email" required />

      {isRegPage &&
      <>
        <label for="email">Работы с почтой здесь нет, так что можно писать несуществующий email</label>
        <input className='user-input' type="text" value={name} 
        onChange={e => SetName(e.target.value)}
        placeholder="enter Usermame" required />
      </>}

      <input className='user-input' type="password" value={password} 
        onChange={e => setPassword(e.target.value)}
        placeholder="enter password" required />
      {isRegPage && <button className='sendBtn' disabled={loading} onClick={regHandler} >Create account</button>}
      {!isRegPage && <button className='sendBtn' disabled={logLoad} onClick={logHandler} >Login</button>}
    </div>
  </div>
);
};

export default AuthPage;