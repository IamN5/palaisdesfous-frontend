import { Flex, Heading } from '@chakra-ui/react';
import { BackgroundProps, FlexboxProps } from '@chakra-ui/system';
import React from 'react';

type ICard = BackgroundProps &
  FlexboxProps & {
    title: string;
  };

const Card: React.FC<ICard> = ({ title, children, ...props }) => {
  return (
    <Flex
      minH="7rem"
      w="sm"
      borderRadius="md"
      marginBottom={2}
      marginRight={2}
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      bg="orange.400"
      {...props}
    >
      <Heading
        textTransform="capitalize"
        marginTop={2}
        marginBottom={2}
        fontSize="2xl"
      >
        {title}
      </Heading>
      {children}
    </Flex>
  );
};

export default Card;
