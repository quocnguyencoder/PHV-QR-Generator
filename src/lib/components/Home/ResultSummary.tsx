import { Button, VStack, Text, HStack } from '@chakra-ui/react';

import { downloadSummaryExcel } from '~/lib/helpers/excel';
import { downloadAllQRCodes } from '~/lib/helpers/qrCode';
import type { IResult } from '~/lib/interfaces/IResult';

interface ResultSummaryProps {
  results: IResult[];
}

const ResultSummary = ({ results }: ResultSummaryProps) => {
  const handleDownloadAll = () => {
    downloadAllQRCodes(results);
  };

  // Create a Set to store unique URLs
  const uniqueUrls = new Set();

  // Check for duplicate URLs
  results.forEach((result) => {
    uniqueUrls.add(result.fullUrl);
  });

  // Calculate the number of unique URLs
  const uniqueUrlsCount = uniqueUrls.size;
  const duplicatedUrlsCount = results.length - uniqueUrlsCount;

  return (
    <VStack mt={8} alignItems="flex-start">
      <Text fontSize="4xl" fontWeight="bold">
        Result
      </Text>
      <HStack width="100%" justifyContent="space-between">
        <VStack alignItems="flex-start">
          <Text>
            Total: <strong>{results.length}</strong>
          </Text>
          <Text>
            Duplicate Results:{' '}
            <strong
              style={{ color: duplicatedUrlsCount > 0 ? 'red' : 'green' }}
            >
              {duplicatedUrlsCount}
            </strong>
          </Text>
        </VStack>
        <HStack>
          <Button
            colorScheme="teal"
            onClick={() => downloadSummaryExcel(results, 'summary')}
          >
            Download summary excel
          </Button>
          <Button colorScheme="blue" onClick={handleDownloadAll}>
            Download all
          </Button>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default ResultSummary;
