import { Box, Text } from '@chakra-ui/react';
import type React from 'react';
import { useState, useRef } from 'react';
import { MdUploadFile } from 'react-icons/md';

interface FileInputProps { }

const FileInput: React.FC<FileInputProps> = () => {
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  let textContent;
  if (selectedFile) {
    textContent = `Selected file: ${selectedFile.name}`;
  } else if (dragging) {
    textContent = 'Drop Excel file here';
  } else {
    textContent = 'Drag and drop Excel file here or click to browse';
  }

  return (
    <Box
      p={4}
      border={dragging ? '2px dashed #4FD1C5' : '2px dashed #CBD5E0'}
      borderRadius="md"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleBoxClick}
      cursor="pointer"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <input
        type="file"
        onChange={handleFileInputChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
      />
      <Box bottom={4} opacity={dragging ? 0 : 1} transition="opacity 0.3s ease">
        <MdUploadFile size={50} />
      </Box>
      <Text
        textAlign="center"
        color={dragging ? 'gray' : 'inherit'}
        fontSize="lg"
      >
        {textContent}
      </Text>
    </Box>
  );
};

export default FileInput;
