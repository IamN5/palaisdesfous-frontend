import { IUserState } from '@reducers/userReducer';

export const LOGIN_USER = 'user/login';

export interface ILogInUser {
  readonly type: typeof LOGIN_USER;
  payload: IUserState;
}
export const DISCONNECT_USER = 'user/disconnect';

export interface IDisconnectUser {
  readonly type: typeof DISCONNECT_USER;
}

export const LOGIN_CACHED_USER = 'user/login_cached';

export interface ILoginChachedUser {
  readonly type: typeof LOGIN_CACHED_USER;
}

export type UserAction = ILogInUser | IDisconnectUser | ILoginChachedUser;

export const loginUser = (payload: IUserState): ILogInUser => ({
  type: LOGIN_USER,
  payload,
});

export const disconnectUser = (): IDisconnectUser => ({
  type: DISCONNECT_USER,
});

export const loginCachedUser = (): ILoginChachedUser => ({
  type: LOGIN_CACHED_USER,
});
