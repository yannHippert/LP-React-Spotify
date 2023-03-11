import { createSlice } from '@reduxjs/toolkit';
import { Playlist, PlaylistData } from '../../interfaces/playlist';
import { Song, SongData } from '../../interfaces/song';
import songList from '../../static/data.json';
import { generateGradient } from '../../utils/GradientGenerator';
import { getItemByOrNull, getRandomSublist } from '../../utils/Getters';
import { getItemBy, getItemOrNullById } from '../../utils/Getters';

import '../../extensions/string';

export interface AppState {
    playingSong: Song | null;
    playingPlaylist: PlaylistData | null;
    currentPlaylist: Playlist | null;
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
        return {
            playingSong: null,
            playingPlaylist: null,
            currentPlaylist: null,
            songs: songs,
            playlists: [...getPersonalPlaylists(songs), ...getTop50sPlaylists(songs)]
        };
    },
    reducers: {
        setCurrentSong: (state: AppState, action: { payload: { songKey: string } }) => {
            state.playingPlaylist = getItemBy('key', state.playlists, state.currentPlaylist!.key);
            state.playingSong = action.payload.songKey === undefined ? null : state.songs[action.payload.songKey];
        },
        setCurrentPlaylist: (state: AppState, action: { payload: { playlistKey: string | undefined } }) => {
            console.log('Setting current playlist');

            if (action.payload.playlistKey === undefined) {
                state.currentPlaylist = null;
            } else {
                const playlistData = getItemByOrNull('key', state.playlists, action.payload.playlistKey);
                if (playlistData === undefined) {
                    state.currentPlaylist = null;
                    return;
                }

                state.currentPlaylist = {
                    ...playlistData,
                    songs: playlistData.songKeys.map((songId: string) => state.songs[songId])
                };
            }
        },
        toggleFavorite: (state: AppState, action: { payload: { songKey: string } }) => {
            const newFavoriteState = !state.songs[action.payload.songKey].isFavorite;
            state.songs[action.payload.songKey].isFavorite = newFavoriteState;

            if (state.currentPlaylist) {
                const songIndex = state.currentPlaylist.songs.findIndex(({ key }: Song) => key === action.payload.songKey);
                if (songIndex !== -1) state.currentPlaylist.songs[songIndex].isFavorite = newFavoriteState;
            }

            if (state.playingSong?.key === action.payload.songKey) {
                state.playingSong.isFavorite = newFavoriteState;
            }
        },
        togglePlaylistSong: (state: AppState, action: { payload: { playlistKey: string; songKey: string } }) => {
            const playlist = getItemBy('key', state.playlists, action.payload.playlistKey);

            const songIndex = playlist.songKeys.findIndex((songKey) => (songKey = action.payload.songKey));
            if (songIndex !== -1) {
                console.log(songIndex);
                playlist.songKeys = playlist.songKeys.splice(songIndex, 1);
            }

            if (state.currentPlaylist?.key === action.payload.playlistKey) {
                console.log('Updating current playlist');

                state.currentPlaylist = {
                    ...state.currentPlaylist,
                    songs: state.currentPlaylist.songKeys.map((songId: string) => state.songs[songId])
                };
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
