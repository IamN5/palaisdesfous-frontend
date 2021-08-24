import {
  createNotification,
  sendNotification,
} from '@actions/notificationActions';
import { Box, Button, Flex, Heading, Image } from '@chakra-ui/react';
import { useNotificationContext } from '@context/notificationContext';
import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

interface IOption {
  label: string;
  auth?: string;
  url?: string;
  action?: () => void;
}

const TopMenu: React.FC = () => {
  const { dispatch } = useNotificationContext();

  const options: Array<IOption> = [
    { label: 'Pedidos', url: '/pedidos' },
    { label: 'Cliente', url: '/cliente' },
    { label: 'Funcionários', auth: 'admin', url: '/funcionarios' },
    {
      label: 'teste',
      action: () =>
        dispatch(
          sendNotification(
            createNotification(
              'ola',
              'shaoidhoashdoashdohasodha sohdoasihdoashodhaosihdo aishodiansodnasjn dkajsndlasnodijasoijd'
            )
          )
        ),
    },
  ];

  const history = useHistory();

  const handleClick = (item: IOption) => {
    item.action?.call(this);

    if (item.url) history.push(item.url);
  };

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
          key={item.label}
          bg="black.300"
          marginRight="auto"
          _hover={{ background: 'gray.400' }}
          onClick={() => handleClick(item)}
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
