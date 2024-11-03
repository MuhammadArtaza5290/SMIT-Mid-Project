import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './slices/noteSlice'
import authReducer from './slices/authSlice'
export const store = configureStore({
    reducer: {
       noteSlice: noteReducer, // Define your slice reducers here
       authSlice: authReducer, // Define your slice reducers here
    },
});