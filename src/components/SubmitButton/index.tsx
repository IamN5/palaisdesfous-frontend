import React, { memo } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

interface ISubmitButton {
  text: string;
  onClick?: () => void;
  color?: string;
  props: ButtonProps;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubmitButton: React.FC<ISubmitButton> = ({
  text,
  onClick,
  color = 'orange',
  loading,
  setLoading,
  props,
}) => {
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
