import { createSlice } from '@reduxjs/toolkit';

export interface SongStoreState {
    isPlaying: boolean;
}

export const songSlice = createSlice({
    name: 'song_store',
    initialState: (): SongStoreState => ({
        isPlaying: false,
    }),
    reducers: {
        togglePlaying: (state: SongStoreState) => {
            state.isPlaying = !state.isPlaying;
        },
    },
});

export const { togglePlaying } = songSlice.actions;

export default songSlice.reducer;
