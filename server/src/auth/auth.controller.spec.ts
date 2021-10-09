import { Test, TestingModule } from '@nestjs/testing';
import AuthController from './auth.controller';
import AuthService from './auth.service';

const authService = { login: jest.fn() };

describe('/src/auth/auth.controller', () => {
  let authController: AuthController;

  beforeAll(async () => {
    const authModule: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    authController = authModule.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#login', () => {
    const request = {
      user: {
        sub: 123,
        provider: 'google',
        name: 'Alban',
        picture: 'https://randomuser.me/api/portraits/men/42.jpg',
      },
    };
    const accessToken = 'test-token';

    it('should return accessToken, name and picture of user', () => {
      authService.login.mockReturnValueOnce(accessToken);

      const result = authController.login(request);

      expect(authService.login).toBeCalledTimes(1);
      expect(authService.login).toHaveBeenLastCalledWith(request.user);

      expect(result).toStrictEqual({
        accessToken,
        user: {
          name: request.user.name,
          picture: request.user.picture,
        },
      });
    });
  });
});
