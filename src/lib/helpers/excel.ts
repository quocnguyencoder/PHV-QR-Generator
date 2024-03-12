// eslint-disable-next-line import/no-extraneous-dependencies
import * as XLSX from 'xlsx';

import type { IResult } from '../interfaces/IResult';

import { convertToResultSummary } from './qrCode';

export type QRCodeData = {
  storeId: string;
  tableId?: string;
  qrCodeID?: string;
};

export async function readExcelAndConvertToQRCodeData(
  file: File
): Promise<QRCodeData[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet);

        const qrCodeDataArray: QRCodeData[] = [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        excelData.forEach((row: any) => {
          const qrCodeData: QRCodeData = {
            storeId: row.StoreId,
            tableId: row.TableId,
            qrCodeID: row.qrCodeID,
          };
          qrCodeDataArray.push(qrCodeData);
        });

        resolve(qrCodeDataArray);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

const s2ab = (s: string) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < s.length; i++) {
    // eslint-disable-next-line no-bitwise
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
};

export const downloadSummaryExcel = (results: IResult[], fileName: string) => {
  // Convert data to worksheet
  const ws = XLSX.utils.json_to_sheet(convertToResultSummary(results));

  // Create a workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Results');

  // Convert workbook to binary string
  const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });

  // Convert binary string to Blob
  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

  // Trigger download
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
