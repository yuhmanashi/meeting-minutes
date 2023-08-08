import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import { sessionReducer } from './session';
import { sessionErrorReducer } from './session_errors';
import meetingsReducer from './meetings';
import studentsReducer from './students';
import watchlistsReducer from './watchlists';
import pinsReducer from './pins';

const rootReducer = {
    session: sessionReducer,
    errors: sessionErrorReducer,
    meetings: meetingsReducer,
    students: studentsReducer,
    watchlists: watchlistsReducer,
    pins: pinsReducer,
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV === 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch