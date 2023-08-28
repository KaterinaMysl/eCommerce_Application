export interface ValidatorPattern {
  [key: string]: { PATTERN: string; MESSAGE: string }[];
}
export interface MessageError {
  [key: string]: string;
}
