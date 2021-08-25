import { Button, Flex, Image } from '@chakra-ui/react';
import { useUserContext } from '@context/userContext';
import authService from '@services/authService';
import React from 'react';

import { useHistory } from 'react-router-dom';

interface IOption {
  label: string;
  auth?: string;
  url?: string;
  action?: () => void;
}

const TopMenu: React.FC = () => {
  const { state, dispatch } = useUserContext();
  const { auth } = state;

  const options: Array<IOption> = [
    { label: 'Pedidos', auth: 'cook', url: '/pedidos' },
    { label: 'Clientes', auth: 'waiter', url: '/clientes' },
    { label: 'Funcionários', auth: 'admin', url: '/funcionarios' },
    {
      label: 'Logout',
      url: '/',
      action: () => authService.logout(dispatch),
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

      {options.map((item) =>
        !item.auth || item.auth?.match(auth) || auth.match('admin') ? (
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
        ) : null
      )}
    </Flex>
  );
};

export default TopMenu;
