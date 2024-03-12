import type { GenerateOptions, OriginByEnv } from '~/lib/types/GenerateInfo';

export const options: GenerateOptions = {
  PickUp: {
    label: 'PickUp',
    generatePath: (param) => {
      const { storeId } = param;
      return `?orderChannel=pickup&Store=${storeId}`;
    },
  },
  DineIn: {
    label: 'DineIn',
    generatePath: (param) => {
      const { storeId, tableId } = param;
      return `?Store=${storeId}&Table=${tableId}`;
    },
  },
  SignUp: {
    label: 'SignUp',
    generatePath: (param) => {
      const { qrCodeID } = param;
      return `${qrCodeID}`;
    },
  },
};

const BYOD_UAT = 'https://uatordernow.pizzahut.vn/';
const BYOD_PRO = 'https://ordernow.pizzahut.vn/';
const PHV_QR_UAT = 'https://qr.pizzahut.vn/';
const PHV_QR_PRO = 'https://qr.pizzahut.vn/';

export const origins: OriginByEnv = {
  PickUp: {
    uat: BYOD_UAT,
    production: BYOD_PRO,
  },
  DineIn: {
    uat: BYOD_UAT,
    production: BYOD_PRO,
  },
  SignUp: {
    uat: PHV_QR_UAT,
    production: PHV_QR_PRO,
  },
};
