import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { ConfigProvider } from 'antd';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    // Seed Token
                    colorPrimary: '#3F497F',



                },
            }}
        >
            <App />

        </ConfigProvider>

    </React.StrictMode>
)