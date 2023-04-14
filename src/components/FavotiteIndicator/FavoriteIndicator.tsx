import { ReactComponent as HeartFilled } from '../../static/icons/heart_filled.svg';
import { ReactComponent as HeartEmpty } from '../../static/icons/heart_empty.svg';
import { useDispatch } from 'react-redux';
import { Song } from '../../interfaces/song';
import { toggleFavorite } from '../../redux/slices/playlistSlice';

import './FavoriteIndicator.scss';

interface FavoriteIndicatorProps {
    song: Song;
    size: number;
}

const FavoriteIndicator = ({ song, size }: FavoriteIndicatorProps) => {
    const dispatch = useDispatch();

    const handleFavoritToggle = () => {
        dispatch(toggleFavorite({ songKey: song.key }));
    };

    return (
        <div className="favorite-checkbox">
            <input type="checkbox" checked={song.isFavorite} id={song.key} onChange={handleFavoritToggle} />
            <label htmlFor={song.key}>{song.isFavorite ? <HeartFilled width={size} /> : <HeartEmpty width={size} />}</label>
        </div>
    );
};
export default FavoriteIndicator;
