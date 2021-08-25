import {
  Box,
  Flex,
  useDisclosure,
  Button,
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
import api, { registerCustomer } from '@services/api';
import { ICustomer } from '@interfaces/index';
import React, { useEffect, useMemo, useState } from 'react';

const Customer: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<ICustomer[]>([] as ICustomer[]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { createRequestError } = useNotification();

  const addIcon = useMemo(() => <AddIcon />, []);

  const getCustomers = async () => {
    try {
      const data = await api.getCustomers();
      if (data) {
        setCustomers(data);
      }
    } catch (error) {
      createRequestError(error);
    }
  };

  const handleSubmit = async () => {
    onClose();
    try {
      const response = await registerCustomer(cpf, name);
      if (response) {
        setName('');
        setCpf('');
        getCustomers();
      }
    } catch (error) {
      createRequestError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <>
      <Flex flexDir="column" alignItems="center" marginLeft={12}>
        <Flex>
          <Heading marginBottom={12}>Lista de clientes</Heading>
          <Button
            leftIcon={addIcon}
            colorScheme="orange"
            onClick={onOpen}
            marginLeft={16}
          >
            Cadastrar cliente
          </Button>
        </Flex>
        <Flex flexWrap="wrap" marginInline={16}>
          {customers.map((item) => {
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
          <ModalHeader textAlign="center">Cadastrar cliente</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginInline={8}>
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

export default Customer;
