import { createSlice } from '@reduxjs/toolkit';
import { Playlist } from '../../interfaces/playlist';
import { Song } from '../../interfaces/song';

import '../../extensions/string';
import { validateMinLength, validateUnique } from '../utils/validations';
import { createPlaylistObject, getInitialState } from '../utils/initialGenerator';

export interface AppState {
    playingSong: string;
    playingPlaylist: string;
    currentPlaylist: string;
    songs: { [key: string]: Song };
    playlists: Array<Playlist>;
}

export const playlistSlice = createSlice({
    name: 'store',
    initialState: (): AppState => getInitialState(),
    reducers: {
        setCurrentSong: (state: AppState, action: { payload: { songKey: string } }) => {
            state.playingSong = action.payload.songKey;
            state.playingPlaylist = state.currentPlaylist;
        },
        setCurrentPlaylist: (state: AppState, action: { payload: { playlistSlug: string } }) => {
            state.currentPlaylist = action.payload.playlistSlug;
        },
        toggleFavorite: (state: AppState, action: { payload: { songKey: string } }) => {
            state.songs[action.payload.songKey].isFavorite = !state.songs[action.payload.songKey].isFavorite;
        },
        togglePlaylistSong: (state: AppState, action: { payload: { playlistKey: string; songKey: string } }) => {
            const playlistIndex = state.playlists.findIndex(({ key }: Playlist) => key === action.payload.playlistKey);

            const songIndex = state.playlists[playlistIndex].songKeys.findIndex((songKey) => songKey === action.payload.songKey);
            if (songIndex !== -1) {
                state.playlists[playlistIndex].songKeys.splice(songIndex, 1);
            } else {
                state.playlists[playlistIndex].songKeys.push(action.payload.songKey);
            }
        },
        createPlaylist: (state: AppState, action: { payload: { name: string } }) => {
            validateMinLength(action.payload.name, 2);
            try {
                validateUnique('slug', state.playlists, action.payload.name.toSlug());
            } catch (e) {
                throw new Error('Slug already exists', {
                    cause: 'The name of a playlist must be unique',
                });
            }

            state.playlists.push(createPlaylistObject({ name: action.payload.name }));
        },
    },
});

export const { setCurrentSong, setCurrentPlaylist, toggleFavorite, togglePlaylistSong, createPlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;
