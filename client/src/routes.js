import React, { useContext } from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import MainPage from "./pages/MainPage"
import AuthPage from "./pages/AuthPage"
import { UserContext } from './context/UserContext'
import UserPage from './pages/UserPage/UserPage'


export default () => {
  const user = useContext(UserContext)
  if(!user.isReady) return <h1>Loading...</h1>

  if(user.data.name) return(
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/user" component={UserPage} />
      <Redirect to='/' />
    </Switch>
  )

  
  return(
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/login" component={AuthPage} />
      <Route path="/register" component={AuthPage} />
      <Redirect to='/' />
    </Switch>

  )
}