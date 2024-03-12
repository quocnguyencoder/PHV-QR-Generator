'use client';

import { Button, Flex, Input } from '@chakra-ui/react'; // Assuming you've installed this library
import { useEffect, useState } from 'react';

import EnvOptionSelect from '~/lib/components/Home/EnvOptionSelect';
import GenerateOptionSelect from '~/lib/components/Home/GenerateOptionSelect';
import ModeSwitch from '~/lib/components/Home/ModeSwitch';
import ResultSummary from '~/lib/components/Home/ResultSummary';
import SingleModeForm from '~/lib/components/Home/SingleModeForm';
import ResultTable from '~/lib/components/ResultTable';
import { readExcelAndConvertToQRCodeData } from '~/lib/helpers/excel';
import { generateQRCodes } from '~/lib/helpers/qrCode';
import type { IResult } from '~/lib/interfaces/IResult';
import type { Environment, Mode } from '~/lib/types/GenerateInfo';
import type { QRCodeData, QRType } from '~/lib/types/QRCodeInfo';

import { options } from './constants';

const QRGeneratorSection = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [generateOption, setGenerateOption] = useState<QRType>('PickUp');
  const [envOption, setEnvOption] = useState<Environment>('production');
  const [mode, setMode] = useState<Mode>('multiple');

  const [qrCodeData, setQRCodeData] = useState<QRCodeData[]>([]);
  const [results, setResults] = useState<IResult[]>([]);

  const handleGenerateQrCode = async () => {
    if (mode === 'single') {
      if (qrCodeData.length === 0) return;
      const res = generateQRCodes(generateOption, qrCodeData, envOption);
      setResults(res);
      return;
    }

    if (!selectedFile) return;

    const data = await readExcelAndConvertToQRCodeData(selectedFile);
    const res = generateQRCodes(generateOption, data, envOption);
    setResults(res);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setSelectedFile(fileList[0]);
    }
  };

  const handleModeChange = (value: Mode) => {
    setMode(value);
  };

  const hasResults = results.length > 0;

  // reset result when any info changes
  useEffect(() => {
    setResults([]);
  }, [selectedFile, generateOption, envOption, mode]);

  return (
    <>
      <Flex flexDirection="column" justifyContent="center" minWidth="80%">
        {/* Mode Selection */}
        <ModeSwitch mode={mode} handleModeChange={handleModeChange} />

        {/* Generate Option Selection */}
        <GenerateOptionSelect
          options={options}
          generateOption={generateOption}
          setGenerateOption={setGenerateOption}
        />
        <EnvOptionSelect envOption={envOption} setEnvOption={setEnvOption} />

        {/* Settings based on mode */}
        {mode === 'single' ? (
          <SingleModeForm
            generateOption={generateOption}
            setQRCodeData={setQRCodeData}
          />
        ) : (
          // Render file input for multiple mode
          <Input type="file" onChange={(e) => handleFileChange(e)} />
        )}

        {/* Generate Button */}
        <Button mt={6} colorScheme="blue" onClick={handleGenerateQrCode}>
          Generate
        </Button>
      </Flex>
      <Flex flexDirection="column" justifyContent="center">
        {/* Results Table */}
        {hasResults && (
          <>
            <ResultSummary results={results} />
            <ResultTable results={results} />
          </>
        )}
      </Flex>
    </>
  );
};

export default QRGeneratorSection;
