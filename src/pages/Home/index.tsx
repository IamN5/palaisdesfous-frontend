import { Box, Flex } from '@chakra-ui/react';
import Notification from '@components/Notification';
import TopMenu from '@components/TopMenu';
import React from 'react';

const Home: React.FC = ({ children }) => {
  return (
    <Flex flexDirection="column" w="100vw" h="100vh">
      <Notification />
      <TopMenu />
      <Box marginTop={4} flex="1">
        {children}
      </Box>
    </Flex>
  );
};

export default Home;
