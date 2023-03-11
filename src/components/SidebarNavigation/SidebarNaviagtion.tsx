import React, { useState } from 'react';
import { PlusSquareFilled } from '@ant-design/icons';
import { Menu, MenuProps, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Playlist } from '../../interfaces/playlist';
import { AppState } from '../../redux/slices/playlistSlice';

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
    const iconItems = [
        getItem(
            <Link to="/">Home</Link>,
            'home',
            <div className="icon-container">
                <img src="/icons/home.svg" alt="" />
            </div>
        ),
        getItem(
            'Create Playlist',
            'create',
            <div className="icon-container">
                <PlusSquareFilled style={{ fontSize: '2rem' }} />
            </div>
        ),
        getItem(
            <Link to="/liked">Liked Songs</Link>,
            'liked',
            <div className="icon-container">
                <img src="/img/liked_song.png" />
            </div>
        )
    ];
    return [...iconItems, ...playlists.map((playlist) => getItem(<Link to={`/playlist/${playlist.key}`}>{playlist.name}</Link>, playlist.key))];
};

const SidebarNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const personalPlaylists: Array<Playlist> = useSelector(({ store }: { store: AppState }) => store.playlists.filter(({ isPersonal }) => isPersonal));

    return (
        <>
            <nav className="sidenav">
                <Link to="/">
                    <img src="/img/logo.png" className="nav-logo" alt="Spotify-logo" />
                </Link>
                <Menu mode="inline" defaultSelectedKeys={['home']} style={{ height: '100%', borderRight: 0 }} items={getItems(personalPlaylists)} className="menu" />
            </nav>

            <Modal title="Basic Modal" open={isOpen} footer={null} onCancel={() => setIsOpen(false)}>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};

export default SidebarNavigation;
