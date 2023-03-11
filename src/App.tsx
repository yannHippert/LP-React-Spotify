import { ConfigProvider, Modal } from 'antd';
import { theme } from 'antd';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomeView from './pages/Home/HomeView';
import PlaylistView from './pages/PlaylistView/PlaylistView';
import MediaControlBar from './components/MediaControlBar/MediaControlBar';

import './main.css';
import SidebarNavigation from './components/SidebarNavigation/SidebarNaviagtion';

const App = () => {
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
                    <SidebarNavigation />
                    <main className="background">
                        <Routes>
                            <Route path="/" element={<HomeView />} />
                            <Route path="/playlist/:id" element={<PlaylistView />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </main>
                </div>

                <MediaControlBar />
            </div>
        </ConfigProvider>
    );
};

export default App;
