import { HeartFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Playlist } from '../../interfaces/playlist';
import './PlaylistCard.css';

export interface PlaylistCardProps {
    playlist: Playlist;
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
    return (
        <Link to={`/playlist/${playlist.key}`}>
            <div className="playlist-card">
                <div className="gradient-image" style={{ background: playlist.gradient }}>
                    {playlist.name === 'Liked Songs' ? <HeartFilled /> : <></>}
                </div>
                <h2>{playlist.name}</h2>
            </div>
        </Link>
    );
};

export default PlaylistCard;
