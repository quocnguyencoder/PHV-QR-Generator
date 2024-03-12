import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Link,
} from '@chakra-ui/react';
import QRCode from 'qrcode.react';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { downloadQRCode, extractQRCodeFileName } from '../helpers/qrCode';
import type { IResult } from '../interfaces/IResult';

interface ResultTableProps {
  results: IResult[];
}

const ResultTable = ({ results }: ResultTableProps) => {
  return (
    <Table variant="simple" mt={8}>
      <Thead>
        <Tr>
          <Th>Num</Th>
          <Th>Store ID</Th>
          <Th>Full URL</Th>
          <Th>QR Code</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {results.map((result, index) => (
          <Tr key={`${uuidv4()}`}>
            <Td>{index + 1}</Td>
            <Td>{result.storeId}</Td>
            <Td>
              <Link href={result.fullUrl} isExternal>
                {result.fullUrl}
              </Link>
            </Td>
            <Td>
              <QRCode
                id={extractQRCodeFileName(result.fullUrl)}
                size={350}
                // includeMargin
                style={{ border: '5px solid #fff' }}
                value={result.fullUrl}
                level="H"
                imageSettings={{
                  src: './pizzahut_logo.png',
                  x: undefined,
                  y: undefined,
                  height: 70,
                  width: 75,
                  excavate: true,
                }}
              />
            </Td>
            <Td>
              <Button
                colorScheme="teal"
                variant="link"
                onClick={() =>
                  downloadQRCode(extractQRCodeFileName(result.fullUrl))
                }
              >
                download
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default React.memo(ResultTable, (prevProps, nextProps) => {
  return prevProps.results.length === nextProps.results.length;
});
