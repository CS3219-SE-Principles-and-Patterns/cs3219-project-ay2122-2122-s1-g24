import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AuthController from './auth.controller';
import GoogleOAuthStrategy from './google/google-oauth.strategy';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [GoogleOAuthStrategy],
})
export default class AuthModule {}
