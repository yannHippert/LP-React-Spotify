import { useEffect, useState } from 'react';
import { Song } from '../../../interfaces/song';
import { ReactComponent as Random } from '../../../static/icons/random.svg';
import { ReactComponent as Previous } from '../../../static/icons/previous.svg';
import { ReactComponent as Play } from '../../../static/icons/play.svg';
import { ReactComponent as Next } from '../../../static/icons/next.svg';
import { ReactComponent as Repeat } from '../../../static/icons/repeat.svg';

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
                <Random />
                <Previous />
                <Play />
                <Next />
                <Repeat />
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
