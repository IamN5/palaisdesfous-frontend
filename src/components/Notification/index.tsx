import { removeNotification } from '@actions/notificationActions';
import { Flex, Heading, SlideFade, Text } from '@chakra-ui/react';
import { useNotificationContext } from '@context/notificationContext';
import { NotificationTypes } from '@interfaces/index';
import React, { useState, useEffect } from 'react';
import { setTimeout } from 'timers';

const Notification: React.FC = () => {
  const { state, dispatch } = useNotificationContext();
  const { title, message, type } = state.currentNotification;
  const [show, setShow] = useState<boolean>(false);

  const [minH, W] = [6.25, '25vw'];

  useEffect(() => {
    if (
      state.currentNotification.type !== NotificationTypes.NOTIFICATION_NONE
    ) {
      setShow(true);
      setTimeout(() => dispatch(removeNotification()), 20000);
    } else if (show) {
      setShow(false);
    }
  }, [state]);

  const notificationColor = () => {
    switch (type) {
      case NotificationTypes.NOTIFICATION_ERROR:
        return 'red.400';
      case NotificationTypes.NOTIFICATION_SUCCESS:
        return 'green.400';
      default:
        return 'blue.400';
    }
  };

  return (
    <SlideFade in={show} offsetY={`-${2 * minH}vw`}>
      <Flex
        zIndex={999}
        pos="absolute"
        top="5rem"
        left="0"
        right="0"
        margin="0 auto"
        flexDir="column"
        alignItems="center"
        w={W}
        minH={`${minH}vw`}
        bg={notificationColor()}
        borderRadius="md"
        padding={2}
      >
        <Heading size="sm">{title}</Heading>
        <Text fontSize="sm">{message}</Text>
      </Flex>
    </SlideFade>
  );
};

export default Notification;
