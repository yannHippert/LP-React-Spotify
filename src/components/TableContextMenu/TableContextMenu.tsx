import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppState, togglePlaylistSong } from '../../redux/slices/playlistSlice';

import './TableContextMenu.scss';

interface TableContextMenuProps {
    songKey: string;
    isVisible: boolean;
    x: number;
    y: number;
}

const TableContextMenu = ({ songKey, isVisible, x, y }: TableContextMenuProps) => {
    const dispatch = useDispatch();
    const playlists = useSelector(({ store }: { store: AppState }) => store.playlists.filter((p) => p.isPersonal));

    const handleContextMenuItemClick = (playlistKey: string) => {
        dispatch(togglePlaylistSong({ playlistKey, songKey }));
    };

    if (!isVisible) return <></>;

    return (
        <div className="table-context-menu" style={{ left: `${x}px`, top: `${y}px` }}>
            <p className="context-menu-header">Add to playlist</p>
            <ul className="context-menu-options" style={{ left: `${x}px`, top: `${y}px` }}>
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
