import { Flex, Heading, Text } from '@chakra-ui/react';
import OrderCard from '@components/OrderCard';
import api from '@services/api';
import React, { useState, useEffect } from 'react';

import { IOrder, OrderStatus } from '@interfaces/index';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await api.getOrders();

      return data;
    };

    getData().then((data) => setOrders(data));
  }, []);

  return (
    <>
      <Flex direction="row" justifyContent="space-evenly">
        <Flex direction="column" alignItems="center">
          <Heading marginBottom={4} size="lg">
            To do
          </Heading>
          {orders
            .filter((order) => order.status === OrderStatus.ToDo)
            .map((item) => (
              <OrderCard key={item.id} order={item} />
            ))}
        </Flex>
        <Flex direction="column" alignItems="center">
          <Heading marginBottom={4} size="lg">
            In Progress
          </Heading>
          {orders
            .filter((order) => order.status === OrderStatus.InProgress)
            .map((item) => (
              <OrderCard key={item.id} order={item} />
            ))}
        </Flex>
      </Flex>
    </>
  );
};

export default Orders;
