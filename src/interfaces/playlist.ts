export interface Playlist {
    key: string;
    name: string;
    slug: string;
    gradient: string;
    isPersonal: boolean;
    songKeys: Array<string>;
}
