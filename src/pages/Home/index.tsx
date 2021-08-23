import { Box, Flex } from '@chakra-ui/react';
import TopMenu from '@components/TopMenu';
import NotFound from '@pages/NotFound';
import React from 'react';

const Home: React.FC = ({ children }) => {
  return (
    <Flex flexDirection="column" w="100vw" h="100vh">
      <TopMenu />
      <Box marginTop={4} flex="1">
        {children}
      </Box>
    </Flex>
  );
};

export default Home;
