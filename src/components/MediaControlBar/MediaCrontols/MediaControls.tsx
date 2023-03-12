import { useEffect, useState } from 'react';
import { Song } from '../../../interfaces/song';

import './MediaControls.scss';

interface MediaControlsProps {
    song: Song;
}

const MediaControls = ({ song }: MediaControlsProps) => {
    const [songTime, setSongTime] = useState(0);

    useEffect(() => {
        setSongTime(0);
    }, [song]);

    const secondsToTime = (seconds: number) => {
        return `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;
    };

    const getSongDuration = () => {
        return song !== null ? secondsToTime(song.duration) : '0:00';
    };

    return (
        <div className="media-controls">
            <div className="song-controls">
                <img src="/icons/random.svg" className="general-controller" style={{ height: '20px' }} alt="" />
                <img src="/icons/previous.svg" className="general-controller" style={{ height: '12px' }} alt="" />
                <img src="/icons/play.svg" className="play-controller" alt="" />
                <img src="/icons/next.svg" className="general-controller" style={{ height: '12px' }} alt="" />
                <img src="/icons/repeat.svg" className="general-controller" style={{ height: '18px' }} alt="" />
            </div>

            <div className="duration-controls">
                <p className="duration-display">{secondsToTime(songTime)}</p>
                <input
                    className="duration-bar"
                    type="range"
                    min={0}
                    max={song?.duration}
                    onChange={(e) => setSongTime(e.target.valueAsNumber)}
                    value={songTime}
                    style={{ background: `linear-gradient(to right, white 0%, white ${(songTime / song.duration) * 100}%, #535353 ${(songTime / song.duration) * 100}%, #535353 100%)` }}
                />
                <p className="duration-display">{getSongDuration()}</p>
            </div>
        </div>
    );
};

export default MediaControls;
