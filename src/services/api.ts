import { IOrder, ICustomer, OrderStatus } from '@interfaces/index';
import axios from 'axios';
import authService from './authService';
import { orderToDto } from './mapper';

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
  const newOrder = { ...order };

  console.log(`Order status is ${order.status}`);

  if (order.status === OrderStatus.Done) return null;

  if (newOrder.status === OrderStatus.InProgress) {
    newOrder.status = OrderStatus.Done;
  } else {
    newOrder.status = OrderStatus.InProgress;
  }

  try {
    const response = await api.patch(
      `/orders/patch/${order.id}`,
      orderToDto(newOrder)
    );

    return response.data;
  } catch (error) {
    handleError(error, () => {
      tryAndRefreshToken();
      pushOrder(order);
    });
  }

  return null;
};

export const registerCustomer = async (cpf: string, name: string) => {
  try {
    const response = await api.post('/customers/create', {
      cpf,
      name,
    });
    return response;
  } catch (error) {
    handleError(error, () => {
      tryAndRefreshToken();
      registerCustomer(cpf, name);
    });
  }
  return null;
};

export const getCustomers = async () => {
  try {
    const response = await api.get<ICustomer[]>('/customers/');
    return response.data;
  } catch (error) {
    handleError(error, () => {
      tryAndRefreshToken();
      getCustomers();
    });
  }
  return null;
};

export default {
  api,
  getUserData,
  getOrders,
  pushOrder,
  registerCustomer,
  getCustomers,
};
