import { configureStore } from '@reduxjs/toolkit';
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

const middlewares = []

if (process.env.NODE_ENV !== "production") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV === 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch