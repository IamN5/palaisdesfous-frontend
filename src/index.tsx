import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import './index.css';
import OrdersProvider from '@context/ordersContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import NotificationProvider from '@context/notificationContext';
import App from './App';
import theme from './styles/theme';
import UserProvider from './context/userContext';

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <React.StrictMode>
        <CSSReset />
        <DndProvider backend={HTML5Backend}>
          <UserProvider>
            <OrdersProvider>
              <NotificationProvider>
                <App />
              </NotificationProvider>
            </OrdersProvider>
          </UserProvider>
        </DndProvider>
      </React.StrictMode>
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById('root')
);
