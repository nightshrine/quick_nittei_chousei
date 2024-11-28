import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import ProtectedRoute from './ProtectedRoute';
import Top from './components/top';
import Settings from './components/settings';
import { Toaster } from './components/ui/toaster';

const App = () => {
    return (
        <BrowserRouter
            future={{
                v7_relativeSplatPath: true,
            }}
        >
            <Header />
            <ProtectedRoute>
                <Routes>
                    <Route path="/" element={<Top />} />
                    <Route path="settings" element={<Settings />} />
                </Routes>
            </ProtectedRoute>
            <Toaster />
        </BrowserRouter>
    );
};

export default App;
