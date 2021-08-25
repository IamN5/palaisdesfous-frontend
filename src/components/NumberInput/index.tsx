import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Flex,
  FlexProps,
  IconButton,
  Input,
  useNumberInput,
} from '@chakra-ui/react';
import React, { memo, useMemo, useEffect } from 'react';
import { debounce } from 'lodash';

type INumberInput = FlexProps & {
  value: number;
  setValue: (value: number) => void;
};

const NumberInput: React.FC<INumberInput> = ({ value, setValue, ...props }) => {
  const addIcon = useMemo(() => <AddIcon color="orange.400" />, []);
  const minusIcon = useMemo(() => <MinusIcon color="orange.400" />, []);

  const changeHandler = (valueAsString: string, valueAsNumber: number) => {
    setValue(valueAsNumber);
  };

  const debounceChangeHandler = useMemo(
    () => debounce(changeHandler, 1000),
    [setValue]
  );

  useEffect(() => {
    return () => debounceChangeHandler.cancel();
  }, []);

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: value,
      min: 0,
      precision: 0,
      onChange: debounceChangeHandler,
      focusInputOnChange: false,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <Flex flexDir="row-reverse" alignItems="center" {...props}>
      <IconButton
        marginLeft={2}
        aria-label="Adicionar unidade"
        icon={addIcon}
        colorScheme="gray"
        borderRadius="md"
        {...inc}
      />
      <Input
        variant="outline"
        backgroundColor="gray.800"
        size="lg"
        focusBorderColor="orange.400"
        textColor="white"
        {...input}
      />
      <IconButton
        marginRight={2}
        aria-label="Remover unidade"
        icon={minusIcon}
        colorScheme="gray"
        borderRadius="md"
        {...dec}
      />
    </Flex>
  );
};

export default memo(NumberInput);
