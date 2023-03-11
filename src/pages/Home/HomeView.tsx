import Title from 'antd/es/typography/Title';
import { useSelector } from 'react-redux';
import { PlaylistData } from '../../interfaces/playlist';
import Top50sCard from '../../components/TopCard/TopCard';
import PlaylistCard from '../../components/PlaylistCard/PlaylistCard';
import './HomeView.css';
import { AppState } from '../../redux/slices/playlistSlice';

const HomeView = () => {
    const personal = useSelector(({ store }: { store: AppState }) => store.playlists.filter((playlist) => playlist.isPersonal));
    const top50s = useSelector(({ store }: { store: AppState }) => store.playlists.filter((playlist) => !playlist.isPersonal));

    return (
        <div className="padding">
            <Title>Your playlists</Title>
            <div className="grid-container">
                {personal.map((playlist: PlaylistData) => (
                    <PlaylistCard key={playlist.key} playlist={playlist} />
                ))}
            </div>

            <Title style={{ marginTop: '2rem' }}>TOP 50</Title>
            <div className="container">
                {top50s.map((playlist: PlaylistData) => (
                    <Top50sCard key={playlist.key} playlist={playlist} />
                ))}
            </div>
        </div>
    );
};

export default HomeView;
