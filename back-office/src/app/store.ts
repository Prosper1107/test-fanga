import { configureStore, combineReducers } from '@reduxjs/toolkit'
import stationsReducer from '../features/stations/stationsSlice'
import { loadState, saveState } from './localStorage'

const preloadedState = loadState();

const rootReducer = combineReducers({
    stations: stationsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as any
})

store.subscribe(() => {
    saveState({
        stations: store.getState().stations
    });
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch