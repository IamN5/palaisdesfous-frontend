import { Flex } from '@chakra-ui/react';
import api from '@services/api';
import React, { useEffect } from 'react';
import OrderList from '@components/OrderList';
import { useOrdersContext } from '@context/ordersContext';
import { setOrders } from '@actions/orderActions';

const Orders: React.FC = () => {
  const { state, dispatch } = useOrdersContext();

  useEffect(() => {
    const getData = async () => {
      const data = await api.getOrders();

      return data;
    };

    getData().then((data) => dispatch(setOrders({ orders: data })));
  }, []);

  return (
    <>
      <Flex direction="row" justifyContent="space-evenly">
        <OrderList title="To do" orders={state.toDoOrders} />
        <OrderList
          title="In Progress"
          orders={state.inProgressOrders}
          droppable
        />
      </Flex>
    </>
  );
};

export default Orders;
