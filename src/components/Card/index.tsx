import { CloseButton, Flex, Heading } from '@chakra-ui/react';
import { BackgroundProps, FlexboxProps } from '@chakra-ui/system';
import React from 'react';

type ICard = BackgroundProps &
  FlexboxProps & {
    title: string;
    onClose?: () => void;
  };

const Card: React.FC<ICard> = ({ title, children, onClose, ...props }) => {
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
      {onClose && (
        <CloseButton alignSelf="flex-end" size="sm" onClick={onClose} />
      )}
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
