import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import AuthController from './auth.controller';
import AuthService from './auth.service';

const frontendURL = 'http://frontend.com';
const configService = { get: () => frontendURL };
const authService = { login: jest.fn() };
const response = { redirect: jest.fn() };

describe('/src/auth/auth.controller', () => {
  let authController: AuthController;

  beforeAll(async () => {
    const authModule: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, ConfigService],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .overrideProvider(ConfigService)
      .useValue(configService)
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
      },
    };
    const accessToken = 'test-token';

    it('should return accessToken, name and picture of user', () => {
      authService.login.mockReturnValueOnce(accessToken);

      authController.login(request, response);

      expect(authService.login).toBeCalledTimes(1);
      expect(authService.login).toHaveBeenLastCalledWith(request.user);

      expect(response.redirect).toHaveBeenCalledTimes(1);
      expect(response.redirect).toHaveBeenLastCalledWith(
        `${frontendURL}/setAuth?accessToken=${accessToken}&user=${JSON.stringify(
          { name: 'Alban' },
        )}`,
      );
    });
  });
});
