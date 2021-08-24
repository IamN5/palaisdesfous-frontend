import * as actions from '@actions/userActions';
import authService from '@services/authService';

export interface IUserState {
  token: string;
  refreshToken: string;
  user: string;
  auth: string;
}

export const initialState = (): IUserState => ({
  token: '',
  refreshToken: '',
  user: '',
  auth: '',
});

export const userReducer = (
  state: IUserState,
  action: actions.UserAction
): IUserState => {
  switch (action.type) {
    case actions.LOGIN_USER:
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user,
        auth: action.payload.auth,
      };
    case actions.LOGIN_CACHED_USER: {
      const { user, auth, token, refreshToken } = authService.getUserData();

      return {
        ...state,
        user,
        auth,
        token,
        refreshToken,
      };
    }
    case actions.DISCONNECT_USER:
      return initialState();
    default:
      return { ...state };
  }
};
