import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './states';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <StrictMode>
          <Notifications position="top-center" />
          <App />
        </StrictMode>
      </BrowserRouter>
    </MantineProvider>
  </Provider>
);
