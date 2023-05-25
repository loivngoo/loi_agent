import { configureStore } from '@reduxjs/toolkit';
import { messageSlice } from './reducer/messageSlice';
export const store = configureStore({
    reducer: {
        message: messageSlice,
    },
});
