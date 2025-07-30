import React from 'react';
import { createRoot } from 'react-dom/client';  // ✅ Import createRoot for React 18
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);             // ✅ Create root
root.render(<App />);                           // ✅ Render app
