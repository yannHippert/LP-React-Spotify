import { ReactComponent as Microphone } from '@Icons/microphone.svg';
import { ReactComponent as Queue } from '@Icons/queue.svg';
import { ReactComponent as Laptop } from '@Icons/laptop.svg';
import { ReactComponent as Speaker } from '@Icons/speaker.svg';
import { ReactComponent as Expand } from '@Icons/expand.svg';

import './DisplayControls.scss';
import { useState } from 'react';

const DisplayControls = () => {
    const [volume, setVolume] = useState(100);

    return (
        <div className="display-controls">
            <Microphone />
            <Queue />
            <Laptop />
            <Speaker />
            <input
                className="volume-bar"
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => setVolume(e.target.valueAsNumber)}
                style={{ background: `linear-gradient(to right, white 0%, white ${volume}%, #535353 ${volume}%, #535353 100%)` }}
            />
            <Expand />
        </div>
    );
};

export default DisplayControls;
