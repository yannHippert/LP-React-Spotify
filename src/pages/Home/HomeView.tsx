import Title from 'antd/es/typography/Title';
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
            <Title>Your playlists</Title>
            <div className="grid-container">
                <PlaylistCard key={playlists[0].key} playlist={playlists[0]} />
                {getPersonalPlaylists().map((playlist: Playlist) => (
                    <PlaylistCard key={playlist.key} playlist={playlist} />
                ))}
            </div>

            <Title style={{ marginTop: '2rem' }}>TOP 50</Title>
            <div className="container">
                {getTop50sPlaylists().map((playlist: Playlist) => (
                    <Top50sCard key={playlist.key} playlist={playlist} />
                ))}
            </div>
        </div>
    );
};

export default HomeView;
