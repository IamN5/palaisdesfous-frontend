import {
  Box,
  Flex,
  useDisclosure,
  Button,
  Select,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  Text,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import SubmitButton from '@components/SubmitButton';
import TextInput from '@components/TextInput';
import useNotification from '@hooks/useNotification';
import api, { registerUser } from '@services/api';
import { IUser } from '@interfaces/index';
import React, { useEffect, useMemo, useState } from 'react';

const Users: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [auth, setAuth] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([] as IUser[]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { createRequestError } = useNotification();

  const addIcon = useMemo(() => <AddIcon />, []);

  const getUsers = async () => {
    try {
      const data = await api.getUsers();
      if (data) {
        setUsers(data);
      }
    } catch (error) {
      createRequestError(error);
    }
  };

  const handleSubmit = async () => {
    onClose();
    try {
      const response = await registerUser(cpf, name, email, auth, password);
      if (response) {
        setName('');
        setCpf('');
        setEmail('');
        setAuth('');
        setPassword('');
        getUsers();
      }
    } catch (error) {
      createRequestError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Flex flexDir="column" alignItems="center" marginLeft={12}>
        <Flex>
          <Heading marginBottom={12}>Lista de funcionários</Heading>
          <Button
            leftIcon={addIcon}
            colorScheme="orange"
            onClick={onOpen}
            marginLeft={16}
          >
            Cadastrar funcionário
          </Button>
        </Flex>
        <Flex flexWrap="wrap" marginInline={16}>
          {users.map((item) => {
            return (
              <Box
                key={item.cpf}
                w="300px"
                bg="orange.800"
                p="6"
                borderRadius="md"
                marginBottom={8}
                marginRight={8}
                boxShadow="lg"
              >
                <Text fontSize="20px" fontWeight="bold" casing="capitalize">
                  {item.name}
                </Text>
                <Text>CPF: {item.cpf}</Text>
                <Text>{item.email}</Text>
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  letterSpacing="1px"
                  casing="uppercase"
                  marginTop={4}
                >
                  {item.auth}
                </Text>
              </Box>
            );
          })}
        </Flex>
      </Flex>

      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        colorScheme="teal"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Cadastrar funcionário</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="space-around"
            marginInline={8}
          >
            <TextInput
              width="100%"
              placeholder="Nome"
              value={name}
              setValue={setName}
            />
            <TextInput
              width="100%"
              placeholder="CPF"
              value={cpf}
              setValue={setCpf}
            />
            <TextInput
              width="100%"
              placeholder="E-mail"
              value={email}
              setValue={setEmail}
            />
            <Select
              bg="gray.800"
              color="gray.500"
              size="lg"
              width="100%"
              focusBorderColor="orange.400"
              variant="outline"
              placeholder="Selecione o cargo"
              value={auth}
              onChange={(event) => setAuth(event.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="waiter">Atendente</option>
              <option value="cook">Cozinheiro</option>
            </Select>
            <TextInput
              width="100%"
              placeholder="Senha"
              value={password}
              setValue={setPassword}
            />
          </ModalBody>
          <ModalFooter>
            <SubmitButton
              text="Cadastrar"
              onClick={handleSubmit}
              loading={loading}
              setLoading={setLoading}
              props={{
                marginTop: 4,
                marginInline: 8,
                w: '100%',
                loadingText: 'Cadastrando',
              }}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Users;
