import React, { useState } from 'react';
import { PlusSquareFilled } from '@ant-design/icons';
import { Input, Menu, MenuProps, Modal, message } from 'antd';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Playlist } from '../../interfaces/playlist';
import { AppState, createPlaylist } from '../../redux/slices/playlistSlice';
import { useDispatch } from 'react-redux';
import { ReactComponent as Home } from '../../static/icons/home.svg';

import './SidebarNavigation.scss';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key?: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label
    } as MenuItem;
}

const getItems = (playlists: Array<Playlist>): MenuItem[] => {
    return [
        getItem(
            <Link to="/">Home</Link>,
            '/',
            <div className="icon-container">
                <Home />
            </div>
        ),
        getItem(
            'Create Playlist',
            'create-playlist',
            <div className="icon-container">
                <PlusSquareFilled style={{ fontSize: '2rem' }} />
            </div>
        ),
        getItem(
            <Link to="/playlist/liked-songs">Liked Songs</Link>,
            '/playlist/liked-songs',
            <div className="icon-container">
                <img src="/img/liked_song.png" alt="" />
            </div>
        )
    ];
};

const SidebarNavigation = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [playlistName, setPlaylistName] = useState('');

    const personalPlaylists: Array<Playlist> = useSelector(({ store }: { store: AppState }) => store.playlists.filter(({ isPersonal }) => isPersonal));

    const handleMenuClick = (e: any) => {
        if (e.key === 'create-playlist') {
            setIsModalOpen(true);
        }
    };

    const handleCreatePlaylist = () => {
        try {
            dispatch(createPlaylist({ name: playlistName }));
            setIsModalOpen(false);
        } catch (e: any) {
            message.error(e.cause);
        }
    };

    const getPersnoalPlaylistItems = () => {
        return personalPlaylists.map((playlist) => getItem(<Link to={`/playlist/${playlist.slug}`}>{playlist.name}</Link>, `/playlist/${playlist.slug}`));
    };

    return (
        <>
            <nav className="sidenav">
                <div>
                    <Link to="/">
                        <img src="/img/logo.png" className="nav-logo" alt="Spotify-logo" />
                    </Link>
                    <Menu mode="inline" style={{ borderRight: 0 }} items={getItems(personalPlaylists)} className="static-menu" selectedKeys={[location.pathname]} onClick={handleMenuClick} />
                </div>
                <Menu mode="inline" style={{ borderRight: 0 }} items={getPersnoalPlaylistItems()} className="personal-menu" selectedKeys={[location.pathname]} onClick={handleMenuClick} />
            </nav>

            <Modal
                className="create-playlist-modal"
                title="Create playlist"
                open={isModalOpen}
                closeIcon={<></>}
                onOk={() => {}}
                onCancel={() => setIsModalOpen(false)}
                afterClose={() => setPlaylistName('')}
                width={250}
                footer={
                    <div className="model-footer">
                        <button className="create-playlist-button" onClick={handleCreatePlaylist}>
                            Create
                        </button>
                    </div>
                }
            >
                <Input className="modal-input" prefix={<></>} allowClear onChange={(e) => setPlaylistName(e.target.value)} value={playlistName} onPressEnter={handleCreatePlaylist} />
            </Modal>
        </>
    );
};

export default SidebarNavigation;
