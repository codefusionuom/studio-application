import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material';


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
});


root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <BrowserRouter> 
      <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);



