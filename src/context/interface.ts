import { OrderAction } from '@actions/orderActions';
import { UserAction } from '@actions/userActions';
import { IUserState } from '@reducers/userReducer';
import { IOrdersState } from '@reducers/orderReducer';
import { Dispatch } from 'react';

export interface IUserContext {
  state: IUserState;
  dispatch: Dispatch<UserAction>;
}

export interface IOrdersContext {
  state: IOrdersState;
  dispatch: Dispatch<OrderAction>;
}
