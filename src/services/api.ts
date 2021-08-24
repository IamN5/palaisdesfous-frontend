import { IOrder, OrderStatus } from '@interfaces/index';
import axios from 'axios';
import authService from './authService';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
});

const handleError = (error: any, tryAgain?: () => void) => {
  if (error.response) {
    if (error.response.status === 401) {
      tryAgain?.call(this);
    }

    console.error(error.response.data);
    console.error(error.response.status);
    console.error(error.response.headers);
  } else if (error.request) {
    console.error(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error', error.message);
  }

  throw error;
};

export const getUserData = async (user: string, pwd: string) => {
  try {
    const response = await api.post('/users/login', {
      cpf: user,
      password: pwd,
    });

    const { token, refreshToken } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    const userResponse = await api.get(`/users/${user}`);

    const { name, auth } = userResponse.data;

    return {
      token,
      refreshToken,
      user: name,
      auth,
    };
  } catch (error) {
    // TODO
  }

  return null;
};

export const tryAndRefreshToken = async () => {
  try {
    const response = await api.post('/users/refreshtoken', {
      token: authService.getRefreshToken(),
    });

    const { token, refreshToken } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    authService.refreshTokens(token, refreshToken);
  } catch (error) {
    handleError(error);
  }
};

export const getOrders = async () => {
  try {
    const response = await api.get('/orders/');
    return response.data;
  } catch (error) {
    handleError(error, () => {
      tryAndRefreshToken();
      getOrders();
    });
  }
  return null;
};

export const pushOrder = async (order: IOrder) => {
  const newOrder = order;

  if (order.status !== OrderStatus.ToDo) return null;

  newOrder.status = OrderStatus.InProgress;

  try {
    const response = await api.patch(`/orders/patch/${order.id}`);

    return response.data;
  } catch (error) {
    handleError(error, () => {
      tryAndRefreshToken();
      pushOrder(order);
    });
  }

  return null;
};

export default {
  api,
  getUserData,
  getOrders,
  pushOrder,
};
