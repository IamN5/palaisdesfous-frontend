import React from 'react';
import { useToast } from '@chakra-ui/react';

const useNotification = () => {
  const toast = useToast();

  const createNotification = (title: string, message: string) =>
    toast({
      position: 'top',
      status: 'info',
      title,
      description: message,
      duration: 10000,
      isClosable: true,
    });

  const createError = (title: string, message: string) =>
    toast({
      position: 'top',
      status: 'error',
      title,
      description: message,
      duration: 10000,
      isClosable: true,
    });

  const createRequestError = (error: any) =>
    toast({
      position: 'top',
      status: 'error',
      title: error.response ? error.response.data.error : 'Error',
      description: error.response
        ? `Server returned with status ${error.response.status}: ${error.response.data.message}`
        : error.message,
      duration: 10000,
      isClosable: true,
    });

  return {
    createNotification,
    createError,
    createRequestError,
  };
};

export default useNotification;
