import { configureStore } from '@reduxjs/toolkit';
import songsReducer from './slices/songsSlice';
import playerReducer from './slices/playerSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    player: playerReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;