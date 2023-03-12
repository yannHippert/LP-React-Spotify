import { ReactComponent as Heart } from '../../static/icons/heart.svg';
import { Playlist } from '../../interfaces/playlist';

import './PlaylistCover.scss';

interface PlaylistCoverProps {
    playlist: Playlist;
    style?: React.CSSProperties;
    className?: string;
    width?: number;
}

const PlaylistCover = ({ playlist, style, className, width }: PlaylistCoverProps) => {
    const getCoverContent = () => {
        if (playlist.name === 'Liked Songs') return <Heart />;
        if (playlist.isPersonal) return '';
        return (
            <>
                TOP 50 <br /> {playlist.name.substring(playlist.name.length - 4)}
            </>
        );
    };

    return (
        <div className={`playlist-cover ${className}`} style={{ background: playlist.gradient, width: width, ...style }}>
            {getCoverContent()}
        </div>
    );
};

export default PlaylistCover;
