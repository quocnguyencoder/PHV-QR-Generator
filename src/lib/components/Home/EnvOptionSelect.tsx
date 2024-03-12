import { Stack, Select, Text } from '@chakra-ui/react';

import type { Environment } from '~/lib/types/GenerateInfo';

interface IProps {
  envOption: Environment;
  setEnvOption: (envOption: Environment) => void;
}

const EnvOptionSelect = ({ envOption, setEnvOption }: IProps) => {
  return (
    <Stack direction="row" align="center" mb={4}>
      <Text w="30%">Environment:</Text>
      <Select
        value={envOption}
        onChange={(e) => setEnvOption(e.target.value as Environment)}
      >
        <option value="uat">UAT</option>
        <option value="production">PRO</option>
      </Select>
    </Stack>
  );
};

export default EnvOptionSelect;
