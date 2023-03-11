import { createSlice } from '@reduxjs/toolkit';
import { PlaylistData } from '../../interfaces/playlist';
import { Song, SongData } from '../../interfaces/song';
import songList from '../../static/data.json';
import { generateGradient } from '../../utils/GradientGenerator';
import { getRandomSublist } from '../../utils/Getters';

import '../../extensions/string';

export interface AppState {
    playingSong: string;
    playingPlaylist: string;
    currentPlaylist: string;
    songs: { [key: string]: Song };
    playlists: Array<PlaylistData>;
}

const dataToSong = (data: SongData): Song => ({
    key: data.title.toString().toHash(),
    title: data.title,
    artist: data.artist,
    genre: data.genre,
    duration: data.duration,
    popularity: data.popularity,
    year: data.year,
    isFavorite: Math.random() > 0.5
});
const getSongs = (): { [key: string]: Song } => {
    const songs: { [key: string]: Song } = {};
    for (const songData of songList as Array<SongData>) {
        const song: Song = dataToSong(songData);
        songs[song.key] = song;
    }
    return songs;
};

const personalPlaylistNames = ['FAV', 'Daily Mix 1', 'Discover Weekly', 'Malayalam', 'Dance/Electronix Mix', 'EDM/Popular'];

const getTop50sPlaylists = (songsMap: { [key: string]: Song }): Array<PlaylistData> => {
    const map: { [key: string]: PlaylistData } = {};
    for (const song of Object.values(songsMap)) {
        if (song.year in map) map[song.year].songKeys.push(song.key);
        else {
            const playlistName = `Top 50 ${song.year}`;

            map[song.year] = {
                key: playlistName.toHash(),
                name: playlistName,
                gradient: generateGradient(),
                isPersonal: false,
                songKeys: [song.key]
            };
        }
    }
    Object.values(map).forEach((playlist) => (playlist.songKeys = playlist.songKeys.sort((a, b) => songsMap[b].popularity - songsMap[a].popularity)));
    return Object.values(map).sort((a, b) => b.name.localeCompare(a.name));
};

const getPersonalPlaylists = (songsMap: { [key: string]: Song }): Array<PlaylistData> => {
    return personalPlaylistNames.map((name) => {
        const songList = getRandomSublist(Object.keys(songsMap));
        return {
            key: name.toHash(),
            name,
            gradient: generateGradient(),
            isPersonal: true,
            songKeys: songList.sort((a, b) => songsMap[b].popularity - songsMap[a].popularity)
        };
    });
};

export const playlistSlice = createSlice({
    name: 'store',
    initialState: (): AppState => {
        const songs = getSongs();
        const playlists = [...getPersonalPlaylists(songs), ...getTop50sPlaylists(songs)];
        return {
            playingSong: playlists[0].songKeys[0],
            playingPlaylist: playlists[0].key,
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
        setCurrentPlaylist: (state: AppState, action: { payload: { playlistKey: string } }) => {
            state.currentPlaylist = action.payload.playlistKey;
        },
        toggleFavorite: (state: AppState, action: { payload: { songKey: string } }) => {
            state.songs[action.payload.songKey].isFavorite = !state.songs[action.payload.songKey].isFavorite;
        },
        togglePlaylistSong: (state: AppState, action: { payload: { playlistKey: string; songKey: string } }) => {
            const playlistIndex = state.playlists.findIndex(({ key }: PlaylistData) => key === action.payload.playlistKey);

            const songIndex = state.playlists[playlistIndex].songKeys.findIndex((songKey) => songKey === action.payload.songKey);
            if (songIndex !== -1) {
                state.playlists[playlistIndex].songKeys.splice(songIndex, 1);
            } else {
                console.log(action.payload.songKey);
                state.playlists[playlistIndex].songKeys.push(action.payload.songKey);
            }
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

export const { setCurrentSong, setCurrentPlaylist, toggleFavorite, togglePlaylistSong } = playlistSlice.actions;

export default playlistSlice.reducer;
