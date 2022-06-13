import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app';

import 'modern-normalize/modern-normalize.css';
import './styles/main.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
