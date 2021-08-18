import { initialState, userReducer } from '@reducers/userReducer';
import React, { createContext, useContext, useReducer } from 'react';
import { IUserContext } from './interface';

const UserContext = createContext<IUserContext>({
  state: initialState(),
  dispatch: () => undefined,
});

const UserProvider: React.FC = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, initialState());

  return (
    <UserContext.Provider
      value={{
        state: userState,
        dispatch: userDispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
