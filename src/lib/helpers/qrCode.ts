/* eslint-disable no-console */
import { saveAs } from 'file-saver';

import type { IResult } from '../interfaces/IResult';
import { baseUrl, options } from '../pages/home/constants';
import type { GenerateParams } from '../types/GenerateInfo';
import type { QRCodeData, QRType } from '../types/QRCodeInfo';

export const convertDataToResult = (
  data: QRCodeData,
  qrCodeType: QRType
): IResult => {
  const { storeId, tableId, qrCodeID } = data;
  let params: GenerateParams = { storeId };

  if (qrCodeType === 'DineIn') {
    params = { storeId, tableId };
  } else if (qrCodeType === 'SignUp') {
    params = { storeId, qrCodeID };
  }

  const fullUrl = baseUrl + options[qrCodeType].generatePath(params);
  const newResult: IResult = { storeId, fullUrl };
  return newResult;
};

export const generateQRCodes = (
  qrCodeType: QRType,
  data: QRCodeData[]
): IResult[] => {
  const results: IResult[] = data.map((item) =>
    convertDataToResult(item, qrCodeType)
  );
  return results;
};

export function extractQRCodeFileName(url: string): string {
  const queryString = url.split('?')[1];
  if (!queryString) {
    return '';
  }

  const queryParams = new URLSearchParams(queryString);

  return queryParams.toString();
}

export const downloadQRCode = (fileName: string) => {
  return new Promise<void>((resolve, reject) => {
    const canvas = document.getElementById(`${fileName}`) as HTMLCanvasElement;

    if (!canvas) {
      console.error('Canvas element not found', fileName);
      reject(new Error('Canvas element not found'));
      return;
    }

    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, fileName);
        resolve();
      } else {
        reject(new Error('Failed to create blob'));
      }
    });
  });
};

export const downloadAllQRCodes = async (results: IResult[]) => {
  try {
    await Promise.all(
      results.map((result) =>
        downloadQRCode(extractQRCodeFileName(result.fullUrl))
      )
    );
    console.log('All QR codes downloaded successfully');
  } catch (error) {
    console.error('Error downloading QR codes:', error);
  }
};
