import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppState, toggleFavorite } from '../../redux/slices/playlistSlice';

import './MediaControlBar.css';

interface MediaControlBarProps {
    style?: React.CSSProperties;
}

const MediaControlBar = (props: MediaControlBarProps) => {
    const [songTime, setSongTime] = useState(0);
    const dispatch = useDispatch();
    const song = useSelector((state: { store: AppState }) => state.store.playingSong);
    const playlist = useSelector((state: { store: AppState }) => state.store.playingPlaylist);

    useEffect(() => {
        setSongTime(0);
    }, [song]);

    const secondsToTime = (seconds: number) => {
        return `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;
    };

    const getSongDuration = () => {
        return song !== null ? secondsToTime(song.duration) : '';
    };

    const handleFavoritToggle = () => {
        dispatch(toggleFavorite({ songKey: song!.key }));
    };

    return (
        <div className="media-control-bar" style={props?.style}>
            <div className="song-info">
                <div className="song-image" style={{ background: playlist?.gradient }}></div>
                <div className="song-details">
                    <h2>{song?.title}</h2>
                    <h3>{song?.artist}</h3>
                </div>
                {song !== null && (
                    <div className="favorite-checkbox">
                        <input type="checkbox" checked={song.isFavorite} id="media-controller-favorite" onChange={handleFavoritToggle} />
                        <label htmlFor="media-controller-favorite">{song.isFavorite ? <HeartFilled /> : <HeartOutlined />}</label>
                    </div>
                )}
            </div>
            <div className="time-control">
                <div className="time-actions">
                    <img src="/icons/random.svg" className="general-controller" style={{ height: '20px' }} />
                    <img src="/icons/previous.svg" className="general-controller" style={{ height: '12px' }} />
                    <img src="/icons/play.svg" className="play-controller" />
                    <img src="/icons/next.svg" className="general-controller" style={{ height: '12px' }} />
                    <img src="/icons/repeat.svg" className="general-controller" style={{ height: '18px' }} />
                </div>
                <div>
                    <p>{secondsToTime(songTime)}</p>
                    <input type="range" min={0} max={song?.duration} onChange={(e) => setSongTime(e.target.valueAsNumber)} className="song-time-display" value={songTime} />
                    <p>{getSongDuration()}</p>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default MediaControlBar;
