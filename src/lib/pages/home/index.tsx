import { Flex } from '@chakra-ui/react';

import QRGeneratorSection from './QRGeneratorSection';

const Home = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      <QRGeneratorSection />
    </Flex>
  );
};

export default Home;
