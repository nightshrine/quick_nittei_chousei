import React from 'react';
import { Provider } from '@/components/ui/provider';
import { Auth0Provider } from '@auth0/auth0-react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider>
            <Auth0Provider
                domain="dev-q8s2k6wayjhns7nb.us.auth0.com"
                clientId="1I5hbIrVDZhdpnd8KOEBy2Kj4LAAFKpz"
                authorizationParams={{
                    redirect_uri: window.location.origin,
                }}
            >
                <App />
            </Auth0Provider>
        </Provider>
    </React.StrictMode>
);
