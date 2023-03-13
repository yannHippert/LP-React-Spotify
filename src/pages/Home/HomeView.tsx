import { useSelector } from 'react-redux';
import { Playlist } from '../../interfaces/playlist';
import Top50sCard from '../../components/TopCard/TopCard';
import PlaylistCard from '../../components/PlaylistCard/PlaylistCard';
import { AppState } from '../../redux/slices/playlistSlice';

import './HomeView.scss';

const HomeView = () => {
    const playlists = useSelector(({ store }: { store: AppState }) => store.playlists);

    const getPersonalPlaylists = () => playlists.filter(({ isPersonal }) => isPersonal);
    const getTop50sPlaylists = () => playlists.filter(({ name, isPersonal }) => !isPersonal && name !== 'Liked Songs');

    return (
        <div className="home-view">
            <h2 className="list-title">Your playlists</h2>
            <div className="grid-container">
                <PlaylistCard key={playlists[0].key} playlist={playlists[0]} />
                {getPersonalPlaylists().map((playlist: Playlist) => (
                    <PlaylistCard key={playlist.key} playlist={playlist} />
                ))}
            </div>

            <h2 className="list-title">TOP 50</h2>
            <div className="container">
                {getTop50sPlaylists().map((playlist: Playlist) => (
                    <Top50sCard key={playlist.key} playlist={playlist} />
                ))}
            </div>
        </div>
    );
};

export default HomeView;
