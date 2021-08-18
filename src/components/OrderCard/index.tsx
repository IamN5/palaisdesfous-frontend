import { CheckIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import React from 'react';

const OrderCard: React.FC = () => {
  return (
    <Flex
      h="7rem"
      w="sm"
      borderRadius="md"
      marginBottom={2}
      direction="column"
      alignItems="center"
      bg="gray.300"
    >
      <Flex w="100%" direction="row" justifyContent="center">
        <Heading d="inline" fontSize="2xl">
          Card title
        </Heading>
        <IconButton
          colorScheme="green"
          aria-label="Push to in progress"
          borderRadius="md"
          icon={<CheckIcon />}
          size="sm"
        />
      </Flex>
      <Text>content</Text>
      <Text>rest</Text>
    </Flex>
  );
};

export default OrderCard;
