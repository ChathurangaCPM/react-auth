import React from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function PublicRoutes() {
    const { auth, persist } = useAuth();
    const location = useLocation();

    console.log('auth====', auth);
    return (
        auth?.user ? <Navigate to="/authpage" state={{ from: location }} replace /> : <Outlet />
    )
}
