import LoginController from '../components/controller/LoginController';
import Client from '../components/app/Client';
import StorageController from '../components/controller/StorageController';

jest.mock('../components/app/Client');
jest.mock('../components/controller/StorageController');

class MockFormData {
  private data: Record<string, string | null> = {};

  append(key: string, value: string): void {
    this.data[key] = value;
  }

  get(key: string): string | null {
    return this.data[key] || null;
  }
}

global.window = global.window || {};
global.window.location = global.window.location || { href: '' };

const locationMock = { href: jest.fn().mockReturnValue('/') };

Object.defineProperty(global.window, 'location', {
  value: locationMock,
  writable: true,
});

describe('LoginController', () => {
  let mockEvent: Partial<Event>;
  let mockClient: jest.Mocked<Client>;
  let mockStorage: jest.Mocked<StorageController>;
  let loginController: LoginController;

  beforeEach(() => {
    jest.clearAllMocks();

    mockEvent = {
      preventDefault: jest.fn(),
      currentTarget: document.createElement('form'),
    };

    mockClient = new Client() as jest.Mocked<Client>;
    mockStorage = new StorageController() as jest.Mocked<StorageController>;

    loginController = new LoginController(mockClient, mockStorage);
  });

  it('should handle successful login', async () => {
    const mockId = '12345';
    mockClient.login.mockResolvedValue(mockId);

    const mockFormData = new MockFormData();
    mockFormData.append('email', 'email');
    mockFormData.append('password', 'password');

    (global.FormData as jest.Mocked<typeof FormData>) = jest.fn(
      () => mockFormData,
    ) as unknown as jest.Mocked<typeof FormData>;

    await loginController.login(mockEvent as Event);

    expect(mockClient.login).toHaveBeenCalledWith('email', 'password');
    expect(mockStorage.saveCustomerSessionId).toHaveBeenCalledWith(mockId);
    expect(window.location.href).toBe('/');
  });
});
