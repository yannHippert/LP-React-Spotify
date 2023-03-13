import { Link } from 'react-router-dom';
import { Playlist } from '../../interfaces/playlist';
import PlaylistCover from '../PlaylistCover/PlaylistCover';

import './PlaylistCard.scss';

export interface PlaylistCardProps {
    playlist: Playlist;
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
    return (
        <Link to={`/playlist/${playlist.slug}`}>
            <div className="playlist-card">
                <PlaylistCover playlist={playlist} className="" />
                <h3>{playlist.name}</h3>
            </div>
        </Link>
    );
};

export default PlaylistCard;
