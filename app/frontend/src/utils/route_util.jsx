import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function AuthRoute({ children }) {
    const sessionUser = useSelector(state => state.session.user);
    return (
        !sessionUser ? children : <Navigate to="/home" replace/>
    )
};

export function ProtectedRoute({ children }) {
    const sessionUser = useSelector(state => state.session.user);
    return (
        sessionUser ? children : <Navigate to="/" replace/>
    )
};