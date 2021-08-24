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

export const getRefreshToken = () => getUserData().refreshToken;

export const refreshTokens = (token: string, refreshToken: string) => {
  const { user, auth } = getUserData();

  localStorage.setItem(
    STORAGE.USER_DATA_KEY,
    JSON.stringify({ user, auth, token, refreshToken })
  );
};

export const login = (
  userState: IUserState,
  dispatch: Dispatch<UserAction>
) => {
  const { user, auth, token, refreshToken } = userState;

  dispatch(loginUser({ user, auth, token, refreshToken }));

  localStorage.setItem(
    STORAGE.USER_DATA_KEY,
    JSON.stringify({ user, auth, token, refreshToken })
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
  getRefreshToken,
  refreshTokens,
  login,
  logout,
};
