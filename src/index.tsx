import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import './index.css';
import App from './App';
import theme from './styles/theme';
import UserProvider from './context/userContext';

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <React.StrictMode>
        <CSSReset />
        <UserProvider>
          <App />
        </UserProvider>
      </React.StrictMode>
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById('root')
);
