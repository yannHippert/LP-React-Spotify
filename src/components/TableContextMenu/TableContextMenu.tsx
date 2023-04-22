import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppState, togglePlaylistSong } from '../../redux/slices/playlistSlice';

import './TableContextMenu.scss';
import { Playlist } from '../../interfaces/playlist';
import useWindowDimensions from './useWindowDimensions';

interface TableContextMenuProps {
    songKey: string;
    isVisible: boolean;
    x: number;
    y: number;
}

const TableContextMenu = ({ songKey, isVisible, x, y }: TableContextMenuProps) => {
    const dispatch = useDispatch();
    const playlists = useSelector(({ store }: { store: AppState }) => store.playlists.filter(({ isPersonal }: Playlist) => isPersonal));
    const { height } = useWindowDimensions();

    const handleContextMenuItemClick = (playlistKey: string) => {
        dispatch(togglePlaylistSong({ playlistKey, songKey }));
    };

    const menuDirection = () => {
        return y > height / 2 ? 'up-menu' : 'down-menu';
    };

    if (!isVisible) return <></>;

    return (
        <div className={`table-context-menu ${menuDirection()}`} style={{ left: `${x}px`, top: `${y}px` }}>
            <p className="context-menu-header">Add to playlist</p>
            <ul className="context-menu-options">
                {playlists.map((playlist) => (
                    <li className="context-menu-item" key={playlist.key} onClick={() => handleContextMenuItemClick(playlist.key)}>
                        {playlist.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TableContextMenu;
