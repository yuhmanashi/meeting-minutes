import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

const rootReducer = {
    
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV === 'production'
})