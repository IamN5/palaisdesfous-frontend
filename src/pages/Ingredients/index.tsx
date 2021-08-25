import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import Card from '@components/Card';
import NumberInput from '@components/NumberInput';
import useNotification from '@hooks/useNotification';
import { IIngredient } from '@interfaces/index';
import api from '@services/api';
import React, { useState, useEffect, useMemo } from 'react';

const Ingredients: React.FC = () => {
  const [ingredients, setIngredients] = useState<IIngredient[]>(
    [] as IIngredient[]
  );
  const { createRequestError } = useNotification();

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
          />
        </Card>
        {ingredients.map((ingredient) => (
          <Card title={ingredient.name}>
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
    </Flex>
  );
};

export default Ingredients;
