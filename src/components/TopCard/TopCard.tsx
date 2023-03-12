import { Playlist } from '../../interfaces/playlist';
import { Link } from 'react-router-dom';

import './TopCard.scss';
import PlaylistCover from '../PlaylistCover/PlaylistCover';

export interface Top50sCardProps {
    playlist: Playlist;
}

const Top50sCard = ({ playlist }: Top50sCardProps) => {
    return (
        <Link to={`/playlist/${playlist.key}`}>
            <div className="top-card">
                <PlaylistCover playlist={playlist} className="playlist-cover" />
                <h2>TOP 50</h2>
                <h3>{playlist.name.substring(playlist.name.length - 4)}</h3>
            </div>
        </Link>
    );
};

export default Top50sCard;
