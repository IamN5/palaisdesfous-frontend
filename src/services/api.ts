import {
  IOrder,
  ICustomer,
  OrderStatus,
  IIngredient,
  IIngredientDto,
  IUser,
} from '@interfaces/index';
import axios from 'axios';
import authService from './authService';
import {
  ingredientFromDto,
  ingredientsArrayFromDto,
  ingredientToDto,
  orderToDto,
} from './mapper';

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

export const getIngredients = async () => {
  try {
    const response = await api.get<IIngredientDto[]>('/ingredients/');

    return ingredientsArrayFromDto(response.data);
  } catch (error) {
    handleError(error, () => {
      tryAndRefreshToken();
      getIngredients();
    });
  }

  return null;
};

export const patchIngredient = async (ingredient: IIngredient) => {
  try {
    const response = await api.patch<IIngredientDto>(
      '/ingredients/patch',
      ingredientToDto(ingredient)
    );

    return ingredientFromDto(response.data);
  } catch (error) {
    handleError(error, () => {
      tryAndRefreshToken();
      patchIngredient(ingredient);
    });
  }

  return null;
};

export const createIngredient = async (ingredient: IIngredient) => {
  try {
    const response = await api.post(
      'ingredients/create',
      ingredientToDto(ingredient)
    );

    return ingredientFromDto(response.data);
  } catch (error) {
    handleError(error, () => {
      tryAndRefreshToken();
      createIngredient(ingredient);
    });
  }

  return null;
};

export const deleteIngredient = async (ingredient: IIngredient) => {
  try {
    const response = await api.delete(`/ingredients/delete/${ingredient.name}`);

    return ingredientFromDto(response.data);
  } catch (error) {
    handleError(error, () => {
      tryAndRefreshToken();
      createIngredient(ingredient);
    });
  }

  return null;
};

export const registerUser = async (
  cpf: string,
  name: string,
  email: string,
  auth: string,
  password: string
) => {
  try {
    const response = await api.post('/users/create', {
      cpf,
      name,
      email,
      auth,
      password,
    });
    return response;
  } catch (error) {
    handleError(error, () => {
      tryAndRefreshToken();
      registerUser(cpf, name, email, auth, password);
    });
  }
  return null;
};

export const getUsers = async () => {
  try {
    const response = await api.get<IUser[]>('/users/');
    return response.data;
  } catch (error) {
    handleError(error, () => {
      tryAndRefreshToken();
      getUsers();
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
  getIngredients,
  patchIngredient,
  registerUser,
  getUsers,
  createIngredient,
  deleteIngredient,
};
