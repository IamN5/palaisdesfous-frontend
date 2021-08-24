import * as actions from '@actions/notificationActions';
import { INotification, NotificationTypes } from '@interfaces/index';

export interface INotificationState {
  currentNotification: INotification;
  notificationQueue: INotification[];
}

const nullNotification = {
  type: NotificationTypes.NOTIFICATION_NONE,
  title: '',
  message: '',
};

export const initialState = (): INotificationState => ({
  currentNotification: nullNotification,
  notificationQueue: [],
});

export const notificationReducer = (
  state: INotificationState,
  action: actions.NotificationAction
): INotificationState => {
  switch (action.type) {
    case actions.SEND_NOTIFICATION: {
      const { notification } = action.payload;

      if (
        state.currentNotification.type !== NotificationTypes.NOTIFICATION_NONE
      ) {
        state.notificationQueue.push(notification);

        return {
          ...state,
        };
      }

      return {
        ...state,
        currentNotification: notification,
      };
    }
    case actions.REMOVE_NOTIFICATION: {
      return {
        ...state,
        currentNotification: nullNotification,
      };
    }
    default:
      return { ...state };
  }
};
