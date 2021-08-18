import { Box, Flex } from '@chakra-ui/react';
import SideMenu from '@components/SideMenu';
import React from 'react';

const Home: React.FC = ({ children }) => {
  return (
    <Flex flexDirection="row" w="100vw" h="100vh">
      <SideMenu />
      <Box marginTop={8} flex="1">
        {children}
      </Box>
    </Flex>
  );
};

export default Home;
