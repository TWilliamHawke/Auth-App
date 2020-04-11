import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'
import { UserContext } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const {data, isReady, logout} = useContext(UserContext)
  const { name, avatar } = data

  return (
    <nav className='navbar'>
      <ul className='container'>
      {!name && isReady && (
        <>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        </>
      )}
      {name && isReady && (
        <>
          <li><Link to="/user" >
            {avatar && <img className='avatar-mini' src={avatar} alt='user avatar' />}
            {name}
            {!avatar && <FontAwesomeIcon icon={faCog} />}
          </Link></li>
          <li><a onClick={() => logout()} href="/">Logout</a></li>
        </>
      )}
      {!isReady && <li>Wait...</li>}
      </ul>
    </nav>
  );
};



export default Navbar;