import {
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
import { finishOrder, pushOrder } from '@actions/orderActions';
import api from '@services/api';
import useNotification from '@hooks/useNotification';
import { CheckIcon } from '@chakra-ui/icons';

interface IOrderCard {
  order: IOrder;
  doneButton?: boolean;
}

interface IDroppable {
  droppable: boolean;
}

const OrderCard: React.FC<IOrderCard> = ({ order, doneButton = false }) => {
  const { state, dispatch } = useOrdersContext();
  const { createRequestError } = useNotification();

  const canDrag = !state.inProgressOrders.includes(order);

  const clickDone = async () => {
    try {
      const response = await api.pushOrder(order);

      if (response != null) dispatch(finishOrder({ order }));
    } catch (error) {
      createRequestError(error);
    }
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: order,
    canDrag: () => canDrag,
    end: async (item, monitor) => {
      const dropResult = monitor.getDropResult<IDroppable>();

      if (item && dropResult?.droppable) {
        try {
          const response = await api.pushOrder(order);
          console.log(`Order push response is ${response}`);

          if (response != null) dispatch(pushOrder({ order: item }));
        } catch (error) {
          createRequestError(error);
        }
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

      <Flex
        marginTop={2}
        textAlign="center"
        justifyContent="space-between"
        w="100%"
      >
        <Text
          alignSelf="flex-end"
          fontSize="xx-small"
          marginLeft="35%"
        >{`customer.${order.customer.cpf}.${order.customer.name}`}</Text>
        {doneButton && (
          <IconButton
            aria-label="Push to done"
            colorScheme="green"
            alignSelf="flex-end"
            borderRadius="md"
            onClick={clickDone}
            icon={<CheckIcon />}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default OrderCard;
