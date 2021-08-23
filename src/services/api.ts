import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const getUserData = async (user: string, pwd: string) => {
  try {
    const response = await api.post('/users/login', {
      cpf: user,
      password: pwd,
    });

    const { token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    const userResponse = await api.get(`/users/${user}`);

    const { name, auth } = userResponse.data;

    return {
      token,
      user: name,
      auth,
    };
  } catch (error) {
    // TODO
  }

  return null;
};

export const getOrders = async () => {
  try {
    const response = await api.get('/orders/');
    return response.data;
  } catch (error) {
    // TODO
  }
  return null;
};

export default {
  api,
  getUserData,
  getOrders,
};
