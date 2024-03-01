/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import useLogout from '../hooks/useLogout'
import axios from '../api/axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useRefreshToken from '../hooks/useRefreshToken';
import axiosInstance from '../api/axios';

export default function Members() {
    const navigate = useNavigate();
    const logout = useLogout();

    const refresh = useRefreshToken();

    const [users, setUsers] = useState();
    

    const logoutHandler = async () => {
        await logout();
        // navigate('/login');
    }

    useEffect(() => {
      const getUsers = async () => {
        try {
          await refresh();
          const res = await axiosInstance.get('/auth/employed');

          console.log('res ===', res);

        } catch (error) {
          console.log(error)
        }
      }

      getUsers();

    }, []);
  return (
    <div>
      This is member page
      <button onClick={() => refresh()}>Logout</button>
    </div>
  )
}
