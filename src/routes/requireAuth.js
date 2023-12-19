import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function RequireAuth({ allowedRoles }) {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth.role === allowedRoles ? <Outlet /> : auth?.accessToken //changed from user to accessToken to persist login after refresh
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

