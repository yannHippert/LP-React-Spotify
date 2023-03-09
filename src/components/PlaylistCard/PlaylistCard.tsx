import { Link } from 'react-router-dom';
import { Playlist } from '../../interfaces/playlist';
import { generateGradient } from '../../utils/GradientGenerator';
import './PlaylistCard.css';

export interface PlaylistCardProps {
    playlist: Playlist;
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
    return (
        <Link to={`/playlist/${playlist.id}`}>
            <div className="playlist-card">
                <div
                    className="gradient-image"
                    style={generateGradient()}></div>
                <h2>{playlist.name}</h2>
            </div>
        </Link>
    );
};

export default PlaylistCard;
