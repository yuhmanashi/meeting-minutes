import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import sessionReducer from './session';

const rootReducer = {
    session: sessionReducer
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV === 'production'
})