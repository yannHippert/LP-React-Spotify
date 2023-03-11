import React, { useState } from 'react';
import { HeartOutlined, HomeOutlined, PlusSquareFilled } from '@ant-design/icons';
import { ConfigProvider, MenuProps, Modal } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import HomeView from './pages/Home/HomeView';
import PlaylistView from './pages/PlaylistView/PlaylistView';
import { useSelector } from 'react-redux';
import { PlaylistData } from './interfaces/playlist';
import { AppState } from './redux/slices/playlistSlice';
import MediaControlBar from './components/MediaControlBar/MediaControlBar';

import './main.css';

const { Content, Sider, Footer } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key?: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label
    } as MenuItem;
}

const getItems = (playlists: Array<PlaylistData>): MenuItem[] => {
    const iconItems = [
        getItem(<Link to="/">Home</Link>, 'home', <HomeOutlined />),
        getItem('Create Playlist', 'create', <PlusSquareFilled />),
        getItem(<Link to="/liked">Liked Songs</Link>, 'liked', <HeartOutlined />)
    ];
    return [...iconItems, ...playlists.map((playlist) => getItem(<Link to={`/playlist/${playlist.key}`}>{playlist.name}</Link>, playlist.key))];
};

const App = () => {
    const [isOpen, setIsOpen] = useState(false);

    const personalPlaylists: Array<PlaylistData> = useSelector(({ store }: { store: AppState }) => {
        return store.playlists.filter((playlist) => playlist.isPersonal);
    });

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#00b96b',
                    //fontFamily: 'DM Sans',
                    fontWeightStrong: 700
                },
                components: {}
            }}
        >
            <div className="global-wrapper">
                <div className="main-content">
                    <nav className="sidenav">
                        <Menu mode="inline" defaultSelectedKeys={['home']} style={{ height: '100%', borderRight: 0 }} items={getItems(personalPlaylists)} />
                    </nav>
                    <main className="background">
                        <Routes>
                            <Route path="/" element={<HomeView />} />
                            <Route path="/playlist/:id" element={<PlaylistView />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </main>
                </div>

                <MediaControlBar />

                {/* <Layout className="pageLayout">
                <Layout>
                    <Sider className="sidebar">
                        <Menu mode="inline" defaultSelectedKeys={['home']} style={{ height: '100%', borderRight: 0 }} items={getItems(personalPlaylists)} />
                    </Sider>
                    <Content className="background">
                        <Routes>
                            <Route path="/" element={<HomeView />} />
                            <Route path="/playlist/:id" element={<PlaylistView />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </Content>
                </Layout>
                <MediaControlBar
                    style={{
                        textAlign: 'center',
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0
                    }}
                />
            </Layout> */}

                <Modal title="Basic Modal" open={isOpen} footer={null} onCancel={() => setIsOpen(false)}>
                    <p>Some contents...</p>
                </Modal>
            </div>
        </ConfigProvider>
    );
};

export default App;
