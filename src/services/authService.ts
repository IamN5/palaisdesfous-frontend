import { disconnectUser, loginUser, UserAction } from '@actions/userActions';
import { IUserState } from '@reducers/userReducer';
import { Dispatch } from 'react';
import apiInstance from './api';
import STORAGE from './storageKeys';

export const getUserData = () => {
  const userData = localStorage.getItem(STORAGE.USER_DATA_KEY);

  return userData ? JSON.parse(userData) : null;
};

export const isAuthenticated = () => {
  const authenticated = getUserData() !== null;
  if (authenticated) {
    apiInstance.api.defaults.headers.Authorization = `Bearer ${
      getUserData().token
    }`;
  }
  return authenticated;
};

export const isAdmin = () => getUserData().auth === 'admin';

export const login = (
  userState: IUserState,
  dispatch: Dispatch<UserAction>
) => {
  const { user, auth, token } = userState;

  dispatch(loginUser({ user, auth, token }));

  localStorage.setItem(
    STORAGE.USER_DATA_KEY,
    JSON.stringify({ user, auth, token })
  );
};

export const logout = (dispatch: Dispatch<UserAction>) => {
  dispatch(disconnectUser());

  localStorage.removeItem(STORAGE.USER_DATA_KEY);
};

export default {
  isAdmin,
  isAuthenticated,
  getUserData,
  login,
  logout,
};
