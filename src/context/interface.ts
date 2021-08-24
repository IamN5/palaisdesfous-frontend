import { OrderAction } from '@actions/orderActions';
import { UserAction } from '@actions/userActions';
import { NotificationAction } from '@actions/notificationActions';
import { IUserState } from '@reducers/userReducer';
import { IOrdersState } from '@reducers/orderReducer';
import { Dispatch } from 'react';
import { INotificationState } from '@reducers/notificationReducer';

export interface IUserContext {
  state: IUserState;
  dispatch: Dispatch<UserAction>;
}

export interface IOrdersContext {
  state: IOrdersState;
  dispatch: Dispatch<OrderAction>;
}

export interface INotificationContext {
  state: INotificationState;
  dispatch: Dispatch<NotificationAction>;
}
