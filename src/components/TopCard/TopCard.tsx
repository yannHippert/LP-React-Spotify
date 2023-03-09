import { Playlist } from '../../interfaces/playlist';
import Title from 'antd/es/typography/Title';
import { Typography } from 'antd';
import { generateGradient } from '../../utils/GradientGenerator';
import './TopCard.css';

const { Text } = Typography;

export interface Top50sCardProps {
    playlist: Playlist;
}

const Top50sCard = ({ playlist }: Top50sCardProps) => {
    return (
        <div className="top-card">
            <div className="gradient-image" style={generateGradient()}>
                <Title>{playlist.name}</Title>
            </div>
            <Text>{playlist.name}</Text>
        </div>
    );
};

export default Top50sCard;
