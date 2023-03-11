import { Playlist } from '../../interfaces/playlist';
import Title from 'antd/es/typography/Title';
import { Typography } from 'antd';
import './TopCard.css';
import { Link } from 'react-router-dom';

const { Text } = Typography;

export interface Top50sCardProps {
    playlist: Playlist;
}

const Top50sCard = ({ playlist }: Top50sCardProps) => {
    return (
        <Link to={`/playlist/${playlist.key}`}>
            <div className="top-card">
                <div className="gradient-image" style={{ background: playlist.gradient }}>
                    <Title>{playlist.name}</Title>
                </div>
                <Text>{playlist.name}</Text>
            </div>
        </Link>
    );
};

export default Top50sCard;
