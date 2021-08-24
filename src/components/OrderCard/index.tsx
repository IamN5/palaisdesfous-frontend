import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import { IOrder } from '@interfaces/index';
import { useDrag } from 'react-dnd';
import { useOrdersContext } from '@context/ordersContext';
import { pushOrder } from '@actions/orderActions';
import api from '@services/api';

interface IOrderCard {
  order: IOrder;
}

interface IDroppable {
  droppable: boolean;
}

const OrderCard: React.FC<IOrderCard> = ({ order }) => {
  const { state, dispatch } = useOrdersContext();
  const canDrag = !state.inProgressOrders.includes(order);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: order,
    canDrag: () => canDrag,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<IDroppable>();

      if (item && dropResult?.droppable) {
        if (api.pushOrder(order) != null) dispatch(pushOrder({ order: item }));
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <Flex
      ref={drag}
      minH="7rem"
      w="sm"
      borderRadius="md"
      marginBottom={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      bg="orange.400"
      border={isDragging ? '2px dashed gray' : 'none'}
      opacity={isDragging ? 0.4 : 1}
      _hover={canDrag ? { cursor: 'grab' } : undefined}
    >
      <Heading
        marginTop={2}
        marginBottom={2}
        fontSize="2xl"
      >{`Pedido ${order.id}`}</Heading>
      <UnorderedList flex="1" spacing={2} listStyleType="none">
        {order.products.map((wrapper) => (
          <ListItem
            key={wrapper.product.name}
          >{`${wrapper.product.name} - x${wrapper.quantity}`}</ListItem>
        ))}
      </UnorderedList>

      <Text
        fontSize="xx-small"
        marginTop={2}
      >{`customer.${order.customer.cpf}.${order.customer.name}`}</Text>
    </Flex>
  );
};

export default OrderCard;
