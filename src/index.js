import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BlossomBuddies} from './components/BlossomBuddies';
import { BrowserRouter as Router } from "react-router-dom"
import reportWebVitals from './reportWebVitals';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
      primary: {
        light: '#c9df9b',
        main: '#BCD783',
        dark: '#83965b',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#EE8051',
        dark: '#a65938',
        contrastText: '#000',
      },
    },
  });

ReactDOM.render(
  <React.StrictMode>
        <Router>
          <ThemeProvider theme={theme}>
            <BlossomBuddies />
          </ThemeProvider>
        </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
