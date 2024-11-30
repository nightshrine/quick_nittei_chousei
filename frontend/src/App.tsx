import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateRoom from './components/createRoom';
import Header from './components/header';
import JoinRoom from './components/joinRoom';
import Settings from './components/settings';
import Top from './components/top';
import { Toaster } from './components/ui/toaster';
import Content from './Content';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
    return (
        <BrowserRouter
            future={{
                v7_relativeSplatPath: true,
            }}
        >
            <Header />
            <ProtectedRoute>
                <Content>
                    <Routes>
                        <Route path="/" element={<Top />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="create-room" element={<CreateRoom />} />
                        <Route path="join-room" element={<JoinRoom />} />
                    </Routes>
                </Content>
            </ProtectedRoute>
            <Toaster />
        </BrowserRouter>
    );
};

export default App;
