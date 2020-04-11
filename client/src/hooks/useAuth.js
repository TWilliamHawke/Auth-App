import { useState, useCallback, useEffect } from "react";
import useFetch from "./useFetch";

const storageName = 'userData'

const useAuth = () => {
  const [isReady, setIsReady] = useState(false)
  const [doFetch, , , error] = useFetch('/api/auth/refresh')
  const [data, setData] = useState({})

  const login = useCallback(user => {
    
    setData(user.userData)
    localStorage.setItem(storageName, JSON.stringify(user.userData))
    localStorage.setItem('tokens', JSON.stringify(user.tokenData))
  }, [])

  const logout = useCallback(() => {
    setData({})
    localStorage.removeItem(storageName)
    localStorage.removeItem('tokens')
    setIsReady(true)
  }, [])

  const requestNewToken = useCallback(async () => {
    
    const {refToken} = JSON.parse(localStorage.getItem('tokens'))

    const tokens = await doFetch({
      method: 'post',
      data: {
        refToken
      }
    })

    localStorage.setItem('tokens', JSON.stringify(tokens))
    return tokens
  }, [doFetch])

  const getToken = useCallback(async() => {
    const storageData = localStorage.getItem('tokens')
    if(!storageData) return
    const {token, tokenDie} = JSON.parse(storageData)

    if(Date.now() < tokenDie) {
      return `Bearer ${token}`
    } else { //token is die
      console.log('token is died')
      const {token} = await requestNewToken()
      return `Bearer ${token}`
    }
  }, [requestNewToken])

  const saveData = useCallback(data => {
    const storageData = localStorage.getItem(storageName)
    if(!storageData) return
    const user = JSON.parse(storageData)

    setData(old => ({...old, ...data}))
    localStorage.setItem(storageName, JSON.stringify({...user, ...data}))
  }, [])

  useEffect(() => {  //обновляем токены при входе
    const storageData = localStorage.getItem(storageName)
    if(!storageData) return logout()
    const data = JSON.parse(storageData)

    if(data) {
      requestNewToken()
        .then(() => {
          console.log(data);

          setData(data)
          setIsReady(true)
        })
    } else {
      logout()
    }
    
  }, [ logout, requestNewToken])

  useEffect(() => {
    if(!error) return
    logout()
  }, [error, logout])

  return { data, getToken, login, logout, isReady, saveData };
};

export default useAuth;