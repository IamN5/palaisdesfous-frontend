import { INotification, NotificationTypes } from '@interfaces/index';

export const SEND_NOTIFICATION = 'notification/send';

export interface ISendNotification {
  readonly type: typeof SEND_NOTIFICATION;
  payload: { notification: INotification };
}

export const REMOVE_NOTIFICATION = 'notification/remove';

export interface IRemoveNotification {
  readonly type: typeof REMOVE_NOTIFICATION;
}

export type NotificationAction = ISendNotification | IRemoveNotification;

export const sendNotification = (payload: {
  notification: INotification;
}): ISendNotification => ({
  type: SEND_NOTIFICATION,
  payload,
});

export const removeNotification = (): IRemoveNotification => ({
  type: REMOVE_NOTIFICATION,
});

export const createNotification = (title: string, message: string) => ({
  notification: {
    type: NotificationTypes.NOTIFICATION_NEUTRAL,
    title,
    message,
  },
});

export const createError = (title: string, message: string) => ({
  notification: {
    type: NotificationTypes.NOTIFICATION_ERROR,
    title,
    message,
  },
});

export const createRequestError = (error: any) => ({
  notification: {
    type: NotificationTypes.NOTIFICATION_ERROR,
    title: error.response ? error.response.data.error : `Error`,
    message: error.response
      ? `Server returned with status ${error.response.status}: ${error.response.data.message}`
      : error.message,
  },
});
