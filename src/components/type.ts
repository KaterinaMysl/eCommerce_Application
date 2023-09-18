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

export type CartLS = {
  id: string;
  version: number;
};

export type CartDraw = {
  name: string;
  quantity: number;
  price: number;
  discount?: number;
  discountCode?: number;
  images: string;
  id: string;
  lineItemId: string;
  key: string;
};

export type CartDrawProducts = {
  cartProducts: CartDraw[];
  price: number;
};

export type Discount = {
  id: string;
  name: string;
  code: string;
};
