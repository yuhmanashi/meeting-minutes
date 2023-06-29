import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import { useSelector } from 'react-redux';

export function AuthRoute({ component: Component, ...otherProps}) {
    const sessionUser = useSelector(state => state.session.user);
    return (
        <Route 
            {...otherProps}
            render={props => (
                !sessionUser ? <Component {...props} /> : <Redirect to="/home" />
            )}
        />
    )
};

export function ProtectedRoute({ component: Component, ...otherProps}) {
    const sessionUser = useSelector(state => state.session.user);
    return (
        <Route
            {...otherProps}
            render={props => (
                sessionUser ? <Component {...props} /> : <Redirect to="/" />
            )}
        />
    )
};