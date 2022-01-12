import { AddIcon } from '@chakra-ui/icons';
import {
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Card from '@components/Card';
import NumberInput from '@components/NumberInput';
import SubmitButton from '@components/SubmitButton';
import TextInput from '@components/TextInput';
import useNotification from '@hooks/useNotification';
import { IIngredient } from '@interfaces/index';
import api from '@services/api';
import React, { useState, useEffect, useMemo } from 'react';

const Ingredients: React.FC = () => {
  const [ingredients, setIngredients] = useState<IIngredient[]>(
    [] as IIngredient[]
  );

  const [name, setName] = useState<string>('');
  const [stock, setStock] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const { createRequestError } = useNotification();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addIconBlue = useMemo(() => <AddIcon color="blue.400" />, []);

  const getIngredients = async () => {
    try {
      const data = await api.getIngredients();

      if (data) {
        setIngredients(data);
      }
    } catch (error) {
      createRequestError(error);
    }
  };

  useEffect(() => {
    getIngredients();
  }, []);

  const patchIngredient = async (ingredient: IIngredient, value: number) => {
    try {
      const newIngredient = { ...ingredient };
      newIngredient.stock = value;

      const data = await api.patchIngredient(newIngredient);

      if (data) {
        getIngredients();
      }
    } catch (error) {
      createRequestError(error);
    }
  };

  const handleSubmit = async () => {
    onClose();
    try {
      const response = await api.createIngredient({ name, stock });
      if (response) {
        setName('');
        setStock(0);
        getIngredients();
      }
    } catch (error) {
      createRequestError(error);
    }
    setLoading(false);
  };

  const handleDelete = async (ingredient: IIngredient) => {
    try {
      const response = await api.deleteIngredient(ingredient);

      if (response) {
        getIngredients();
      }
    } catch (error) {
      createRequestError(error);
    }
  };

  return (
    <Flex w="100vw" flexDir="column" alignItems="center">
      <Heading marginBottom={10}>Lista de clientes</Heading>

      <Flex justifyContent="center" flexWrap="wrap">
        <Card flexDir="row" title="Criar novo ingrediente" bg="blue.400">
          <IconButton
            marginLeft={2}
            aria-label="Adicionar ingrediente"
            icon={addIconBlue}
            colorScheme="gray"
            borderRadius="md"
            onClick={onOpen}
          />
        </Card>
        {ingredients.map((ingredient) => (
          <Card
            onClose={() => handleDelete(ingredient)}
            key={ingredient.name}
            title={ingredient.name}
          >
            <Text>Estoque atual:</Text>
            <NumberInput
              marginTop={2}
              marginBottom={2}
              value={ingredient.stock}
              setValue={(value: number) => patchIngredient(ingredient, value)}
            />
          </Card>
        ))}
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
          <ModalHeader textAlign="center">Cadastrar ingrediente</ModalHeader>
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
            <Text fontSize="sm">Estoque inicial</Text>
            <NumberInput
              width="100%"
              shouldDebounce={false}
              value={stock}
              setValue={setStock}
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
    </Flex>
  );
};

export default Ingredients;
