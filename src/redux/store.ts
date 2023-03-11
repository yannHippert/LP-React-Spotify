import { configureStore } from '@reduxjs/toolkit';
import playlistReducer from './slices/playlistSlice';

export default configureStore({
    reducer: {
        store: playlistReducer
    }
});
