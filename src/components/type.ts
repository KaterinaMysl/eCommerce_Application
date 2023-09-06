import { Address } from '@commercetools/platform-sdk';

export type ErrorResponse = {
  code: string;
  message: string;
  detailedErrorMessage: string;
  field?: string;
};

export type ErrorObject = {
  error: string;
  type: string;
  message?: string;
};

export type MessageType = {
  [key: string]: {
    [key: string]: string;
  };
};
export type AddressS = {
  country: string;
  post: string;
  street: string;
  city: string;
  addressId: string;
};
export type AddAddress = {
  address: Address;
  billing: boolean;
  shipping: boolean;
  default: boolean;
  new: boolean;
};
