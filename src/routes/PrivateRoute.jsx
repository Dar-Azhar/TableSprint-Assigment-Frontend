import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isLoggedin, loading } = useAuth();

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (!isLoggedin) {
        return <Navigate to="/" replace />;
    }

    return children || <Outlet />;
};

export default PrivateRoute;
