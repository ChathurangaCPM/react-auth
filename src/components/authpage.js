import React from 'react'

import { Link } from 'react-router-dom';
import useRefreshToken from '../hooks/useRefreshToken';
import useLogout from '../hooks/useLogout';


export default function Authpage() {
  const logout = useLogout();
  
  const logoutHandler = async () => {
    await logout();
  }
  return (
    <div>
      autherist to view this page
      <Link to="/member">Go to members</Link>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  )
}
