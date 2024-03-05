import type { GenerateOptions } from '~/lib/types/GenerateInfo';

export const baseUrl = 'https://uatordernow.pizzahut.vn/';

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
