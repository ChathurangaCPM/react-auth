import React from 'react'

import { Link } from 'react-router-dom';
import useRefreshToken from '../hooks/useRefreshToken';


export default function Authpage() {
  const refresh = useRefreshToken();
  
  const logoutHandler = async () => {
    await refresh();
  }
  return (
    <div>
      autherist to view this page
      <Link to="/member">Go to members</Link>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  )
}
