import React from 'react';
import { createRoot } from 'react-dom/client';
import { createClient, WagmiConfig } from 'wagmi';

import './shims';

import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from './store';

import App from './components/App';

import './css/index.css';
import { getClient } from './client';
import { ToastProvider } from './context/ToastContext';
import { ModalProvider } from './context/ModalContext';

export type IViteMode = 'production' | 'development' | 'testing' | undefined;

const env = import.meta.env.MODE as IViteMode;

if (env === undefined) throw new Error('NODE_ENV not set!');

const client = createClient(getClient(env));

const container = document.getElementById('root');
if (!container) throw new Error('no root element found!');

const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <ToastProvider>
        <ModalProvider>
          <Provider store={store}>
            <HashRouter>
              <App />
            </HashRouter>
          </Provider>
        </ModalProvider>
      </ToastProvider>
    </WagmiConfig>
  </React.StrictMode>,
);
