import { useSelector } from 'react-redux';
import { AppState, toggleFavorite } from '../../redux/slices/playlistSlice';
import { getItemBy } from '../../utils/Getters';
import DisplayControls from './DisplayControls/DisplayControls';

import './MediaControlBar.scss';
import MediaControls from './MediaCrontols/MediaControls';
import SongDisplay from './SongDisplay/SongDisplay';

interface MediaControlBarProps {
    style?: React.CSSProperties;
}

const MediaControlBar = (props: MediaControlBarProps) => {
    const song = useSelector(({ store }: { store: AppState }) => store.songs[store.playingSong]);
    const playlist = useSelector(({ store }: { store: AppState }) => getItemBy('key', store.playlists, store.playingPlaylist));

    return (
        <div className="media-control-bar" style={props?.style}>
            <SongDisplay song={song} playlist={playlist} style={{ fontSize: '12px' }} />

            <MediaControls song={song} />

            <DisplayControls />
        </div>
    );
};

export default MediaControlBar;
