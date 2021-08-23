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

interface IOrderCard {
  order: IOrder;
}

const OrderCard: React.FC<IOrderCard> = ({ order }) => {
  return (
    <Flex
      h="7rem"
      w="sm"
      borderRadius="md"
      marginBottom={2}
      direction="column"
      alignItems="center"
      bg="orange.400"
    >
      <Heading fontSize="2xl">{`Pedido ${order.id}`}</Heading>
      <UnorderedList>
        {order.products.map((wrapper) => (
          <ListItem
            key={wrapper.product.name}
          >{`${wrapper.quantity}x - ${wrapper.product.name}`}</ListItem>
        ))}
      </UnorderedList>
      <Flex
        flex="1"
        w="100%"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Text
          d="inline-flex"
          marginLeft={2}
        >{`customer.${order.customer.cpf}.${order.customer.name}`}</Text>
        <IconButton
          colorScheme="green"
          aria-label="Push to in progress"
          borderRadius="md"
          icon={<CheckIcon />}
          size="sm"
        />
      </Flex>
    </Flex>
  );
};

export default OrderCard;
