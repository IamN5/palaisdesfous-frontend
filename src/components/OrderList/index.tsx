import { Flex, Heading } from '@chakra-ui/react';
import OrderCard from '@components/OrderCard';
import { IOrder } from '@interfaces/index';
import React from 'react';
import { useDrop } from 'react-dnd';

interface IOrderList {
  title: string;
  orders: IOrder[];
  droppable?: boolean;
}

const OrderList: React.FC<IOrderList> = ({
  orders,
  title,
  droppable = false,
}) => {
  const [, dropRef] = useDrop({
    accept: 'card',
    drop: () => ({ droppable }),
  });

  return (
    <Flex
      ref={dropRef}
      direction="column"
      alignItems="center"
      border="1px dashed gray"
      minW="sm"
    >
      <Heading marginBottom={4} size="lg">
        {title}
      </Heading>
      {orders.map((item) => (
        <OrderCard key={item.id} order={item} />
      ))}
    </Flex>
  );
};

export default OrderList;
