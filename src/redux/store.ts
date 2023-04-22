import { configureStore } from '@reduxjs/toolkit';
import playlistReducer from './slices/playlistSlice';
import songSlice from './slices/songSlice';

export default configureStore({
    reducer: {
        store: playlistReducer,
        song_store: songSlice,
    },
});
