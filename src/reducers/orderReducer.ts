import * as actions from '@actions/orderActions';
import { IOrder, OrderStatus } from '@interfaces/index';

export interface IOrdersState {
  toDoOrders: IOrder[];
  inProgressOrders: IOrder[];
}

export const initialState = (): IOrdersState => ({
  toDoOrders: [],
  inProgressOrders: [],
});

export const orderReducer = (
  state: IOrdersState,
  action: actions.OrderAction
): IOrdersState => {
  switch (action.type) {
    case actions.SET_ORDERS: {
      const { orders } = action.payload;

      return {
        ...state,
        toDoOrders: orders.filter((order) => order.status === OrderStatus.ToDo),
        inProgressOrders: orders.filter(
          (order) => order.status === OrderStatus.InProgress
        ),
      };
    }
    case actions.PUSH_ORDER: {
      const { order } = action.payload;

      const index = state.toDoOrders.indexOf(order);
      state.inProgressOrders.push(order);
      state.toDoOrders.splice(index, 1);

      return {
        ...state,
      };
    }
    case actions.FINISH_ORDER: {
      const { order } = action.payload;

      const index = state.inProgressOrders.indexOf(order);
      state.inProgressOrders.splice(index, 1);

      return {
        ...state,
      };
    }
    default:
      return { ...state };
  }
};
