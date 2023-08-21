/**
 * @jest-environment jsdom
 */
import RegisterController from '../components/controller/RegisterController';
import Client from '../components/app/Client';
import { handleServerError } from '../components/controller/Validator/handleServerError';

jest.mock('../components/app/Client');
jest.mock('../components/controller/Validator/handleServerError', () => ({
  handleServerError: jest.fn(),
}));

describe('RegisterController', () => {
  let registerController: RegisterController;
  const mockClient = new Client();

  const mockEvent = {
    preventDefault: jest.fn(),
    currentTarget: document.createElement('form'),
  };

  beforeEach(() => {
    registerController = new RegisterController(mockClient);
  });

  describe('register', () => {
    it('should handle registration', async () => {
      const mockRegisterPromise = Promise.resolve();
      mockClient.register = jest.fn().mockReturnValue(mockRegisterPromise);
      jest
        .spyOn(registerController['successRegisterForm'], 'draw')
        .mockReturnValueOnce(undefined);
      jest.spyOn(console, 'log').mockReturnValueOnce(undefined);

      registerController.register(mockEvent as unknown as Event);

      await expect(mockRegisterPromise).resolves.toBeUndefined();
      expect(mockClient.register).toHaveBeenCalled();
    });

    it('should handle registration error', async () => {
      const mockError = { body: { errors: [] } };
      const mockRegisterPromise = Promise.reject(mockError);
      mockClient.register = jest.fn().mockReturnValue(mockRegisterPromise);

      registerController.register(mockEvent as unknown as Event);

      await expect(mockRegisterPromise).rejects.toEqual(mockError);
      expect(mockClient.register).toHaveBeenCalled();
      expect(handleServerError).toHaveBeenCalledWith(
        mockError.body.errors,
        mockEvent.currentTarget,
      );
    });
  });
});
