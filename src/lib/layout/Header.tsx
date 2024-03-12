import {
  Box,
  Flex,
  useColorModeValue,
  Stack,
  Text,
  HStack,
} from '@chakra-ui/react';
import Image from 'next/image';

import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack>
          <Image src="/pizzahut_logo.png" alt="logo" width="40" height="40" />
          <Text fontWeight="bold">PHV QR Generator</Text>
        </HStack>

        <Flex alignItems="center">
          <Stack direction="row" spacing={7}>
            <ThemeToggle />
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
