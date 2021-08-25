import { IOrder } from '@interfaces/index';

export const SET_ORDERS = 'orders/set';

export interface ISetOrders {
  readonly type: typeof SET_ORDERS;
  payload: { orders: IOrder[] };
}

export const PUSH_ORDER = 'orders/push';

export interface IPushOrder {
  readonly type: typeof PUSH_ORDER;
  payload: { order: IOrder };
}

export const FINISH_ORDER = 'orders/finish';

export interface IFinishOrder {
  readonly type: typeof FINISH_ORDER;
  payload: { order: IOrder };
}

export type OrderAction = ISetOrders | IPushOrder | IFinishOrder;

export const setOrders = (payload: { orders: IOrder[] }): ISetOrders => ({
  type: SET_ORDERS,
  payload,
});

export const pushOrder = (payload: { order: IOrder }): IPushOrder => ({
  type: PUSH_ORDER,
  payload,
});

export const finishOrder = (payload: { order: IOrder }): IFinishOrder => ({
  type: FINISH_ORDER,
  payload,
});
