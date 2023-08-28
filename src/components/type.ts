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
