import { Playlist } from '../../../interfaces/playlist';
import { Song } from '../../../interfaces/song';
import FavoriteIndicator from '../../FavotiteIndicator/FavoriteIndicator';
import PlaylistCover from '../../PlaylistCover/PlaylistCover';

import './SongDisplay.scss';

interface SongDisplayProps {
    song: Song;
    playlist: Playlist;
    style: React.CSSProperties;
}

const SongDisplay = ({ song, playlist, style }: SongDisplayProps) => {
    return (
        <div className="song-display" style={{ ...style }}>
            <PlaylistCover playlist={playlist} width={75} className="cover" />

            <div className="song-details">
                <h2>{song?.title}</h2>
                <h3>{song?.artist}</h3>
            </div>

            <FavoriteIndicator song={song} size={20} />
        </div>
    );
};

export default SongDisplay;
