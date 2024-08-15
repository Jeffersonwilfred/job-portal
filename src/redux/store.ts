// store.ts
import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './jobSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    jobs: jobReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
