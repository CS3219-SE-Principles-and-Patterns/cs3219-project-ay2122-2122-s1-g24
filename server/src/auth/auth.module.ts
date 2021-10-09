import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import JwtStrategy from './jwt/jwt.strategy';
import GoogleOAuthStrategy from './google/google-oauth.strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleOAuthStrategy, JwtStrategy],
  exports: [AuthService],
})
export default class AuthModule {}
