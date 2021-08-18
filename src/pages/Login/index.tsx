import React from 'react';

import { Grid, Heading, Flex, Image, Box } from '@chakra-ui/react';

import LoginForm from '@components/LoginForm';
import authService from '@services/authService';
import { Redirect } from 'react-router-dom';

const Login: React.FC = () => {
  return !authService.isAuthenticated() ? (
    <Grid
      height="100vh"
      templateColumns="1fr 480px 480px 1fr"
      templateRows="1fr 480px 1fr"
      templateAreas="
        '. . . .'
        '. logo form .'
        '. . . .'
      "
    >
      <Flex gridArea="logo" flexDir="column" justifyContent="center">
        <Box>
          <Image
            d="inline"
            w={4}
            h={4}
            marginBottom={1}
            src={`${process.env.PUBLIC_URL}/crown.svg`}
          />
          <Heading d="inline" paddingInlineStart={2} size="md">
            Palais des Fous
          </Heading>
        </Box>
        <Heading size="2xl" lineHeight="shorter" marginTop={2}>
          Faça o login na plataforma
        </Heading>
      </Flex>
      <LoginForm area="form" />
    </Grid>
  ) : (
    <Redirect to="/home" />
  );
};

export default Login;
