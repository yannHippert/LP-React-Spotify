import { createSlice } from '@reduxjs/toolkit';
import { Playlist } from '../../interfaces/playlist';
import { Song } from '../../interfaces/song';
import { compare } from '../../utils/Comparer';
import songs from '../../static/data.json';
import { getRandomId } from '../../utils/IdGenerator';

interface State {
    personal: Array<Playlist>;
    top50s: Array<Playlist>;
}

const getTop50sPlaylists = (): Array<Playlist> => {
    const map: { [key: string | number]: Playlist } = {};
    for (const song of songs as Array<Song>) {
        if (song.year in map) map[song.year].songs.push(song);
        else
            map[song.year] = {
                id: getRandomId(),
                name: `Top 50 ${song.year}`,
                songs: [song],
            };
    }
    songs.forEach((song: any) => {});
    const top50s = Object.values(map).sort((a, b) =>
        b.name.localeCompare(a.name)
    );
    top50s.forEach(
        (playlist) =>
            (playlist.songs = playlist.songs.sort(
                (a, b) => a.popularity - b.popularity
            ))
    );
    return top50s;
};

export const playlistSlice = createSlice({
    name: 'playlist',
    initialState: {
        personal: [],
        top50s: getTop50sPlaylists(),
    },
    reducers: {
        toggleFavorite: (
            state: State,
            action: { payload: { playlistId: string; song: Song } }
        ) => {
            const playlistIndex = state.personal.findIndex(
                ({ id }: Playlist) => id === action.payload.playlistId
            );

            const songIndex = state.personal[playlistIndex].songs.findIndex(
                (song: Song) => compare(song, action.payload.song)
            );

            if (songIndex !== -1) {
                state.personal[playlistIndex].songs.push(action.payload.song);
            } else {
                state.personal[playlistIndex].songs.slice(songIndex, 1);
            }
        },
        onDragEnd: (
            state: State,
            action: { payload: { source: any; destination: any } }
        ) => {
            /*const { source, destination } = action.payload;

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
      }*/
        },
    },
});

export const { toggleFavorite, onDragEnd } = playlistSlice.actions;

export default playlistSlice.reducer;
