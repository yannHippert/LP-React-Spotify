import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dropdown, Input, MenuProps, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Song } from '../../interfaces/song';
import { CaretRightOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { AppState, setCurrentPlaylist, setCurrentSong } from '../../redux/slices/playlistSlice';
import { sortBy } from '../../utils/Comparer';
import TableContextMenu from '../../components/TableContextMenu/TableContextMenu';
import { getItemBy, mapToList } from '../../utils/Getters';
import PlaylistCover from '../../components/PlaylistCover/PlaylistCover';
import FavoriteIndicator from '../../components/FavotiteIndicator/FavoriteIndicator';

import '../../extensions/string';
import './PlaylistView.scss';

const PlaylistView = () => {
    const defaultValues = {
        isAscending: false,
        sortingBy: 'popularity'
    } as {
        isAscending: boolean;
        sortingBy: keyof Song;
    };

    const { id } = useParams();
    const dispatch = useDispatch();

    const playlist = useSelector(({ store }: { store: AppState }) => getItemBy('key', store.playlists, id));
    const globalSongs = useSelector(({ store }: { store: AppState }) => store.songs);
    const [songs, setSongs] = useState<Array<Song>>([]);

    const [sortingBy, setSortingBy] = useState<keyof Song>(defaultValues.sortingBy);
    const [isAscending, setIsAscending] = useState(defaultValues.isAscending);
    const [searchText, setSearchText] = useState<string>('');
    const [popup, setPopup] = useState({
        songKey: '',
        isVisible: false,
        x: 0,
        y: 0
    });

    useEffect(() => {
        setIsAscending(defaultValues.isAscending);
        setSortingBy(defaultValues.sortingBy);
        dispatch(setCurrentPlaylist({ playlistKey: id ?? '' }));
    }, [id, dispatch]);

    useEffect(() => {
        const playlistSongs = playlist.name === 'Liked Songs' ? Object.values(globalSongs).filter(({ isFavorite }) => isFavorite) : mapToList(globalSongs, playlist?.songKeys ?? []);
        const lowerSearchText = searchText.toLowerCase();
        const tempSongs = playlistSongs.filter((song: Song) =>
            Object.values(song).some((value) => {
                return song.key === value ? false : value.toString().toLowerCase().includes(lowerSearchText);
            })
        );
        setSongs(sortBy(sortingBy, tempSongs, isAscending));
    }, [playlist, globalSongs, searchText, sortingBy, isAscending]);

    const dispatchCurrentSong = (songKey: string) => {
        dispatch(setCurrentSong({ songKey }));
    };

    const columns: ColumnsType<Song> = [
        {
            title: '#',
            dataIndex: 'index',
            width: 75
        },
        {
            title: '',
            dataIndex: 'isFavorite',
            width: 50,
            render: (e, song) => <FavoriteIndicator song={song} size={13} />
        },
        {
            title: 'TITLE',
            dataIndex: 'title',
            render: (_, song) => (
                <p>
                    {song.title} - {song.artist}
                </p>
            )
        },
        {
            title: 'YEAR',
            dataIndex: 'year',
            width: 100
        },
        {
            title: 'GENRE',
            dataIndex: 'genre',
            render: (genre) => genre.toTitle()
        },
        {
            title: 'POPULARITY',
            dataIndex: 'popularity',
            width: 150,
            render: (popularity) => <p className="popularity-text">{popularity}</p>
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
            )
        }
    ];

    function handleFilterClick(e: any, key: keyof Song) {
        e.preventDefault();
        if (key === sortingBy) setIsAscending(!isAscending);
        else {
            setIsAscending(false);
            setSortingBy(key);
        }
    }

    const filters = ['title', 'year', 'genre', 'popularity', 'duration'] as Array<keyof Song>;

    const items: MenuProps['items'] = filters.map((filter: keyof Song) => ({
        label: (
            <a onClick={(e) => handleFilterClick(e, filter)} className={sortingBy === filter ? 'selected-filter' : ''}>
                {filter.toTitle()}
            </a>
        ),
        key: filter
    }));

    const handleContextMenu = (event: any, song: Song) => {
        event.preventDefault();
        if (!popup.isVisible) {
            document.addEventListener(`click`, function onClickOutside() {
                setPopup({ ...popup, isVisible: false });
                document.removeEventListener(`click`, onClickOutside);
            });
        }
        setPopup({
            songKey: song.key,
            isVisible: true,
            x: event.clientX,
            y: event.clientY
        });
    };

    const handleScroll = () => {
        if (popup.isVisible) setPopup({ ...popup, isVisible: false });
    };

    if (playlist === undefined) return <h1>NOT FOUND</h1>;
    //if (playlist === null) return <Navigate to="/" />;

    return (
        <div className="playlist-view" onScroll={handleScroll}>
            <div className="playlist-header">
                <div className="header-content">
                    <PlaylistCover playlist={playlist} className="playlist-icon" />
                    <h1>{playlist.name}</h1>
                </div>
                <div className="header-background" style={{ background: playlist.gradient }}></div>
            </div>

            <div className="playlist-body">
                <div className="filter-container">
                    <Input
                        placeholder="Artist, songs, or podcasts"
                        prefix={<SearchOutlined style={{ marginRight: '1rem', paddingLeft: '0.5rem' }} />}
                        allowClear
                        className="search-filter"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Dropdown menu={{ items }} trigger={['click']} className="order-filter">
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Custom order
                                <CaretRightOutlined style={{ transform: 'rotate(90deg)', fontSize: '0.75rem' }} />
                            </Space>
                        </a>
                    </Dropdown>
                </div>

                <div className="table-wrapper">
                    <Table
                        className="playlist-song-table"
                        pagination={false}
                        columns={columns}
                        dataSource={songs.map((song, index) => ({ ...song, index: index + 1 }))}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {}, // click row
                                onDoubleClick: (e) => dispatchCurrentSong(record.key), // double click row
                                onContextMenu: (e) => handleContextMenu(e, record), // right button click row
                                onMouseEnter: (event) => {}, // mouse enter row
                                onMouseLeave: (event) => {} // mouse leave row
                            };
                        }}
                        sticky
                    />
                    <TableContextMenu songKey={popup.songKey} isVisible={popup.isVisible} x={popup.x} y={popup.y} />
                </div>
            </div>
        </div>
    );
};

export default PlaylistView;
