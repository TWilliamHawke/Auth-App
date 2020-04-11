import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch';
import { UserContext } from '../../context/UserContext';


const UserAvatar = () => {
  const {getToken, data, saveData} = useContext(UserContext)
  const [doFetch, response, loading, error] = useFetch('/api/user')

  const fileHandler = async e => {
    const file = e.target.files[0]
    const token = await getToken()
    const formData = new FormData();
    formData.append('avatar', file)

    doFetch({
      method: 'post',
      headers: {
        Authorization: token
      },
      data: formData
    })
  }

  useEffect(() => {
    if(!error) return
    console.log(error)
  }, [error])

  useEffect(() => {
    if(!response) return
    saveData({ avatar: response.path })

  }, [response, saveData])

  if(loading) return(
    <div className='avatar'>
      ...loading...
    </div>
  )

  return(
  <div className='avatar'>
    <input id="avatar" name="avatar" onChange={fileHandler} type='file' accept=".png, .jpg, .jpeg"/>
    <label htmlFor="avatar">
      {data.avatar && <img src={data.avatar} alt="user avatar"></img>}
      <p>No avatar </p>
      <FontAwesomeIcon icon={faCamera} />
    </label>
  </div>

  )
}

export default UserAvatar