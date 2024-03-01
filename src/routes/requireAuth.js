import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function RequireAuth({ allowedRoles }) {
    const { auth, persist } = useAuth();
    const location = useLocation();

    console.log('auth====', auth);
    return (
        auth?.user?.roles === allowedRoles ? <Outlet /> : persist //changed from user to accessToken to persist login after refresh
            ? <Navigate to="/authpage" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

