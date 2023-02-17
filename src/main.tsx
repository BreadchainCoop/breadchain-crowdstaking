import React from 'react';
import { createRoot } from 'react-dom/client';
import { createClient, WagmiConfig } from 'wagmi';

import './shims';

import { HashRouter } from 'react-router-dom';

import App from './components/App';

import { getClient } from './client';
import { ModalProvider } from './context/ModalContext';
import { ToastProvider } from './context/ToastContext';
import { TransactionDisplayProvider } from './context/TransactionDisplayContext';
import './css/index.css';

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
          <TransactionDisplayProvider>
            <HashRouter>
              <App />
            </HashRouter>
          </TransactionDisplayProvider>
        </ModalProvider>
      </ToastProvider>
    </WagmiConfig>
  </React.StrictMode>,
);
