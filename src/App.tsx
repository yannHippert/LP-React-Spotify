import { ConfigProvider } from 'antd';
import { theme, message } from 'antd';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomeView from './pages/Home/HomeView';
import PlaylistView from './pages/PlaylistView/PlaylistView';
import MediaControlBar from './components/MediaControlBar/MediaControlBar';
import SidebarNavigation from './components/SidebarNavigation/SidebarNavigation';

import './styles/main.scss';
import { getBaseUrl } from './utils/Url';

const App = () => {
    message.config({ maxCount: 2 });

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorHighlight: '#1db954',
                    fontFamily: 'DM Sans',
                    colorText: '#FFFFFF',
                    fontWeightStrong: 700,
                },
                components: {},
            }}
        >
            <div className="global-wrapper">
                <div className="main-content">
                    <SidebarNavigation />
                    <main>
                        <Routes>
                            <Route path={getBaseUrl()} element={<HomeView />} />
                            <Route path="/playlist/:slug" element={<PlaylistView />} />
                            <Route path="*" element={<Navigate to={getBaseUrl()} />} />
                        </Routes>
                    </main>
                </div>

                <MediaControlBar />
            </div>
        </ConfigProvider>
    );
};

export default App;
