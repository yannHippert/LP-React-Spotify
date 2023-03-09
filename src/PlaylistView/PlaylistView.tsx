import Title from 'antd/es/typography/Title';
import { useSelector } from 'react-redux';
import { Playlist } from '../interfaces/playlist';
import Top50sCard from '../components/TopCard/TopCard';
import PlaylistCard from '../components/PlaylistCard/PlaylistCard';
import './HomeView.css';
import { useParams } from 'react-router-dom';
import { getItemById } from '../utils/Getters';

const HomeView = () => {
    const { id } = useParams();
    const playlist = useSelector(
        (state: any) =>
            getItemById(state.playlists.personal, id ?? '') as Playlist
    );

    return (
        <>
            <div className="grid-container">{playlist?.name}</div>
        </>
    );
};

export default HomeView;
