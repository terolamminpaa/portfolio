import React from 'react';
import App from './App';
import theme from './theme';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { BrowserRouter } from 'react-router-dom';
import { getFirestore } from 'firebase/firestore';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { firebaseConfig } from './firebase/firebase-config';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

export const app = firebase.initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);