import {
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
  Input,
  NumberInput,
  NumberInputField,
  Select,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import SubmitButton from '@components/SubmitButton';
import TextInput from '@components/TextInput';
import useNotification from '@hooks/useNotification';
import api, { registerProduct } from '@services/api';
import { IIngredient, IProduct } from '@interfaces/index';
import React, { useEffect, useMemo, useState } from 'react';
import Card from '@components/Card';

const Products: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [ingredients, setIngredients] = useState<IIngredient[]>(
    [] as IIngredient[]
  );
  const [ingredientName, setIngredientName] = useState<string>('');
  const [products, setProducts] = useState<IProduct[]>([] as IProduct[]);
  const [loading, setLoading] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { createRequestError } = useNotification();

  const addIcon = useMemo(() => <AddIcon />, []);

  const getProducts = async () => {
    try {
      const data = await api.getProducts();
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      createRequestError(error);
    }
  };

  const handleSubmit = async () => {
    onClose();
    try {
      const response = await registerProduct(name, price, ingredients);
      if (response) {
        setName('');
        setPrice(0);
        setIngredients([]);
        getProducts();
      }
    } catch (error) {
      createRequestError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Flex flexDir="column" alignItems="center" marginLeft={12}>
        <Flex>
          <Heading marginBottom={12}>Lista de produtos</Heading>
          <Button
            leftIcon={addIcon}
            colorScheme="orange"
            onClick={onOpen}
            marginLeft={16}
          >
            Cadastrar produto
          </Button>
        </Flex>
        <Flex flexWrap="wrap" marginInline={16}>
          {products.map((item) => {
            return (
              <Card key={item.name} title={item.name}>
                {item.ingredients.map((ingredient) => (
                  <Text>
                    {ingredient.ingredient.name}: {ingredient.quantity}
                  </Text>
                ))}
                <Text>R$ {item.price}</Text>
              </Card>
            );
          })}
        </Flex>
      </Flex>

      <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Cadastrar produto</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginInline={8}>
            <TextInput
              width="100%"
              placeholder="Nome"
              value={name}
              setValue={setName}
            />
            <NumberInput>
              <NumberInputField
                width="100%"
                placeholder="Preço"
                backgroundColor="gray.800"
                value={price}
                onChange={(event) => setPrice(event.target.valueAsNumber)}
              />
            </NumberInput>
            <Select
              bg="gray.800"
              color="gray.500"
              size="lg"
              width="100%"
              focusBorderColor="orange.400"
              variant="outline"
              placeholder="Selecione o ingrediente"
              value={ingredientName}
              onChange={(event) => setIngredientName(event.target.value)}
            >
              {/* {products.map((item) =>
                item.ingredients.map((ingredient: any) => (
                  <option value={ingredient.ingredient.name}>
                    {ingredient.name}
                  </option>
                ))
              )} */}
            </Select>
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

export default Products;
