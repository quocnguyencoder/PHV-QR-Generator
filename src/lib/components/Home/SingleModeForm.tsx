import { Stack, Input, Text, HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import type { QRCodeData, QRType } from '~/lib/types/QRCodeInfo';

interface IProps {
  generateOption: QRType;
  setQRCodeData: (qrCodeData: QRCodeData[]) => void;
}

const SingleModeForm = ({ generateOption, setQRCodeData }: IProps) => {
  const [storeId, setStoreId] = useState('');
  const [tableId, setTableId] = useState('');
  const [qrCodeID, setQrCodeID] = useState('');

  useEffect(() => {
    setQRCodeData([{ storeId, tableId, qrCodeID }]);
  }, [storeId, tableId, qrCodeID, setQRCodeData]);

  return (
    <Stack spacing={4}>
      {/* Store ID Input */}
      {generateOption !== 'SignUp' && (
        <HStack>
          <Text w="30%">Store ID:</Text>
          <Input
            type="text"
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
            placeholder="Store ID"
          />
        </HStack>
      )}

      {/* Render inputs based on generate option */}
      {generateOption === 'DineIn' && (
        <HStack>
          <Text w="30%">Table ID:</Text>
          <Input
            type="text"
            value={tableId}
            onChange={(e) => setTableId(e.target.value)}
            placeholder="Table ID"
          />
        </HStack>
      )}
      {generateOption === 'SignUp' && (
        <HStack>
          <Text w="30%">QR Code ID:</Text>
          <Input
            type="text"
            value={qrCodeID}
            onChange={(e) => setQrCodeID(e.target.value)}
            placeholder="QR Code ID"
          />
        </HStack>
      )}
    </Stack>
  );
};

export default SingleModeForm;
