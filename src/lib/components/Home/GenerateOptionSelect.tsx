import { Stack, Select, Text } from '@chakra-ui/react';

import type { GenerateOptions } from '~/lib/types/GenerateInfo';
import type { QRType } from '~/lib/types/QRCodeInfo';

interface IProps {
  options: GenerateOptions;
  generateOption: QRType;
  setGenerateOption: (generateOption: QRType) => void;
}

const GenerateOptionSelect = ({
  options,
  generateOption,
  setGenerateOption,
}: IProps) => {
  return (
    <Stack direction="row" align="center" mb={4}>
      <Text w="30%">QR Code Type:</Text>
      <Select
        value={generateOption}
        onChange={(e) => setGenerateOption(e.target.value as QRType)}
      >
        {Object.keys(options).map((key) => (
          <option key={key} value={key}>
            {options[key as QRType].label}
          </option>
        ))}
      </Select>
    </Stack>
  );
};

export default GenerateOptionSelect;
