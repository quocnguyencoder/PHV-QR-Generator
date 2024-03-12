/* eslint-disable no-console */
import { saveAs } from 'file-saver';
// eslint-disable-next-line import/no-extraneous-dependencies
import JSZip from 'jszip';

import type { IResult, IResultSummary } from '../interfaces/IResult';
import { options, origins } from '../pages/home/constants';
import type { Environment, GenerateParams } from '../types/GenerateInfo';
import type { QRCodeData, QRType } from '../types/QRCodeInfo';

export const convertDataToResult = (
  data: QRCodeData,
  qrCodeType: QRType,
  env: Environment
): IResult => {
  const { storeId, tableId, qrCodeID } = data;
  let params: GenerateParams = { storeId };

  if (qrCodeType === 'DineIn') {
    params = { storeId, tableId };
  } else if (qrCodeType === 'SignUp') {
    params = { storeId, qrCodeID };
  }

  const fullUrl =
    origins[qrCodeType][env] + options[qrCodeType].generatePath(params);
  const newResult: IResult = { storeId, fullUrl };
  return newResult;
};

export const generateQRCodes = (
  qrCodeType: QRType,
  data: QRCodeData[],
  env: Environment
): IResult[] => {
  const results: IResult[] = data.map((item) =>
    convertDataToResult(item, qrCodeType, env)
  );

  if (qrCodeType === 'PickUp') {
    const distinctStores: IResult[] = results.reduce(
      (uniqueStores: IResult[], result: IResult) => {
        if (
          result.storeId !== undefined &&
          uniqueStores.findIndex(
            (store) => store.storeId === result.storeId
          ) === -1
        ) {
          uniqueStores.push(result);
        }
        return uniqueStores;
      },
      []
    );
    return distinctStores;
  }

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
  const canvas = document.getElementById(fileName) as HTMLCanvasElement;

  if (!canvas) {
    console.error('Canvas element not found', fileName);
    throw new Error('Canvas element not found');
  }

  canvas.toBlob((blob) => {
    if (blob) {
      saveAs(blob, fileName);
    } else {
      throw new Error('Failed to create blob');
    }
  });
};

export const downloadAllQRCodes = async (results: IResult[]) => {
  try {
    const zip = new JSZip();
    const canvasElements: HTMLCanvasElement[] = [];

    results.forEach((result) => {
      const canvas = document.getElementById(
        extractQRCodeFileName(result.fullUrl)
      ) as HTMLCanvasElement;
      if (!canvas) {
        console.error('Canvas element not found for', result.fullUrl);
        return;
      }
      canvasElements.push(canvas);
    });

    const promises = canvasElements.map(async (canvas) => {
      const fileName = `${canvas.id}.png`;
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => {
          if (b) {
            resolve(b);
          }
        });
      });
      if (blob) {
        return zip.file(fileName, blob);
      }
      return null;
    });

    await Promise.all(promises);

    // Generate zip file
    const content = await zip.generateAsync({ type: 'blob' });
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const zipFileName = `qr_codes_${formattedDate}.zip`;

    // Download zip file
    saveAs(content, zipFileName);
    console.log('All QR codes downloaded and zipped successfully');
  } catch (error) {
    console.error('Error downloading and zipping QR codes:', error);
  }
};

export const convertToResultSummary = (
  results: IResult[]
): IResultSummary[] => {
  return results.map((result) => {
    const fileName = extractQRCodeFileName(result.fullUrl);
    return { ...result, fileName };
  });
};
