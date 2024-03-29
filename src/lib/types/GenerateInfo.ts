import type { QRType } from './QRCodeInfo';

export type Mode = 'single' | 'multiple';
export type Environment = 'uat' | 'production';

export type GenerateParams = {
  storeId: string;
  tableId?: string;
  qrCodeID?: string;
};

export type GenerateOptions = {
  [K in QRType]: {
    label: string;
    generatePath: (param: GenerateParams) => string;
  };
};

export type OriginByEnv = {
  [Type in QRType]: {
    [Env in Environment]: string;
  };
};
