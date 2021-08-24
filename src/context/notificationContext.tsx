import {
  initialState,
  notificationReducer,
} from '@reducers/notificationReducer';
import React, { createContext, useContext, useReducer } from 'react';
import { INotificationContext } from './interface';

const NotificationContext = createContext<INotificationContext>({
  state: initialState(),
  dispatch: () => undefined,
});

const NotificationProvider: React.FC = ({ children }) => {
  const [notificationState, notificationDispatcher] = useReducer(
    notificationReducer,
    initialState()
  );

  return (
    <NotificationContext.Provider
      value={{
        state: notificationState,
        dispatch: notificationDispatcher,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
export const useNotify = () => ({ notify: useNotificationContext().dispatch });

export default NotificationProvider;
