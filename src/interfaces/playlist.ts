import { Song } from './song';

export interface PlaylistData {
    key: string;
    name: string;
    gradient: string;
    isPersonal: boolean;
    songKeys: Array<string>;
}

export interface Playlist extends PlaylistData {
    songs: Array<Song>;
}
