import { initialState, orderReducer } from '@reducers/orderReducer';
import React, { createContext, useContext, useReducer } from 'react';
import { IOrdersContext } from './interface';

const OrdersContext = createContext<IOrdersContext>({
  state: initialState(),
  dispatch: () => undefined,
});

const OrdersProvider: React.FC = ({ children }) => {
  const [ordersState, ordersDispatch] = useReducer(
    orderReducer,
    initialState()
  );

  return (
    <OrdersContext.Provider
      value={{
        state: ordersState,
        dispatch: ordersDispatch,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrdersContext = () => useContext(OrdersContext);

export default OrdersProvider;
