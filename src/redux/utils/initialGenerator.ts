import { Playlist } from '../../interfaces/playlist';
import { Song, SongData } from '../../interfaces/song';
import songList from '../../static/data.json';
import { seededGradient } from '../../utils/GradientGenerator';
import { getRandomSublist } from '../../utils/Getters';

import '../../extensions/string';

const personalPlaylistNames = ['FAV', 'Daily Mix 1', 'Discover Weekly', 'Malayalam', 'Dance/Electronix Mix', 'EDM/Popular'];

const dataToSong = (data: SongData): Song => ({
    key: data.title.toString().toHash().toString(),
    title: data.title,
    artist: data.artist,
    genre: data.genre,
    duration: data.duration,
    popularity: data.popularity,
    year: data.year,
    isFavorite: Math.random() > 0.8,
});

const getSongs = (): { [key: string]: Song } => {
    const songs: { [key: string]: Song } = {};
    for (const songData of songList as Array<SongData>) {
        const song: Song = dataToSong(songData);
        songs[song.key] = song;
    }
    return songs;
};

export const createPlaylistObject = ({ name, isPersonal = true, gradient, songKeys = [] }: { name: string; isPersonal?: boolean; gradient?: string; songKeys?: Array<string> }) => {
    return {
        key: name.toHash().toString(),
        name,
        slug: name.toSlug(),
        gradient: gradient ?? seededGradient(name.toHash()),
        isPersonal: isPersonal,
        songKeys: songKeys,
    };
};

const getLikedSongsPlaylist = (): Playlist => {
    const playlistName = 'Liked Songs';
    return createPlaylistObject({
        name: playlistName,
        isPersonal: false,
        gradient: 'linear-gradient(135deg, #4000F4 0%, #603AED 22.48%, #7C6EE6 46.93%, #979FE1 65.71%, #A2B3DE 77.68%, #ADC8DC 88.93%, #C0ECD7 100%)',
    });
};

const getPersonalPlaylists = (songsMap: { [key: string]: Song }): Array<Playlist> => {
    return personalPlaylistNames.map((playlistName) => {
        const songList = getRandomSublist(Object.keys(songsMap), {});
        return createPlaylistObject({ name: playlistName, songKeys: songList.sort((a, b) => songsMap[b].popularity - songsMap[a].popularity) });
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

export const getInitialState = () => {
    const songs = getSongs();
    const playlists = [getLikedSongsPlaylist(), ...getPersonalPlaylists(songs), ...getTop50sPlaylists(songs)];
    return {
        playingSong: playlists[1].songKeys[0],
        playingPlaylist: playlists[1].slug,
        currentPlaylist: '',
        songs: songs,
        playlists: playlists,
    };
};
