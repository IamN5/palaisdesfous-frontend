import { Flex, Heading, Image } from '@chakra-ui/react';
import React from 'react';

const NotFound: React.FC = () => {
  const imageLink =
    'https://i.pinimg.com/originals/04/e8/82/04e88298a644d7879da3ad07b934f772.gif';

  return (
    <Flex
      direction="column"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Heading marginBottom={5}>404</Heading>
      <Image src={imageLink} alt="Homer simpsons brain GIF" />
      <Heading marginTop={8}>Page Not Found!</Heading>
    </Flex>
  );
};

export default NotFound;
