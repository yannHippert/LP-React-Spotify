import { createSlice } from '@reduxjs/toolkit';
import { Playlist } from '../../interfaces/playlist';
import { Song } from '../../interfaces/song';

import '../../extensions/string';
import { validateMinLength, validateUnique } from '../utils/validations';
import { createPlaylistObject, getInitialState } from '../utils/initialGenerator';
import { getItemBy } from '../../utils/Getters';

const liked_songs = 'liked-songs';

export interface AppState {
    playingSong: string;
    playingPlaylist: string;
    currentPlaylist: string;
    songs: { [key: string]: Song };
    playlists: Array<Playlist>;
    isPlaying: boolean;
}

export const playlistSlice = createSlice({
    name: 'store',
    initialState: (): AppState => getInitialState(),
    reducers: {
        setPlayingPlaylist: (state: AppState, action: { payload: { playlistSlug: string } }) => {
            const playingPlaylist = getItemBy('slug', state.playlists, action.payload.playlistSlug);
            state.playingPlaylist = action.payload.playlistSlug;
            if (action.payload.playlistSlug === liked_songs) {
                state.playingSong = Object.values(state.songs).find(({ isFavorite }) => isFavorite)!.key;
            } else {
                state.playingSong = playingPlaylist.songKeys[0];
            }
            state.isPlaying = true;
        },
        setPlayingSong: (state: AppState, action: { payload: { songKey: string } }) => {
            state.playingSong = action.payload.songKey;
            state.playingPlaylist = state.currentPlaylist;
        },
        previousSong: (state: AppState) => {
            const playingPlaylist = getItemBy('slug', state.playlists, state.playingPlaylist);
            const songs =
                state.playingPlaylist === liked_songs
                    ? Object.values(state.songs)
                          .filter(({ isFavorite }) => isFavorite)
                          .map(({ key }) => key)
                    : playingPlaylist.songKeys;
            const index = songs.findIndex((value: string) => value === state.playingSong);
            if (index === 0) state.playingSong = songs[songs.length - 1];
            else state.playingSong = songs[index - 1];
            if (!state.isPlaying) state.isPlaying = true;
        },
        togglePlaying: (state: AppState) => {
            state.isPlaying = !state.isPlaying;
        },
        nextSong: (state: AppState) => {
            const playingPlaylist = getItemBy('slug', state.playlists, state.playingPlaylist);
            const songs =
                state.playingPlaylist === liked_songs
                    ? Object.values(state.songs)
                          .filter(({ isFavorite }) => isFavorite)
                          .map(({ key }) => key)
                    : playingPlaylist.songKeys;
            const index = songs.findIndex((value: string) => value === state.playingSong);
            if (index === songs.length - 1) state.playingSong = songs[0];
            else state.playingSong = songs[index + 1];
            if (!state.isPlaying) state.isPlaying = true;
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
            if (songIndex !== -1) state.playlists[playlistIndex].songKeys.splice(songIndex, 1);
            else state.playlists[playlistIndex].songKeys.push(action.payload.songKey);
        },
        createPlaylist: (state: AppState, action: { payload: { name: string } }) => {
            validateMinLength(action.payload.name, 2);
            try {
                validateUnique('slug', state.playlists, action.payload.name.toSlug());
            } catch (error) {
                throw new Error('Slug already exists', {
                    cause: 'The name of a playlist must be unique',
                });
            }

            state.playlists.push(createPlaylistObject({ name: action.payload.name }));
        },
    },
});

export const {
    setPlayingPlaylist,
    setPlayingSong,
    nextSong,
    previousSong,
    togglePlaying,
    setCurrentPlaylist,
    toggleFavorite,
    togglePlaylistSong,
    createPlaylist,
} = playlistSlice.actions;

export default playlistSlice.reducer;
