import { MessageError, ValidatorPattern } from './interfaces';

export const ERROR_MESSAGES: MessageError = {
  EMAIL: 'Please enter a valid email address. user@example.com',
  PASSWORD:
    '1 lowercase letter, 1 uppercase letter, 1 number, at least 8 characters',
  CONFIRM_PASSWORD: '',
};

export const VALIDATOR_PATTERNS: ValidatorPattern = {
  password: [
    {
      PATTERN: '^(?=.*[a-z]).{1,}$',
      MESSAGE: '1 lowercase letter',
    },
    {
      PATTERN: '(?=.*[A-Z]).{1,}$',
      MESSAGE: '1 uppercase letter',
    },
    {
      PATTERN: '^(?=.*[0-9]).{1,}$',
      MESSAGE: '1 number',
    },
    { PATTERN: '^.{8,}$', MESSAGE: 'at least 8 characters' },
    { PATTERN: '^[^\\s].{0,}$', MESSAGE: 'without spaces at the beginning' },
    { PATTERN: '^.{0,}[^\\s]$', MESSAGE: 'without spaces at the end' },
  ],
  email: [
    {
      PATTERN: '^[^\\s]+@([\\w\\-]+\\.)+[\\w\\-]{2,4}$',
      MESSAGE:
        'Email address is invalid. Please enter a valid email address. user@example.com',
    },
  ],
  firstName: [
    {
      PATTERN: '^[a-zA-Z]+$',
      MESSAGE: 'at least one character and no special characters or numbers',
    },
  ],
  lastName: [
    {
      PATTERN: '^[a-zA-Z]+$',
      MESSAGE: 'at least one character and no special characters or numbers',
    },
  ],
  street: [
    {
      PATTERN: '^[a-zA-Z]+$',
      MESSAGE: 'please enter only characters',
    },
  ],
  city: [
    {
      PATTERN: '^[a-zA-Z]+$',
      MESSAGE: 'please enter only characters',
    },
  ],
  postalCode: [
    {
      PATTERN: '^[0-9]{5}$',
      MESSAGE: 'please enter 5 number of your postal code',
    },
  ],
  postalCode2: [
    {
      PATTERN: '^[0-9]{4} [A-Z]{2}$',
      MESSAGE: 'please enter 4 number and 2 characters of your postal code',
    },
  ],
  age: [
    {
      PATTERN: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$',
      MESSAGE: 'please enter your date of birth in this format: 01.02.2000',
    },
  ],
};
