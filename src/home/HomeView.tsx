import Title from 'antd/es/typography/Title';
import { useSelector } from 'react-redux';
import { Playlist } from '../interfaces/playlist';
import Top50sCard from '../components/TopCard/TopCard';
import PlaylistCard from '../components/PlaylistCard/PlaylistCard';
import './HomeView.css';

const HomeView = () => {
    const top50s = useSelector((state: any) => state.playlists.top50s);

    return (
        <>
            <Title>Your playlists</Title>
            <div className="grid-container">
                {top50s.map((playlist: Playlist) => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
            </div>

            <Title style={{ marginTop: '2rem' }}>TOP 50</Title>
            <div className="container">
                {top50s.map((playlist: Playlist) => (
                    <Top50sCard key={playlist.id} playlist={playlist} />
                ))}
            </div>
        </>
    );
};

export default HomeView;
