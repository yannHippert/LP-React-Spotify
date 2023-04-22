import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dropdown, Input, MenuProps, Space, Table } from 'antd';
import { Song } from '../../interfaces/song';
import { CaretRightOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { AppState, setCurrentPlaylist, setPlayingSong } from '../../redux/slices/playlistSlice';
import { sortBy } from '../../utils/Comparer';
import TableContextMenu from '../../components/TableContextMenu/TableContextMenu';
import { getItemBy, mapToList } from '../../utils/Getters';
import PlaylistCover from '../../components/PlaylistCover/PlaylistCover';

import '../../extensions/string';
import './PlaylistView.scss';
import { columns, sortable_columns } from './columns';

const defaultValues = {
    isAscending: false,
    sortingBy: 'popularity',
} as {
    isAscending: boolean;
    sortingBy: keyof Song;
};

const PlaylistView = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const stickyRef = useRef(null);
    const [isPinned, setIsPinned] = useState(false);

    const playlist = useSelector(({ store }: { store: AppState }) => getItemBy('slug', store.playlists, slug));
    const globalSongs = useSelector(({ store }: { store: AppState }) => store.songs);
    const [songs, setSongs] = useState<Array<Song>>([]);

    const [sortingBy, setSortingBy] = useState<keyof Song>(defaultValues.sortingBy);
    const [isAscending, setIsAscending] = useState(defaultValues.isAscending);
    const [searchText, setSearchText] = useState<string>('');
    const [popup, setPopup] = useState({
        songKey: '',
        isVisible: false,
        x: 0,
        y: 0,
    });

    useEffect(() => {
        setIsAscending(defaultValues.isAscending);
        setSortingBy(defaultValues.sortingBy);
        dispatch(setCurrentPlaylist({ playlistSlug: slug ?? '' }));
    }, [slug, dispatch]);

    useEffect(() => {
        const playlistSongs = playlist.name === 'Liked Songs' ? Object.values(globalSongs).filter(({ isFavorite }) => isFavorite) : mapToList(globalSongs, playlist?.songKeys ?? []);
        const lowerSearchText = searchText.toLowerCase();
        const tempSongs = playlistSongs.filter((song: Song) =>
            Object.values(song).some((value) => {
                return song.key === value ? false : value.toString().toLowerCase().includes(lowerSearchText);
            }),
        );

        setSongs(sortBy(sortingBy, tempSongs, isAscending));
    }, [playlist, globalSongs, searchText, sortingBy, isAscending]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsPinned(entry.intersectionRatio < 1);
            },
            { threshold: [1] },
        );
        let ref = stickyRef.current;
        if (ref) observer.observe(ref);

        return () => {
            if (ref) observer.unobserve(ref);
        };
    }, [stickyRef]);

    const dispatchCurrentSong = (songKey: string) => {
        dispatch(setPlayingSong({ songKey }));
    };

    function handleFilterClick(e: any, key: keyof Song) {
        e.preventDefault();
        if (key === sortingBy) {
            setIsAscending(!isAscending);
        } else {
            setIsAscending(false);
            setSortingBy(key);
        }
    }

    const items: MenuProps['items'] = sortable_columns.map((sorter: keyof Song) => ({
        label: (
            <div onClick={(e) => handleFilterClick(e, sorter)} className={sortingBy === sorter ? 'selected-filter' : ''}>
                {sorter.toTitle()}
            </div>
        ),
        key: sorter,
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
            y: event.clientY,
        });
    };

    const handleScroll = () => {
        if (popup.isVisible) setPopup({ ...popup, isVisible: false });
    };

    if (playlist === undefined) return <h1>NOT FOUND</h1>;

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
                        <Space>
                            {sortingBy.toTitle()}
                            {isAscending ? <i className="fa-solid fa-arrow-down-a-z"></i> : <i className="fa-solid fa-arrow-down-z-a"></i>}
                            <CaretRightOutlined style={{ transform: 'rotate(90deg)', fontSize: '0.75rem' }} />
                        </Space>
                    </Dropdown>
                </div>

                <div ref={stickyRef}></div>
                <div className="table-wrapper">
                    <Table
                        className={`playlist-song-table ${isPinned ? 'is-pinned' : ''}`}
                        pagination={false}
                        columns={columns}
                        dataSource={songs}
                        onRow={(record) => {
                            return {
                                onDoubleClick: (e) => dispatchCurrentSong(record.key),
                                onContextMenu: (e) => handleContextMenu(e, record),
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
