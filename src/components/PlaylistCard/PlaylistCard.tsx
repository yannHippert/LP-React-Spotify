import { Link } from 'react-router-dom';
import { Playlist } from '../../interfaces/playlist';
import PlaylistCover from '../PlaylistCover/PlaylistCover';

import './PlaylistCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, setPlayingPlaylist, togglePlaying } from '../../redux/slices/playlistSlice';

export interface PlaylistCardProps {
    playlist: Playlist;
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
    const dispatch = useDispatch();
    const playingPlaylist: string = useSelector(({ store }: { store: AppState }) => store.playingPlaylist);
    const isPlaying: boolean = useSelector(({ store }: { store: AppState }) => store.isPlaying);

    const handleTogglePlaying = () => {
        dispatch(togglePlaying());
    };

    const handleSetPlayingPlaylist = () => {
        dispatch(setPlayingPlaylist({ playlistSlug: playlist.slug }));
    };

    return (
        <div className="playlist-card-wrapper">
            <Link to={`/playlist/${playlist.slug}`}>
                <div className="playlist-card">
                    <PlaylistCover playlist={playlist} className="" />
                    <h3>{playlist.name}</h3>
                </div>
            </Link>
            {playingPlaylist === playlist.slug ? (
                <i
                    className={`fa-solid play-pause-button fa-circle-${isPlaying ? 'pause' : 'play'} is-playing-playlist`}
                    onClick={handleTogglePlaying}
                ></i>
            ) : (
                <i className={`fa-solid play-pause-button fa-circle-play`} onClick={handleSetPlayingPlaylist}></i>
            )}
        </div>
    );
};

export default PlaylistCard;
