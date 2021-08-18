import React, { useState, useMemo } from 'react';
import { Flex, SystemProps, Text } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';
import { useUserContext } from '@context/userContext';
import apiMock from '@services/apiMock';
import auth from '@services/authService';
import SubmitButton from '../SubmitButton';
import PasswordInput from '../PasswordInput';
import TextInput from '../TextInput';

export interface ILoginForm {
  area: SystemProps['gridArea'];
}

const LoginForm: React.FC<ILoginForm> = ({ area }) => {
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { dispatch } = useUserContext();

  const icon = useMemo(() => <EmailIcon />, []);

  const history = useHistory();
  const onSubmit = () => {
    const userData = apiMock.getUserData(user, password);

    if (userData) {
      auth.login(userData, dispatch);
      history.push('/home');
    }

    setError('Wrong user/password combination');
  };

  return (
    <Flex
      backgroundColor="gray.700"
      borderRadius="lg"
      flexDir="column"
      alignItems="center"
      paddingTop={32}
      gridArea={area}
      boxShadow="dark-lg"
    >
      <TextInput
        icon={icon}
        placeholder="Usuário"
        value={user}
        setValue={setUser}
      />

      <PasswordInput value={password} setValue={setPassword} />

      <SubmitButton
        text="Login"
        onClick={onSubmit}
        props={{ marginTop: 24, w: '70%', loadingText: 'Logging in' }}
      />

      <Text marginTop={5} fontSize="md" textColor="red.400">
        {error}
      </Text>
    </Flex>
  );
};

export default LoginForm;
