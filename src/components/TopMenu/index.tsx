import { Box, Button, Flex, Heading, Image } from '@chakra-ui/react';
import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

interface IOption {
  label: string;
  auth?: string;
  url: string;
}

const TopMenu: React.FC = () => {
  const options: Array<IOption> = [
    { label: 'Pedidos', url: '/pedidos' },
    { label: 'Cliente', url: '/cliente' },
    { label: 'Funcionários', auth: 'admin', url: '/funcionarios' },
  ];

  const history = useHistory();

  return (
    <Flex
      flexDir="row"
      alignItems="center"
      paddingTop={3}
      paddingLeft={4}
      paddingRight={4}
      paddingBottom={3}
      bg="gray.500"
    >
      <Image
        marginRight="auto"
        w={12}
        h={12}
        src={`${process.env.PUBLIC_URL}/crown.svg`}
      />

      {options.map((item, idx) => (
        <Button
          bg="black.300"
          marginRight="auto"
          _hover={{ background: 'gray.400' }}
          onClick={() => history.push(item.url)}
          textColor={
            history.location.pathname === item.url ? 'orange.400' : 'white'
          }
        >
          {item.label}
        </Button>
      ))}
    </Flex>
  );
};

export default TopMenu;
