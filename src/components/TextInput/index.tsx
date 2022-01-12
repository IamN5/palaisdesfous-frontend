import React, { memo, ReactElement } from 'react';
import { InputGroup, Input, InputLeftElement } from '@chakra-ui/react';

interface ITextInput {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  icon?: ReactElement;
  width?: string;
}

const TextInput: React.FC<ITextInput> = ({
  icon,
  value,
  setValue,
  placeholder,
  width,
}) => {
  return (
    <InputGroup width={width || '70%'} _focusWithin={{ color: '#ED8936' }}>
      {icon && (
        <InputLeftElement height="100%" pointerEvents="none" children={icon} />
      )}
      <Input
        variant="outline"
        backgroundColor="gray.800"
        placeholder={placeholder}
        size="lg"
        focusBorderColor="orange.400"
        textColor="white"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </InputGroup>
  );
};

export default memo(TextInput);
