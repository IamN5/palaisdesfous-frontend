import { Button, Flex, Heading, Image } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

interface IOption {
  label: string;
  auth?: string;
  url: string;
}

const SideMenu: React.FC = () => {
  const options: Array<IOption> = [
    { label: 'Pedidos', url: '/pedidos' },
    { label: 'Cliente', url: '/cliente' },
    { label: 'Funcionários', auth: 'admin', url: '/funcionarios' },
  ];

  const history = useHistory();

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      w="20%"
      h="100vh"
      borderRightWidth="1px"
      marginRight={14}
    >
      <Image
        w={20}
        h={20}
        marginTop={6}
        marginBottom={1}
        src={`${process.env.PUBLIC_URL}/crown.svg`}
      />
      <Heading size="md" marginBottom={6}>
        Palais de Fous
      </Heading>
      {options.map((item) => (
        <Button
          bg="black.300"
          borderBottom="1px"
          borderRadius={0}
          w="100%"
          onClick={() => history.push(item.url)}
        >
          {item.label}
        </Button>
      ))}
    </Flex>
  );
};

export default SideMenu;
