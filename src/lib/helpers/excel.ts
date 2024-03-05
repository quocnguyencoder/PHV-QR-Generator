// eslint-disable-next-line import/no-extraneous-dependencies
import * as XLSX from 'xlsx';

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
