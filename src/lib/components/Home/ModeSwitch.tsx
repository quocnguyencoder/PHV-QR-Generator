import { Stack, ButtonGroup, Button, Text } from '@chakra-ui/react';

import type { Mode } from '~/lib/types/GenerateInfo';

interface IModeSwitchProps {
  mode: Mode;
  handleModeChange: (mode: Mode) => void;
}

const ModeSwitch = ({ mode, handleModeChange }: IModeSwitchProps) => {
  return (
    <Stack direction="row" align="center" justify="space-between" mb={4}>
      <Text>Select Mode:</Text>
      <ButtonGroup variant="outline" spacing="6">
        <Button
          onClick={() => handleModeChange('single')}
          colorScheme={mode === 'single' ? 'blue' : 'gray'}
        >
          Single
        </Button>
        <Button
          onClick={() => handleModeChange('multiple')}
          colorScheme={mode === 'multiple' ? 'blue' : 'gray'}
        >
          Multiple
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default ModeSwitch;
