import { TYPE_SERVER_ERROR_MAP } from '../../constants';
import { ErrorObject, ErrorResponse } from '../../type';

export const handleSdkError = (errors: ErrorResponse[]): ErrorObject[] => {
  const errorArray: ErrorObject[] = [];

  errors.forEach(error => {
    const errorObject: ErrorObject = { error: '', type: '' };
    errorObject.type = error.code;

    if (error.code === 'InvalidJsonInput') {
      errorObject.error = error.detailedErrorMessage.includes('addresses')
        ? 'address'
        : 'dateOfBirth';
    } else if (error.code === 'InvalidOperation') {
      errorObject.error = error.message.includes('email')
        ? 'email'
        : 'password';
    } else if (error.code === 'DuplicateField') {
      errorObject.error = error.field as string;
    }

    const messageForError = TYPE_SERVER_ERROR_MAP[error.code];
    if (messageForError) {
      errorObject.message = messageForError[errorObject.error];
    }

    errorArray.push(errorObject);
  });

  return errorArray;
};
