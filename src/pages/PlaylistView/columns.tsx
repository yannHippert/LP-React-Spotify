import { ColumnsType } from 'antd/es/table';
import { Song } from '../../interfaces/song';
import FavoriteIndicator from '../../components/FavotiteIndicator/FavoriteIndicator';

export const columns: ColumnsType<Song> = [
    {
        title: '#',
        dataIndex: 'index',
        width: 75,
        render: (e, song, index) => <p>{index + 1}</p>,
    },
    {
        title: '',
        dataIndex: 'isFavorite',
        width: 50,
        render: (e, song) => <FavoriteIndicator song={song} size={13} />,
    },
    {
        title: 'TITLE',
        dataIndex: 'title',
        render: (_, song) => (
            <p>
                {song.title} - {song.artist}
            </p>
        ),
    },
    {
        title: 'YEAR',
        dataIndex: 'year',
        width: 100,
    },
    {
        title: 'GENRE',
        dataIndex: 'genre',
        render: (genre) => genre.toTitle(),
    },
    {
        title: 'POPULARITY',
        dataIndex: 'popularity',
        width: 150,
        render: (popularity) => <p className="popularity-text">{popularity}</p>,
    },
    {
        title: 'DURATION',
        dataIndex: 'duration',
        width: 105,
        render: (duration) => (
            <p className="duration-text">
                {Math.floor(duration / 60)}:{duration % 60 < 10 && '0'}
                {duration % 60}
            </p>
        ),
    },
];

export const sortable_columns = ['custom', 'title', 'year', 'genre', 'popularity', 'duration'] as Array<keyof Song>;
