import { useEffect, useState } from 'react';
import { Song } from '../../../interfaces/song';

import './MediaControls.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import { AppState, nextSong, previousSong, togglePlaying } from '../../../redux/slices/playlistSlice';

interface MediaControlsProps {
    song: Song;
}

const MediaControls = ({ song }: MediaControlsProps) => {
    const showTooltipArrow = false;
    const tooltipDelay = 0.2;

    const dispatch = useDispatch();
    const [songTime, setSongTime] = useState(0);
    const isPlaying = useSelector(({ store }: { store: AppState }) => store.isPlaying);

    useEffect(() => {
        setSongTime(0);
    }, [song]);

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setSongTime((previous) => previous + 0.1);
            }, 100);

            return () => clearInterval(interval);
        }
    }, [isPlaying]);

    const secondsToTime = (seconds: number) => {
        return `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;
    };

    const getSongDuration = () => {
        return song !== null ? secondsToTime(song.duration) : '0:00';
    };

    const handleTogglePlaying = () => {
        dispatch(togglePlaying());
    };

    const handlePreviousSong = () => {
        dispatch(previousSong());
    };

    const handleNextSong = () => {
        dispatch(nextSong());
    };

    return (
        <div className="media-controls">
            <div className="song-controls">
                <i className="fa-solid fa-shuffle opacity-controlled"></i>
                <Tooltip placement="top" title="Previous" showArrow={showTooltipArrow} mouseEnterDelay={tooltipDelay}>
                    <i className="fa-solid fa-backward-step opacity-controlled" onClick={handlePreviousSong}></i>
                </Tooltip>
                <Tooltip placement="top" title={isPlaying ? 'Pause' : 'Play'} showArrow={showTooltipArrow} mouseEnterDelay={tooltipDelay}>
                    <i className={`fa-solid play-pause-button fa-circle-${isPlaying ? 'pause' : 'play'}`} onClick={handleTogglePlaying}></i>
                </Tooltip>
                <Tooltip placement="top" title="Next" showArrow={showTooltipArrow} mouseEnterDelay={tooltipDelay}>
                    <i className="fa-solid fa-forward-step opacity-controlled" onClick={handleNextSong}></i>
                </Tooltip>
                <i className="fa-solid fa-repeat opacity-controlled"></i>
            </div>

            <div className="duration-controls">
                <p className="duration-display">{secondsToTime(Math.floor(songTime))}</p>
                <input
                    className="duration-bar"
                    type="range"
                    min={0}
                    max={song?.duration}
                    onChange={(e) => setSongTime(e.target.valueAsNumber)}
                    value={songTime}
                    style={{
                        background: `linear-gradient(to right, white 0%, white ${(songTime / song.duration) * 100}%, #535353 ${
                            (songTime / song.duration) * 100
                        }%, #535353 100%)`,
                    }}
                />
                <p className="duration-display">{getSongDuration()}</p>
            </div>
        </div>
    );
};

export default MediaControls;
