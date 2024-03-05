export type QRType = 'PickUp' | 'DineIn' | 'SignUp';

export type QRCodeData = {
  storeId: string;
  tableId?: string;
  qrCodeID?: string;
};
