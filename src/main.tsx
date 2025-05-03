import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { HashRouter } from 'react-router';
import { store } from './app/store.ts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter basename="/bosa-noga/">
      <Provider store={store}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </Provider>
    </HashRouter>
  </StrictMode>,
);
