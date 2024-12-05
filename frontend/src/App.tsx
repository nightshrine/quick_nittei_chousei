import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CreateRoom from './components/createRoom';
import Header from './components/header';
import JoinRoom from './components/joinRoom';
import { NotFound } from './components/myui/NotFound';
import Room from './components/room';
import Settings from './components/settings';
import Top from './components/top';
import { Toaster } from './components/ui/toaster';
import Content from './Content';
import ProtectedRoomRoute from './ProtectedRoomRoute';
import ProtectedRoute from './ProtectedRoute';
import SetRoomSchedule from './components/setRoomSchedule';

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
                        <Route
                            path="room/:roomId"
                            element={<ProtectedRoomRoute />}
                        >
                            <Route index element={<Room />} />
                            <Route
                                path="set-room-schedule"
                                element={<SetRoomSchedule />}
                            />
                            <Route
                                path="set-user-schedule"
                                element={<setUserSchedule />}
                            />
                        </Route>
                        <Route path="not-found" element={<NotFound />} />
                        <Route
                            path="*"
                            element={<Navigate to="/not-found" />}
                        />
                    </Routes>
                </Content>
            </ProtectedRoute>
            <Toaster />
        </BrowserRouter>
    );
};

export default App;
