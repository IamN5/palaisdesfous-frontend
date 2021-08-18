import React, { useState, memo } from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { LockIcon, ViewIcon } from '@chakra-ui/icons';

interface IPasswordInput {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const PasswordInput: React.FC<IPasswordInput> = ({ value, setValue }) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <InputGroup width="70%" marginTop={6} _focusWithin={{ color: '#ED8936' }}>
      <InputLeftElement
        height="100%"
        pointerEvents="none"
        children={<LockIcon />}
      />
      <Input
        variant="outline"
        backgroundColor="gray.800"
        placeholder="Senha"
        size="lg"
        focusBorderColor="orange.400"
        textColor="white"
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <InputRightElement height="100%">
        <IconButton
          size="md"
          _hover={{ background: 'none' }}
          color={show ? '#ED8936' : 'white'}
          variant="ghost"
          aria-label="Show password"
          icon={<ViewIcon />}
          onClick={() => setShow(!show)}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default memo(PasswordInput);
