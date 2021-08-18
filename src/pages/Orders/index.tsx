import { Flex, Heading, Text } from '@chakra-ui/react';
import OrderCard from '@components/OrderCard';
import React from 'react';

const Orders: React.FC = () => {
  const toDoOrders: string[] = ['um', 'dois'];
  const inProgressOrder: string[] = ['nah'];
  const doneOrders = [];

  return (
    <>
      <Heading w="100%" textAlign="center">
        Pedidos
      </Heading>
      <Flex direction="row" justifyContent="space-evenly">
        <Flex direction="column" alignItems="center">
          <Text fontSize="lg">To do</Text>
          {toDoOrders.map((item) => (
            <OrderCard />
          ))}
        </Flex>
        <Flex direction="column" alignItems="center">
          <Text fontSize="lg">In Progress</Text>
          {inProgressOrder.map((item) => (
            <OrderCard />
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export default Orders;
