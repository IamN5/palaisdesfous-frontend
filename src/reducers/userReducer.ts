import * as actions from '@actions/userActions';
import authService from '@services/authService';

export interface IUserState {
  token: string;
  user: string;
  auth: string;
}

export const initialState = (): IUserState => ({
  token: '',
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
        user: action.payload.user,
        auth: action.payload.auth,
      };
    case actions.LOGIN_CACHED_USER: {
      const { user, auth, token } = authService.getUserData();

      return {
        ...state,
        user,
        auth,
        token,
      };
    }
    case actions.DISCONNECT_USER:
      return initialState();
    default:
      return { ...state };
  }
};
