import { createSlice } from '@reduxjs/toolkit';
import { Playlist } from '../../interfaces/playlist';
import { Song, SongData } from '../../interfaces/song';
import songList from '../../static/data.json';
import { generateGradient, seededGradient } from '../../utils/GradientGenerator';
import { getRandomSublist } from '../../utils/Getters';

import '../../extensions/string';
import { validateMinLength, validateUnique } from '../validations';

export interface AppState {
    playingSong: string;
    playingPlaylist: string;
    currentPlaylist: string;
    songs: { [key: string]: Song };
    playlists: Array<Playlist>;
}

const dataToSong = (data: SongData): Song => ({
    key: data.title.toString().toHash().toString(),
    title: data.title,
    artist: data.artist,
    genre: data.genre,
    duration: data.duration,
    popularity: data.popularity,
    year: data.year,
    isFavorite: Math.random() > 0.8
});

const getSongs = (): { [key: string]: Song } => {
    const songs: { [key: string]: Song } = {};
    for (const songData of songList as Array<SongData>) {
        const song: Song = dataToSong(songData);
        songs[song.key] = song;
    }
    return songs;
};

const createPlaylistObject = ({ name, isPersonal = true, gradient, songKeys = [] }: { name: string; isPersonal?: boolean; gradient?: string; songKeys?: Array<string> }) => {
    return {
        key: name.toHash().toString(),
        name,
        slug: name.toSlug(),
        gradient: gradient ?? seededGradient(name.toHash()),
        isPersonal: isPersonal,
        songKeys: songKeys
    };
};

const personalPlaylistNames = ['FAV', 'Daily Mix 1', 'Discover Weekly', 'Malayalam', 'Dance/Electronix Mix', 'EDM/Popular'];

const getLikedSongsPlaylist = (): Playlist => {
    const playlistName = 'Liked Songs';
    return createPlaylistObject({
        name: playlistName,
        isPersonal: false,
        gradient: 'linear-gradient(135deg, #4000F4 0%, #603AED 22.48%, #7C6EE6 46.93%, #979FE1 65.71%, #A2B3DE 77.68%, #ADC8DC 88.93%, #C0ECD7 100%)'
    });
};

const getTop50sPlaylists = (songsMap: { [key: string]: Song }): Array<Playlist> => {
    const map: { [key: string]: Playlist } = {};
    for (const song of Object.values(songsMap)) {
        if (song.year in map) map[song.year].songKeys.push(song.key);
        else {
            const playlistName = `Top 50 ${song.year}`;

            map[song.year] = createPlaylistObject({ name: playlistName, isPersonal: false, songKeys: [song.key] });
        }
    }
    Object.values(map).forEach((playlist) => (playlist.songKeys = playlist.songKeys.sort((a, b) => songsMap[b].popularity - songsMap[a].popularity)));
    return Object.values(map).sort((a, b) => b.name.localeCompare(a.name));
};

const getPersonalPlaylists = (songsMap: { [key: string]: Song }): Array<Playlist> => {
    return personalPlaylistNames.map((playlistName) => {
        const songList = getRandomSublist(Object.keys(songsMap));
        return createPlaylistObject({ name: playlistName, songKeys: songList.sort((a, b) => songsMap[b].popularity - songsMap[a].popularity) });
    });
};

export const playlistSlice = createSlice({
    name: 'store',
    initialState: (): AppState => {
        const songs = getSongs();
        const playlists = [getLikedSongsPlaylist(), ...getPersonalPlaylists(songs), ...getTop50sPlaylists(songs)];
        return {
            playingSong: playlists[1].songKeys[0],
            playingPlaylist: playlists[1].slug,
            currentPlaylist: '',
            songs: songs,
            playlists: playlists
        };
    },
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
                    cause: 'The name of a playlist must be unique'
                });
            }

            state.playlists.push(createPlaylistObject({ name: action.payload.name }));
        }
        /*
         onDragEnd: (state: State, action: { payload: { source: any; destination: any } }) => {
           const { source, destination } = action.payload;

      if (!destination) return;

      const { droppableId: sourceId } = source;
      const { droppableId: destinationId } = destination;
      const sourceCategory = getItemById(state.playlists, sourceId);
      const destionationCategory = getItemById(state.categories, destinationId);

      if (sourceId === destinationId) {
        const items = reorder(sourceCategory.items, source.index, destination.index);
        sourceCategory.items = items;
      } else {
        const result = move(sourceCategory.items, destionationCategory.items, source, destination);
        sourceCategory.items = result[sourceCategory.id];
        destionationCategory.items = result[destionationCategory.id];
      }
        }*/
    }
});

export const { setCurrentSong, setCurrentPlaylist, toggleFavorite, togglePlaylistSong, createPlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;
