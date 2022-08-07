import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app';

import 'modern-normalize/modern-normalize.css';
import './styles/reset.css';
import './styles/main.css';
import ChatBox from './components/chat-box';
import SignIn from './components/sign-in';
import { store } from './store';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

Object.defineProperty(window, 'reduxState', {
  get() {
    return store.getState();
  }
});

root.render(
  <Provider store={store} >
    <ChatBox />
  </Provider>
);
