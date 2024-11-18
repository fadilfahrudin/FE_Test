import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slice/authSlice";
import { lalinApi } from './services/lalinService';
import {gerbangApi} from './services/gerbangService';
import gerbangSlcie from './slice/gerbangSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        gerbangsSlice: gerbangSlcie,
        [lalinApi.reducerPath]: lalinApi.reducer,
        [gerbangApi.reducerPath]: gerbangApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(lalinApi.middleware).concat(gerbangApi.middleware),
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch