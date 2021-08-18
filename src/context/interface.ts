import { UserAction } from '@actions/userActions';
import { IUserState } from '@reducers/userReducer';
import { Dispatch } from 'react';

export interface IUserContext {
  state: IUserState;
  dispatch: Dispatch<UserAction>;
}
