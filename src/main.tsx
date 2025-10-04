import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
// @ts-ignore //TODO src/custom.d.ts erstellen
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
console.log(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App />

    </React.StrictMode>
);