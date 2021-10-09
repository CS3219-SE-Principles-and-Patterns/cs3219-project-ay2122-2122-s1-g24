import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import AuthController from './auth.controller';
import GoogleOAuthStrategy from './google/google-oauth.strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [GoogleOAuthStrategy],
})
export default class AuthModule {}
