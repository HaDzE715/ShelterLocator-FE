import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SheltersContextProvider } from './context/ShelterContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <SheltersContextProvider>
            <App />
        </SheltersContextProvider>
    </React.StrictMode>
);

