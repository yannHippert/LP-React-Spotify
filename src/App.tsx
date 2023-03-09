import React from 'react';
import {
    HeartOutlined,
    HomeOutlined,
    PlusSquareFilled,
} from '@ant-design/icons';
import { ConfigProvider, MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import './main.css';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import HomeView from './home/HomeView';

const { Content, Sider, Footer } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link to="/">Home</Link>, 'home', <HomeOutlined />),
    getItem('Create Playlist', 'create', <PlusSquareFilled />),
    getItem(<Link to="/liked">Liked Songs</Link>, 'liked', <HeartOutlined />),
];

const App = () => {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#00b96b',
                    //fontFamily: 'DM Sans',
                    fontWeightStrong: 700,
                },
                components: {},
            }}>
            <Layout>
                <Layout>
                    <Sider width={200} style={{ position: 'sticky', top: 0 }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['home']}
                            style={{ height: '100%', borderRight: 0 }}
                            items={items}
                        />
                    </Sider>
                    <Content className="background">
                        <Routes>
                            <Route path="/" element={<HomeView />} />
                            <Route
                                path="/playlist/:id"
                                element={<PlaylistView />}
                            />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                        <HomeView></HomeView>
                    </Content>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </ConfigProvider>
    );
};

export default App;
