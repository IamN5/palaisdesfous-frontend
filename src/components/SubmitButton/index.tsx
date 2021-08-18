import React, { useState, memo } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

interface ISubmitButton {
  text: string;
  onClick?: () => void;
  color?: string;
  props: ButtonProps;
}

const SubmitButton: React.FC<ISubmitButton> = ({
  text,
  onClick,
  color = 'orange',
  props,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    setLoading(!loading);

    onClick?.call({});
  };

  return (
    <Button
      {...props}
      isLoading={loading}
      backgroundColor={`${color}.400`}
      _hover={!loading ? { backgroundColor: `${color}.500` } : {}}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};

export default memo(SubmitButton);
