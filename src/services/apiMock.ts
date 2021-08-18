export const getUserData = (user: string, pwd: string) => {
  return user === 'root' && pwd === 'toor'
    ? { token: 'HEHEJWTAQUI', user, auth: 'admin' }
    : null;
};

export default {
  getUserData,
};
