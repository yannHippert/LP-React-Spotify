export interface SongData {
    title: string;
    artist: string;
    genre: string;
    duration: number;
    popularity: number;
    year: number;
}

export interface Song extends SongData {
    key: string;
    isFavorite: boolean;
}
