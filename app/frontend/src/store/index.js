import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import { sessionReducer, sessionErrorReducer } from './session';
import meetingsReducer from './meetings';

const rootReducer = {
    session: sessionReducer,
    errors: sessionErrorReducer,
    meetings: meetingsReducer
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV === 'production'
})