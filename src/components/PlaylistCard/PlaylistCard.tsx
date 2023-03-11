import { Link } from 'react-router-dom';
import { PlaylistData } from '../../interfaces/playlist';
import './PlaylistCard.css';

export interface PlaylistCardProps {
    playlist: PlaylistData;
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
    return (
        <Link to={`/playlist/${playlist.key}`}>
            <div className="playlist-card">
                <div className="gradient-image" style={{ background: playlist.gradient }}></div>
                <h2>{playlist.name}</h2>
            </div>
        </Link>
    );
};

export default PlaylistCard;
