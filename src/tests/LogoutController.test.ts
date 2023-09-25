import LogoutController from '../components/controller/LogoutController';
import Client from '../components/app/Client';
import StorageController from '../components/controller/StorageController';

jest.mock('../components/app/Client');
jest.mock('../components/controller/StorageController');

global.window = global.window || {};
global.window.location = global.window.location || { href: '' };

Object.defineProperty(global.window, 'location', {
  value: {
    href: jest.fn(),
  },
  writable: true,
});

describe('LogoutController', () => {
  let mockClient: jest.Mocked<Client>;
  let mockStorage: jest.Mocked<StorageController>;
  let logoutController: LogoutController;

  beforeEach(() => {
    jest.clearAllMocks();

    mockClient = new Client() as jest.Mocked<Client>;
    mockStorage = new StorageController() as jest.Mocked<StorageController>;

    logoutController = new LogoutController(mockClient, mockStorage);
  });

  it('should handle logout', () => {
    const sessionId = 'someSessionId';
    mockStorage.getCustomerSessionId.mockReturnValue(sessionId);

    logoutController.logout();

    expect(mockClient.logout).toHaveBeenCalledWith(sessionId);
    expect(mockStorage.deleteCustomerSessionId).toHaveBeenCalled();
    expect(window.location.href).toBe('/');
  });
});
